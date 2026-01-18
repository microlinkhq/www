import ClusterMonitor from 'components/patterns/ClusterMonitor/ClusterMonitor'
import Layout from 'components/patterns/Layout'
import { useQueryState } from 'components/hook/use-query-state'
import { cdnUrl } from 'helpers/cdn-url'
import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { css, keyframes } from 'styled-components'
import { theme as themeProp, transition } from 'theme'

import Box from 'components/elements/Box'
import Choose from 'components/elements/Choose'
import DotSpinner from 'components/elements/DotSpinner'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Meta from 'components/elements/Meta/Meta'
import Text from 'components/elements/Text'

const DAYS_TO_SHOW = 365

const blip = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

const blipReduced = keyframes`
  0%, 100% {
    opacity: 1;
  }
`

const OUTAGE_REASONS = [
  'Database connection timeout',
  'CDN provider outage',
  'Kubernetes cluster node failure',
  'DNS resolution failure',
  'SSL certificate expiration',
  'API rate limit exceeded',
  'Memory leak causing service restart'
]

const DEGRADED_REASONS = [
  'High CPU usage on primary node',
  'Network latency spike',
  'Database query performance degradation',
  'Increased response times due to traffic',
  'Cache miss rate increase',
  'Partial service degradation'
]

// Mock data generator for availability - simulates GET /status/availability
const generateMockAvailability = () => {
  const days = []
  const today = new Date()

  for (let i = DAYS_TO_SHOW; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // 99.5% chance of being fully operational
    const random = Math.random()
    let status = 'operational'
    let uptime = 100
    let reason = null
    let downtime = null

    if (random > 0.995) {
      status = 'outage'
      uptime = Math.random() * 50
      reason = OUTAGE_REASONS[Math.floor(Math.random() * OUTAGE_REASONS.length)]
      downtime = Math.floor(Math.random() * 480) + 30
    } else if (random > 0.98) {
      status = 'degraded'
      uptime = 90 + Math.random() * 10
      reason = DEGRADED_REASONS[Math.floor(Math.random() * DEGRADED_REASONS.length)]
      downtime = Math.floor(Math.random() * 180) + 15
    }

    days.push({
      date: date.toISOString().split('T')[0],
      status,
      uptime,
      reason,
      downtime
    })
  }

  const totalUptime = days.reduce((acc, day) => acc + day.uptime, 0) / days.length
  return { days, uptime: totalUptime.toFixed(3) }
}

const getStatusColor = status => {
  if (status === 'operational') return '#40c057' // green6
  if (status === 'degraded') return '#fab005' // yellow6
  return '#fa5252' // red6
}

