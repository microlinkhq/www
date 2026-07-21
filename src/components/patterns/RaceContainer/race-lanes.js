import React from 'react'
import { colors } from 'theme'

import { AnimatedCounter } from './animated-counter'
import { formatMs, getDeviceType, extractDomain, getVisualIndex } from './utils'
import {
  AnnounceBackdrop,
  AnnounceMeta,
  DomainAnnounce,
  UrlLabel,
  UrlMeta,
  LaneHeaderRow,
  LaneHeaderSpacer,
  LaneHeaderLabel,
  LaneRow,
  LaneRank,
  LaneName,
  LaneTrack,
  LaneBar,
  BarTimeLabel,
  CumulativeTime
} from './styles'

const ROW_HEIGHT = 38
const ROW_GAP = 8
const ROW_SLOT = ROW_HEIGHT + ROW_GAP

export const RaceLanes = ({
  benchmarkData,
  serviceColors,
  highlightKey,
  flat,
  compact,
  isAnnouncing,
  announcingUrl,
  currentUrl,
  currentMaxForStep,
  rankedOrder,
  isReordering,
  isSumming,
  displayedCumulative,
  getColdDuration,
  getTestUrlConfig,
  ALPHABETICAL_SERVICES
}) => (
  <>
    <AnnounceBackdrop $visible={isAnnouncing} $flat={flat} />
    {isAnnouncing &&
      announcingUrl &&
      (() => {
        const cfg = getTestUrlConfig(announcingUrl)
        const device = cfg ? getDeviceType(cfg.width) : null
        const dims = cfg
          ? cfg.height
            ? `${cfg.width}\u00d7${cfg.height}`
            : `${cfg.width}w`
          : null
        const tags = [
          device && `${device} screenshot`,
          dims,
          cfg?.fullPage && 'Full\u2011page',
          cfg?.format?.toUpperCase()
        ].filter(Boolean)
        return (
          <DomainAnnounce key={`announce-${announcingUrl}`} $flat={flat}>
            {extractDomain(announcingUrl)}
            {tags.length > 0 && <AnnounceMeta>{tags.join(' · ')}</AnnounceMeta>}
          </DomainAnnounce>
        )
      })()}
    {(() => {
      const activeUrl = announcingUrl || currentUrl || ''
      const cfg = getTestUrlConfig(activeUrl)
      const device = cfg ? getDeviceType(cfg.width) : null
      const dims = cfg
        ? cfg.height
          ? `${cfg.width}\u00d7${cfg.height}`
          : `${cfg.width}w`
        : null
      const metaTags = [
        device && `${device} screenshot`,
        dims,
        cfg?.fullPage && 'Full\u2011page',
        cfg?.format?.toUpperCase()
      ].filter(Boolean)
      const vis = isAnnouncing ? 'hidden' : 'visible'
      return (
        <>
          <UrlLabel style={{ visibility: vis }}>
            {extractDomain(activeUrl)}
          </UrlLabel>
          <UrlMeta style={{ visibility: vis }}>{metaTags.join(' · ')}</UrlMeta>
        </>
      )
    })()}

    <LaneHeaderRow>
      <LaneHeaderSpacer className='rank' />
      <LaneHeaderSpacer className='name' />
      <span style={{ flex: 1 }} />
      <LaneHeaderLabel>Total</LaneHeaderLabel>
    </LaneHeaderRow>
    <div
      style={{
        position: 'relative',
        height: ALPHABETICAL_SERVICES.length * ROW_SLOT - ROW_GAP
      }}
    >
      {ALPHABETICAL_SERVICES.map((key, domIndex) => {
        const svc = benchmarkData.results[key]
        const cold = getColdDuration(key, currentUrl)
        const pct = (cold / currentMaxForStep) * 100
        const isHighlighted = key === (highlightKey || 'microlink')
        const visualIndex = getVisualIndex(key, rankedOrder)
        const offset = (visualIndex - domIndex) * ROW_SLOT
        const cumTotal = displayedCumulative[key]

        return (
          <LaneRow
            key={key}
            style={{
              position: 'absolute',
              top: domIndex * ROW_SLOT,
              left: 0,
              right: 0,
              transform: `translateY(${offset}px)`,
              transition: isReordering
                ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'none'
            }}
          >
            <LaneRank $rank={visualIndex} $compact={compact}>
              #{visualIndex + 1}
            </LaneRank>
            <LaneName $isMicrolink={false} $compact={compact}>
              {svc.name}
            </LaneName>
            <LaneTrack>
              <LaneBar
                $isMicrolink={isHighlighted}
                $noGrow={isAnnouncing}
                style={{
                  width: isAnnouncing ? '0%' : `${pct}%`,
                  background: isHighlighted
                    ? `linear-gradient(90deg, ${colors.red6}, ${colors.red4})`
                    : serviceColors[key]
                }}
              >
                {!isAnnouncing && (
                  <BarTimeLabel $visible>
                    {formatMs(cold)}&thinsp;ms
                  </BarTimeLabel>
                )}
              </LaneBar>
            </LaneTrack>
            <CumulativeTime
              style={isSumming ? { color: colors.black } : undefined}
            >
              <AnimatedCounter value={cumTotal} animate={isSumming} />
            </CumulativeTime>
          </LaneRow>
        )
      })}
    </div>
  </>
)
