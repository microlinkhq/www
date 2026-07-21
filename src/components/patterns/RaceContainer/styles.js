import styled, { css, keyframes } from 'styled-components'
import {
  theme,
  transition,
  colors,
  space,
  radii,
  borders,
  fontSizes,
  breakpoints,
  shadows
} from 'theme'

export const BREAKPOINT_SMALL_MAX = breakpoints[0]

const barGrow = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 ${colors.red0}; }
  50% { box-shadow: 0 0 12px 2px ${colors.red3}; }
`

const introSweep = keyframes`
  0% { transform: scaleX(0); opacity: 0.6; }
  50% { transform: scaleX(1); opacity: 1; }
  100% { transform: scaleX(1); opacity: 0.3; }
`

const slideInFromRight = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
`

const domainShrink = props => keyframes`
  0% {
    font-size: 42px;
    opacity: 1;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  60% {
    font-size: 42px;
    opacity: 1;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  100% {
    font-size: ${fontSizes[1]};
    opacity: 1;
    top: ${props.$flat ? '0px' : '32px'};
    transform: translate(-50%, 0);
  }
`

const domainShrinkMobile = props => keyframes`
  0% {
    font-size: ${fontSizes[3]};
    opacity: 1;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  60% {
    font-size: ${fontSizes[3]};
    opacity: 1;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  100% {
    font-size: ${fontSizes[0]};
    opacity: 1;
    top: ${props.$flat ? '0px' : '24px'};
    transform: translate(-50%, 0);
  }
`

export const RaceContainerWrapper = styled('div')`
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  min-height: 360px;
  background: ${({ $flat }) => ($flat ? 'transparent' : colors.white95)};
  backdrop-filter: ${({ $flat }) => ($flat ? 'none' : `blur(${space[3]})`)};
  -webkit-backdrop-filter: ${({ $flat }) =>
    $flat ? 'none' : `blur(${space[3]})`};
  border: ${({ $flat }) => ($flat ? '0' : `${borders[1]} ${colors.black10}`)};
  border-radius: ${({ $flat }) => ($flat ? '0' : '14px')};
  padding: ${({ $flat }) => ($flat ? '0' : '32px 28px 40px')};
  box-shadow: ${({ $flat }) =>
    $flat ? 'none' : `${shadows[3]}, inset 0 1px 0 ${colors.white80}`};
  overflow: hidden;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    min-height: 310px;
    padding: ${({ $flat }) => ($flat ? '0' : '24px 16px 32px')};
    border-radius: ${({ $flat }) => ($flat ? '0' : '10px')};
  }
`

export const RaceInner = styled('div')`
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const UrlLabel = styled('div')`
  ${theme({
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    color: 'black',
    mb: 0,
    letterSpacing: 0,
    lineHeight: 0
  })};
  text-transform: uppercase;
  display: flex;
  margin-top: 2px;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ fontSize: 0 })};
  }
`

export const UrlMeta = styled('div')`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'normal',
    color: 'black',
    letterSpacing: 0,
    lineHeight: 0
  })};
  text-transform: none;
  margin-top: 13px;
  margin-bottom: 12px;
  text-align: center;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ fontSize: 0 })};
    margin-top: 10px;
    margin-bottom: ${space[3]};
  }
`

export const AnnounceMeta = styled('div')`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'normal',
    color: 'black',
    letterSpacing: 0,
    mt: 2,
    gap: 2
  })};
  text-transform: none;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ fontSize: 0 })};
    gap: ${radii[3]};
    margin-top: ${radii[3]};
  }
`

export const DomainAnnounce = styled('div')`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  ${theme({
    fontFamily: 'mono',
    fontSize: '42px',
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 0
  })};
  text-transform: uppercase;
  white-space: nowrap;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${props =>
    css`
      ${domainShrink(props)} 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards
    `};

  & > ${AnnounceMeta} {
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ fontSize: 3 })};
    animation: ${props =>
      css`
        ${domainShrinkMobile(props)} 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards
      `};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    ${theme({ fontSize: 1 })};
    top: ${({ $flat }) => ($flat ? '0px' : '32px')};
    transform: translate(-50%, 0);
  }
`

export const AnnounceBackdrop = styled('div')`
  position: absolute;
  inset: 0;
  background: ${colors.white80};
  border-radius: ${({ $flat }) => ($flat ? '0' : '14px')};
  z-index: 5;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity ${({ $visible }) => ($visible ? '0.4s' : '0s')} ease;
  pointer-events: none;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    border-radius: ${({ $flat }) => ($flat ? '0' : '10px')};
  }