const Tooltip = ({ day, isVisible, position }) => {
  const tooltipRef = useRef(null)
  const [adjustedStyle, setAdjustedStyle] = useState(null)

  useEffect(() => {
    if (!isVisible || !day || !position) {
      setAdjustedStyle(null)
      return
    }

    const timeoutId = setTimeout(() => {
      if (!tooltipRef.current) return

      const tooltip = tooltipRef.current
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const padding = 8

      const tooltipRect = tooltip.getBoundingClientRect()
      const tooltipWidth = tooltipRect.width || 200
      const tooltipHeight = tooltipRect.height || 100

      let left = position.x
      let top = position.y + 42
      let transform = 'translateX(-50%)'

      const halfWidth = tooltipWidth / 2
      if (left - halfWidth < padding) {
        left = padding + halfWidth
      } else if (left + halfWidth > viewportWidth - padding) {
        left = viewportWidth - padding - halfWidth
      }

      if (top + tooltipHeight > viewportHeight - padding) {
        top = position.y - tooltipHeight - 8
        if (top < padding) {
          top = viewportHeight - tooltipHeight - padding
        }
      }

      setAdjustedStyle({
        left: `${left}px`,
        top: `${top}px`,
        transform
      })
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [isVisible, position, day])

  if (!isVisible || !day || !position) return null

  const formatDate = dateStr => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatDowntime = minutes => {
    if (minutes < 60) return `${minutes} minutes`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  let tooltipContent = ''
  if (day.status === 'operational') {
    tooltipContent = `Operational\n${formatDate(day.date)}\n${day.uptime.toFixed(2)}% uptime`
  } else if (day.status === 'outage') {
    tooltipContent = `Down\n${formatDate(day.date)}\n${day.reason}\nDowntime: ${formatDowntime(day.downtime)}`
  } else if (day.status === 'degraded') {
    tooltipContent = `Degraded\n${formatDate(day.date)}\n${day.reason}\nDowntime: ${formatDowntime(day.downtime)}`
  }

  const initialStyle = {
    left: `${position.x}px`,
    top: `${position.y + 42}px`,
    transform: 'translateX(-50%)'
  }

  const tooltipElement = (
    <div
      ref={tooltipRef}
      style={{
        position: 'fixed',
        padding: '8px 12px',
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: '4px',
        fontSize: '12px',
        fontFamily: 'monospace',
        whiteSpace: 'pre',
        zIndex: 10000,
        pointerEvents: 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        minWidth: '200px',
        maxWidth: 'calc(100vw - 16px)',
        textAlign: 'left',
        lineHeight: '1.6',
        wordBreak: 'break-word',
        ...(adjustedStyle || initialStyle)
      }}
    >
      {tooltipContent}
    </div>
  )

  return typeof document !== 'undefined'
    ? createPortal(tooltipElement, document.body)
    : null
}

const AvailabilityBar = ({ days }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState(null)
  const scrollContainerRef = useRef(null)
  const barWidth = 9
  const barGap = 2
  const barHeight = 32
  const transitionStyle = transition.short

  const updateTooltipPosition = (index, event) => {
    setHoveredIndex(index)
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top
    })
  }

  const handleMouseEnter = (index, event) => {
    updateTooltipPosition(index, event)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setTooltipPosition(null)
  }

  const rowDefault = 92
  const firstRow = days.slice(0, rowDefault)
  const secondRow = days.slice(rowDefault - 1, rowDefault * 2 - 1)
  const thirdRow = days.slice(rowDefault * 2 - 1, rowDefault * 3 - 1)
  const fourthRow = days.slice(rowDefault * 3 - 1)

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth
    }
  }, [])

  const renderBarRow = (rowDays, startIndex) => (
    <Flex
      css={themeProp({
        gap: `${barGap}px`,
        justifyContent: 'flex-start'
      })}
    >
      {rowDays.map((day, index) => {
        const actualIndex = startIndex + index

        const bgColor = getStatusColor(day.status)
        const isLastDay = actualIndex === DAYS_TO_SHOW
        const width = isLastDay ? `${barWidth * 2 + barGap}px` : `${barWidth}px`

        return (
          <Box
            key={day.date}
            onMouseEnter={e => handleMouseEnter(actualIndex, e)}
            onMouseLeave={handleMouseLeave}
            css={
              isLastDay
                ? css`
                    animation: ${blip} 1.5s ease-in-out infinite;
                    @media (prefers-reduced-motion: reduce) {
                      animation: ${blipReduced} 1.5s ease-in-out infinite;
                    }
                  `
                : undefined
            }
            style={{
              width,
              height: `${barHeight}px`,
              backgroundColor: bgColor,
              borderRadius: '2px',
              flexShrink: 0,
              cursor: 'pointer',
              transition: `transform ${transitionStyle}, opacity ${transitionStyle}`
            }}
          />
        )
      })}
    </Flex>
  )

  return (
    <>
      <Box
        ref={scrollContainerRef}
        css={themeProp({
          mt: 1,
          pb: 2,
          overflowX: 'auto'
        })}
      >
        <Flex
          css={themeProp({
            flexDirection: 'column',
            gap: `${barGap}px`
          })}
        >
          {renderBarRow(firstRow, 0)}

          {renderBarRow(secondRow, 92)}

          {renderBarRow(thirdRow, 183)}

          {renderBarRow(fourthRow, 275)}
        </Flex>
      </Box>
      {hoveredIndex !== null && (
        <Tooltip
          day={days[hoveredIndex]}
          isVisible
          position={tooltipPosition}
        />
      )}
    </>
  )
}

