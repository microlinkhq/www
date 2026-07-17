// Feature pages reuse the accent-agnostic primitives from the CustomerStory
// pattern so feature, use-case, and customer-story sections stay visually
// consistent. The feature registry (which drives the /features landing and
// the footer) and the feature-page scaffolding live here.

export { ACCENT, FEATURES } from './features'
export {
  SECTION_PX,
  SECTION_PY,
  SECTION_MAX_WIDTH,
  Section,
  SectionInner,
  Caption
} from 'components/patterns/CustomerStory/primitives'
export { DashedGridOverlay } from 'components/patterns/DashedGridOverlay'
export {
  Arrow,
  BodyText,
  Card,
  CardBody,
  CardKicker,
  CardMain,
  CardSide,
  CardTitle,
  ChipRow,
  Eyebrow,
  Node,
  NodeActive,
  NodeLabel,
  NodeSub,
  PlanTag,
  RuleChip,
  ScenarioHeader,
  ScenarioRow
} from './primitives'