`

export const IntroLabel = styled('div')`
  ${theme({
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'regular',
    color: 'black',
    mb: '40px',
    letterSpacing: 0
  })};
  text-align: center;
  animation: ${fadeIn} 0.4s ease forwards;
  padding-top: ${({ $compact }) => ($compact ? '20px' : '0')};

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ fontSize: 0, mb: '34px' })};
    padding-top: ${({ $compact }) => ($compact ? '16px' : '0')};
  }
`

export const IntroHighlightBar = styled('div')`
  position: absolute;
  inset: 0;
  ${theme({ borderRadius: 2 })};
  transform-origin: left center;
  animation: ${introSweep} 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
`

export const LaneRow = styled('div')`
  display: flex;
  align-items: center;
  ${theme({ gap: '10px', height: '38px' })};
  opacity: ${({ $animate }) => ($animate ? 0 : 1)};
  animation: ${({ $animate, $delay }) =>
    $animate
      ? css`
        ${slideInFromRight} 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${$delay ||
        '0s'} forwards
      `
      : 'none'};

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    height: 32px;
    ${theme({ gap: 2 })};
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`

export const LaneRank = styled('span')`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    color: 'black',
    width: '28px'
  })};
  flex-shrink: 0;
  text-align: center;
  font-variant-numeric: tabular-nums;
  transition: color 0.3s ease;
  display: ${({ $compact }) => ($compact ? 'none' : 'inline')};

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    display: none;
  }
`

export const LaneName = styled('div')`
  ${theme({ fontFamily: 'mono', fontSize: 0 })};
  width: ${({ $compact }) => ($compact ? '110px' : '150px')};
  font-weight: ${({ $isMicrolink }) => ($isMicrolink ? '700' : '500')};
  color: ${({ $isMicrolink }) => ($isMicrolink ? colors.red6 : colors.black)};
  flex-shrink: 0;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    width: ${({ $compact }) => ($compact ? '90px' : '120px')};
    ${theme({ fontSize: 0 })};
  }
`

export const LaneTrack = styled('div')`
  flex: 1;
  height: 100%;
  position: relative;
  background: ${colors.black05};
  ${theme({ borderRadius: 2 })};
  overflow: hidden;
`

export const LaneBar = styled('div')`
  height: 100%;
  ${theme({ borderRadius: 2 })};
  transform-origin: left center;
  animation: ${({ $noGrow }) =>
    $noGrow
      ? 'none'
      : css`
        ${barGrow} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards
      `};
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  ${({ $isMicrolink }) =>
    $isMicrolink &&
    css`
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        ${theme({ borderRadius: 2 })};
        animation: ${pulseGlow} 2s ease-in-out infinite;
      }
    `}
`

export const LaneTime = styled('span')`
  ${theme({ fontFamily: 'mono', fontSize: 0, width: '90px' })};
  font-weight: 600;
  color: ${({ $isMicrolink }) => ($isMicrolink ? colors.red6 : colors.black)};
  flex-shrink: 0;
  text-align: right;
  font-variant-numeric: tabular-nums;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ width: '68px', fontSize: 0 })};
  }
`

export const BarTimeLabel = styled('span')`
  position: absolute;
  right: ${space[2]};
  top: 50%;
  transform: translateY(-50%);
  ${theme({ fontFamily: 'mono', fontSize: 0 })};
  font-weight: 600;
  color: ${colors.white95};
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  white-space: nowrap;
  text-shadow: 0 1px 2px ${colors.black50};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ fontSize: 0 })};
    right: ${radii[2]};
  }
`

export const CumulativeTime = styled('span')`
  ${theme({ fontFamily: 'mono', fontSize: 0, width: '90px' })};
  font-weight: 600;
  color: ${colors.black};
  flex-shrink: 0;
  text-align: right;
  font-variant-numeric: tabular-nums;
  transition: color 0.3s ease;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ width: '68px', fontSize: 0 })};
  }
`

export const LaneHeaderRow = styled('div')`
  display: flex;
  align-items: center;
  ${theme({ gap: '10px', mb: radii[3] })};

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ gap: 2 })};
  }
`

export const LaneHeaderSpacer = styled('span')`
  flex-shrink: 0;

  &.rank {
    ${theme({ width: '28px' })};

    @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
      display: none;
    }
  }

  &.name {
    ${theme({ width: '150px' })};

    @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
      ${theme({ width: '120px' })};
    }
  }
