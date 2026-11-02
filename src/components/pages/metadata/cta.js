import React from 'react'
import { CallToAction as FreeKeyCallToAction } from 'components/patterns/CallToAction'
import { LangLandingsNav } from 'components/patterns/LangLandings'
import { LANG_LANDINGS } from './lang/registry'
import { ACCENT } from './shared'

export const CallToAction = () => (
  <FreeKeyCallToAction
    outcome='going from URL to metadata in seconds'
    cta='metadata:footer-cta'
  >
    <LangLandingsNav
      langs={LANG_LANDINGS}
      label='Language guides'
      accent={ACCENT}
    />
  </FreeKeyCallToAction>
)
