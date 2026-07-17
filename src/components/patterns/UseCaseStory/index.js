// Use cases reuse the accent-agnostic primitives from the CustomerStory
// pattern so both sections stay visually and structurally consistent. Only the
// use-case-specific data and the "More use cases" carousel live here.

export { ACCENT, USE_CASES } from './use-cases'
export {
  SECTION_PX,
  SECTION_PY,
  SECTION_MAX_WIDTH,
  Section,
  SectionInner,
  Caption,
  Figure,
  FigureImage
} from 'components/patterns/CustomerStory/primitives'
export { DashedGridOverlay } from 'components/patterns/DashedGridOverlay'
export { Eyebrow, StoryTag } from 'components/patterns/CustomerStory/chrome'
export { CtaSection } from 'components/patterns/CustomerStory/CtaSection'
export { WhyCard } from 'components/patterns/CustomerStory/WhyCards'
export { MoreUseCases } from './MoreUseCases'