const ApiAvailability = () => {
  const [availability, setAvailability] = useState(() => generateMockAvailability())

  useEffect(() => {
    // Simulate API call to GET /status/availability
    const fetchAvailability = async () => {
      // TODO: Replace with actual API call
      // const response = await fetch('/status/availability')
      // const data = await response.json()
      const data = generateMockAvailability()
      setAvailability(data)
    }
    fetchAvailability()
  }, [])

  return (
    <Box
      css={themeProp({
        mt: 2,
        width: ['100%'],
        maxWidth: '1010px', // the sum of the 92 bars and the gaps between them
        mx: 'auto'
      })}
    >

      <Monospace css={themeProp({ color: 'black', mb: 2 })}>
        API Availability: {availability.uptime}% uptime
      </Monospace>

      <Text
        css={themeProp({
          color: 'black',
          fontFamily: 'monospace',
          fontSize: [0, null, 1],
          m: 0
        })}
      >
        {DAYS_TO_SHOW} days ago
      </Text>

      <AvailabilityBar days={availability.days} />
      <Flex
        css={themeProp({
          justifyContent: 'flex-end',
          mt: 0
        })}
      >
        <Text
          css={themeProp({
            color: 'black',
            fontFamily: 'monospace',
            fontSize: [0, null, 1],
            m: 0,
            textAlign: 'right'
          })}
        >
          Today
        </Text>
      </Flex>

    </Box>
  )
}

const Monospace = props => (
  <Text
    css={themeProp({
      fontFamily: 'monospace',
      textAlign: 'center',
      maxWidth: ['95vw', '95vw', '100%', '100%'],
      whiteSpace: 'pre',
      overflowY: 'scroll',
      m: 'auto'
    })}
    {...props}
  />
)

export const Head = () => (
  <Meta
    description='Real-time data of the Microlink systems performance.'
    image={cdnUrl('banner/status.jpeg')}
  />
)

const StatusPage = () => {
  const [{ cluster }] = useQueryState()

  const endpoint = new URL(cluster || '', 'https://k8s.microlink.io').toString()

  return (
    <ClusterMonitor endpoint={endpoint}>
      {({ isLoading, resume, info }) => {
        return (
          <Layout
            component={Flex}
            css={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Box id='status' style={{ padding: '0 16px' }}>
              <Heading css={themeProp({ mb: 3, mt: [2, null, 0], textAlign: 'center', fontSize: [3, null, 4] })}>
                Microlink Status
              </Heading>
              <Choose>
                <Choose.When condition={isLoading}>
                  <Flex
                    css={themeProp({
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: ['column', null, 'row']
                    })}
                  >
                    <Text
                      css={themeProp({
                        fontWeight: 'regular',
                        fontFamily: 'mono',
                        lineHeight: 0,
                        fontSize: 4,
                        pt: [1, null, 2],
                        color: 'black'
                      })}
                    >
                      Please wait
                      <DotSpinner />
                    </Text>
                  </Flex>
                </Choose.When>
                <Choose.Otherwise>
                  <ApiAvailability />
                  <Box>
                    <Monospace css={themeProp({ color: 'black' })}>
                      {resume}
                    </Monospace>
                    <Monospace css={themeProp({ color: 'black', fontSize: [0, null, 1] })}>
                      {`\n${info}`}
                    </Monospace>
                  </Box>
                  <Box css={themeProp({ mt: 4 })}>
                    <Monospace css={themeProp({ color: 'black' })}>
                      $ watch curl -sL {endpoint}
                    </Monospace>
                  </Box>
                </Choose.Otherwise>
              </Choose>
            </Box>
          </Layout>
        )
      }}
    </ClusterMonitor>
  )
}

export default StatusPage
