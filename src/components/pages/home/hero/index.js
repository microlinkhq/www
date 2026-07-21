import Container from 'components/elements/Container'
import Dot from 'components/elements/Dot/Dot'
import Heading from 'components/elements/Heading'
import Caption from 'components/patterns/Caption/Caption'
import Overlay from 'components/pages/home/overlay'
import heroDemoRequests from 'components/pages/home/hero-demo-requests'
import { trackEvent } from 'helpers/plausible'
import { timings, space, theme } from 'theme'
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import styled, { keyframes } from 'styled-components'

import analyticsData from '../../../../../data/analytics.json'

import {
  CYCLE,
  DEFAULT_URLS,
  PROMPTS,
  agentPrompt,
  derive,
  parseLocal
} from './constants'
import {
  HeroComposer,
  getCaretOffset,
  readComposerText,
  setCaretOffset
} from './composer'
import { CopyPromptAction } from './copy-prompt'
import { ExampleChips } from './example-chips'
import { HeroGradientDefs } from './gradient-defs'
import { fadeIn, reduceMotion } from './primitives'
import {
  INITIAL_REQ,
  INITIAL_SNAPSHOT,
  readSharedState,
  requestStatus,
  writeSharedState
} from './requests'
import { ResultPanel } from './result-panel'
import { StatusLine } from './status-line'
import { useAttractCycle } from './use-attract-cycle'
import { useMenuBehavior } from './use-menu-behavior'
import { useRunRequest } from './use-run-request'

const [{ reqs_pretty: reqsPretty }] = analyticsData

const { shortUrl, canonicalDemoUrl } = heroDemoRequests

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

const riseIn = keyframes`
  from { opacity: 0; transform: translateY(8px); filter: blur(3px) }
  to { opacity: 1; transform: translateY(0); filter: blur(0) }
`

const GUTTER_X = `clamp(${space[3]}, 4vw, 40px)`
const PADDING_BOTTOM = `clamp(${space[4]}, 5vw, ${space[5]})`

const Section = styled.section`
  -webkit-font-smoothing: antialiased;
  padding-right: ${GUTTER_X};
  padding-bottom: ${PADDING_BOTTOM};
  padding-left: ${GUTTER_X};
  ${theme({
    position: 'relative',
    fontFamily: 'sans',
    color: 'black'
  })};
`

const Content = styled(Container)`
  ${theme({
    position: 'relative',
    zIndex: 1,
    maxWidth: '1080px',
    alignItems: 'center',
    textAlign: 'center',
    p: 0
  })};

  & > * {
    animation: ${riseIn} 440ms ${timings.short} both;
  }
  & > *:nth-child(2) {
    animation-delay: 45ms;
  }
  & > *:nth-child(3) {
    animation-delay: 90ms;
  }
  & > *:nth-child(4) {
    animation-delay: 135ms;
  }
  & > *:nth-child(5) {
    animation-delay: 180ms;
  }
  & > *:nth-child(6) {
    animation-delay: 225ms;
  }
  & > *:nth-child(7) {
    animation-delay: 270ms;
  }

  ${reduceMotion} {
    & > * {
      animation-name: ${fadeIn};
    }
  }
`

const Badge = styled.span`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '9px',
    fontSize: 0,
    fontWeight: 'regular',
    bg: 'white',
    color: 'gray8',
    border: 1,
    borderColor: 'gray2',
    py: '7px',
    px: 3,
    borderRadius: '999px',
    mb: '26px'
  })};
`