`

export const LaneHeaderLabel = styled('span')`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    letterSpacing: 0,
    width: '90px'
  })};
  font-weight: 600;
  text-transform: uppercase;
  color: ${colors.black};
  flex-shrink: 0;
  text-align: right;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ width: '68px', fontSize: 0 })};
  }
`

export const StepIndicator = styled('div')`
  display: flex;
  ${theme({ gap: radii[3], py: 1 })};
  justify-content: center;
  position: relative;
  z-index: 15;
`

export const StepDot = styled('button')`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: ${borders[1]} ${colors.black10};
  background: ${({ $active, $done }) =>
    $active ? colors.red6 : $done ? colors.black50 : 'transparent'};
  padding: 0;
  cursor: pointer;
  transition: background ${transition.medium}, transform ${transition.medium};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: scale(1.3);
    background: ${({ $active }) => ($active ? colors.red6 : colors.black10)};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.red5};
    outline-offset: ${radii[1]};
  }
`

export const LeaderboardRow = styled('div')`
  display: flex;
  align-items: center;
  ${theme({ gap: '14px', py: '12px', px: '18px' })};
  border-radius: ${radii[4]};
  background: ${({ $rank }) => ($rank === 0 ? colors.green0 : colors.black05)};
  border: ${borders[1]}
    ${({ $rank }) => ($rank === 0 ? colors.green2 : colors.black10)};
  animation: ${({ $animate }) =>
    $animate
      ? css`
        ${fadeIn} 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards
      `
      : 'none'};
  animation-delay: ${({ $animate, $rank }) =>
    $animate ? `${$rank * 80}ms` : '0s'};
  opacity: ${({ $animate }) => ($animate ? 0 : 1)};

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ py: '10px', px: '14px', gap: '10px' })};
  }
`

export const RankBadge = styled('span')`
  ${theme({ fontFamily: 'mono', fontSize: 0, fontWeight: 'bold' })};
  color: ${({ $rank }) => ($rank === 0 ? colors.green7 : colors.black)};
  ${theme({ width: fontSizes[3] })};
  text-align: center;
  font-variant-numeric: tabular-nums;
`

export const LeaderName = styled('span')`
  ${theme({ fontFamily: 'mono', fontSize: 1 })};
  font-weight: ${({ $rank }) => ($rank === 0 ? '700' : '500')};
  color: ${({ $rank }) => ($rank === 0 ? colors.green7 : colors.black)};
  flex: 1;
  min-width: 0;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ fontSize: 0 })};
  }
`

export const LeaderTime = styled('span')`
  ${theme({ fontFamily: 'mono', fontSize: 1 })};
  font-weight: 600;
  color: ${({ $rank }) => ($rank === 0 ? colors.green7 : colors.black)};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ fontSize: 0 })};
  }
`

export const LeaderDelta = styled('span')`
  ${theme({ fontFamily: 'mono', fontSize: 0 })};
  color: ${colors.black};
  font-variant-numeric: tabular-nums;
  ${theme({ width: fontSizes[6] })};
  text-align: right;
  flex-shrink: 0;
  white-space: nowrap;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    display: none;
  }
`

export const MetricTabs = styled('div')`
  display: flex;
  justify-content: center;
  ${theme({ gap: radii[3], marginBottom: fontSizes[3] })};
`

export const MetricTab = styled('button')`
  ${theme({ fontFamily: 'mono', fontSize: 1 })};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  background: ${({ $active }) => ($active ? colors.black05 : 'transparent')};
  border: ${borders[1]}
    ${({ $active }) => ($active ? colors.black50 : colors.black10)};
  border-radius: ${radii[3]};
  ${theme({ py: radii[3], px: '18px' })};
  color: ${colors.black};
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background ${transition.medium}, border-color ${transition.medium},
    color ${transition.medium};

  &:hover {
    background: ${colors.black05};
    color: ${colors.black};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.red5};
    outline-offset: ${radii[1]};
  }
`

export const RaceButton = styled('button')`
  ${theme({ fontFamily: 'mono', fontSize: 1, py: radii[3], px: '18px' })};
  font-weight: 600;
  background: transparent;
  border: ${borders[1]} ${colors.black10};
  border-radius: ${radii[3]};
  color: ${colors.black};
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background ${transition.medium}, border-color ${transition.medium},
    color ${transition.medium};

  &:hover {
    background: ${colors.black05};
    color: ${colors.black};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.red5};
    outline-offset: ${radii[1]};
  }
`