const Hero = () => {
  const [dText, setDText] = useState(CYCLE[0])
  const [dTab, setDTab] = useState('output')
  const [dVert, setDVert] = useState(null)
  const [menuState, setMenuState] = useState(null)
  const [req, setReq] = useState(INITIAL_REQ)
  const reqId = useRef(0)
  const anim = useRef({
    ci: 0,
    phase: 'pause',
    userTook: false,
    timer: null,
    text: CYCLE[0]
  })
  const chipRef = useRef(null)
  const editorRef = useRef(null)
  const pendingCaret = useRef(null)
  const menuRef = useRef(null)
  const menuTimer = useRef(null)
  const menuRaf = useRef(null)
  const [promptCopied, setPromptCopied] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const copyTimer = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const copyPrompt = () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    navigator.clipboard
      .writeText(agentPrompt(D))
      .then(() => {
        trackEvent('hero copy prompt', { product: D.vertical })
        setPromptCopied(true)
        clearTimeout(copyTimer.current)
        copyTimer.current = setTimeout(() => setPromptCopied(false), 1500)
      })
      .catch(() => {})
  }

  const stopTyping = () => {
    anim.current.userTook = true
    clearTimeout(anim.current.timer)
  }

  const takeOver = text => {
    stopTyping()
    anim.current.text = text
    setDText(text)
  }

  const openMenu = () => {
    clearTimeout(menuTimer.current)
    setMenuState('pre')
    menuRaf.current = window.requestAnimationFrame(() => {
      menuRaf.current = window.requestAnimationFrame(() => setMenuState('open'))
    })
  }

  const closeMenu = useCallback(() => {
    clearTimeout(menuTimer.current)
    window.cancelAnimationFrame(menuRaf.current)
    setMenuState(s => (s ? 'closing' : s))
    menuTimer.current = setTimeout(() => setMenuState(null), 150)
  }, [menuTimer, menuRaf, setMenuState])

  const menuVisible = menuState === 'open' || menuState === 'pre'

  const toggleMenu = () => {
    if (menuVisible) closeMenu()
    else openMenu()
  }

  const runRequest = useRunRequest({ reqId, setReq })

  useAttractCycle({ anim, sectionRef, setDText })

  useMenuBehavior({ menuState, chipRef, menuRef, closeMenu })

  useEffect(() => {
    const shared = readSharedState()
    if (shared) {
      takeOver(shared.q)
      setDVert(shared.product)
      runRequest(derive(shared.q, shared.product))
    } else if (INITIAL_REQ.status !== 'success') {
      runRequest(INITIAL_SNAPSHOT)
    }
  }, [runRequest])

  const D = useMemo(() => derive(dText, dVert), [dText, dVert])
  const liveStatus = requestStatus(req)
  const canRun = dText.trim().length > 0 && req.status !== 'loading'

  const dSegments = useMemo(() => {
    const { raw } = parseLocal(dText)
    const index = raw ? dText.indexOf(raw) : -1
    if (index === -1) return { before: dText, url: '', after: '' }
    return {
      before: dText.slice(0, index),
      url: raw,
      after: dText.slice(index + raw.length)
    }
  }, [dText])

  const handleRun = () => {
    if (!canRun) return
    stopTyping()
    closeMenu()
    writeSharedState(dText, dVert)
    runRequest(D)
  }

  const onEditorInput = () => {
    const el = editorRef.current
    if (!el) return
    const text = readComposerText(el)
    pendingCaret.current = getCaretOffset(el)
    takeOver(text)
    setDVert(null)
    closeMenu()
  }

  const onEditorFocus = () => {
    if (!anim.current.userTook) {
      const target = CYCLE[anim.current.ci]
      if (dText !== target) pendingCaret.current = target.length
      takeOver(target)
    } else {
      stopTyping()
    }
    setIsFocused(true)
  }

  useIsomorphicLayoutEffect(() => {
    const el = editorRef.current
    if (!el || pendingCaret.current == null) return
    if (document.activeElement === el) setCaretOffset(el, pendingCaret.current)
    pendingCaret.current = null
  })

  const removeUrl = () => {
    const { raw } = parseLocal(dText)
    if (!raw) return
    const text = dText.replace(raw, '').replace(/ {2,}/g, ' ')
    if (editorRef.current) {
      editorRef.current.focus()
      pendingCaret.current = text.length
    }
    takeOver(text)
    writeSharedState(text, dVert)
  }

  const typedUrl = () => {
    const p = parseLocal(dText)
    if (!p.raw) return null
    const v = dVert || p.vertical
    return canonicalDemoUrl(p.url, v) === DEFAULT_URLS[v] ? null : p.raw
  }

  const pickExample = value => () => {
    const vertical = parseLocal(value).vertical
    const url = typedUrl() || shortUrl(DEFAULT_URLS[vertical])
    const text = `${value} of ${url}`
    takeOver(text)
    setDVert(null)
    closeMenu()
    writeSharedState(text, null)
    runRequest(derive(text))
  }

  const pickVertical = k => {
    const template = PROMPTS[k] || ''
    const url = typedUrl() || (k !== 'search' && shortUrl(DEFAULT_URLS[k]))
    const prompt = url ? `${template} of ${url}` : template
    takeOver(prompt)
    setDVert(k)
    closeMenu()
    if (chipRef.current) chipRef.current.focus()
    writeSharedState(prompt, k)
    runRequest(derive(prompt, k))
  }

  const MENU_COLS = 3
  const onMenuKeyDown = e => {
    const items = menuRef.current
      ? Array.from(menuRef.current.querySelectorAll('[data-menuitem]'))
      : []
    if (items.length === 0) return
    const i = items.indexOf(document.activeElement)
    if (i < 0) return
    let next = null
    if (e.key === 'ArrowRight') next = Math.min(items.length - 1, i + 1)
    else if (e.key === 'ArrowLeft') next = Math.max(0, i - 1)
    else if (e.key === 'ArrowDown') {
      next = Math.min(items.length - 1, i + MENU_COLS)
    } else if (e.key === 'ArrowUp') next = Math.max(0, i - MENU_COLS)
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = items.length - 1
    if (next === null) return
    e.preventDefault()
    items[next].focus()
  }

  return (
    <Section id='hero' ref={sectionRef}>
      <HeroGradientDefs />
      <Overlay start='60%' />
      <Content>
        <Badge>
          <Dot.Success />
          Handling +{reqsPretty} requests every month
        </Badge>

        <Heading variant={null}>
          The web,{' '}
          <Heading
            forwardedAs='span'
            css={theme({ fontSize: 'inherit', fontStyle: 'italic' })}
          >
            transformed
          </Heading>
        </Heading>

        <Caption forwardedAs='p' css={theme({ pt: 3 })}>
          AI-ready infrastructure for interacting with the web. Built on real
          browsers. Exposed through a single API.
        </Caption>

        <HeroComposer
          editorRef={editorRef}
          chipRef={chipRef}
          menuRef={menuRef}
          dSegments={dSegments}
          isFocused={isFocused}
          dText={dText}
          D={D}
          menuState={menuState}
          menuVisible={menuVisible}
          req={req}
          canRun={canRun}
          onEditorInput={onEditorInput}
          onEditorFocus={onEditorFocus}
          setIsFocused={setIsFocused}
          removeUrl={removeUrl}
          handleRun={handleRun}
          stopTyping={stopTyping}
          toggleMenu={toggleMenu}
          onMenuKeyDown={onMenuKeyDown}
          pickVertical={pickVertical}
        />

        <ExampleChips D={D} pickExample={pickExample} />

        <StatusLine liveStatus={liveStatus} />

        <ResultPanel tab={dTab} setTab={setDTab} req={req} />

        <CopyPromptAction
          promptCopied={promptCopied}
          copyPrompt={copyPrompt}
          D={D}
        />
      </Content>
    </Section>
  )
}

export default Hero
