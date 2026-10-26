import React from 'react'
import { colors } from 'theme'
import { CallToAction as FreeKeyCallToAction } from 'components/patterns/CallToAction'
import { LangLandingsNav } from 'components/patterns/LangLandings'
import { LANG_LANDINGS } from './lang/registry'

export const CallToAction = () => (
  <FreeKeyCallToAction
    outcome='capturing screenshots'
    cta='screenshot:footer-cta'
  >
    <LangLandingsNav
      langs={LANG_LANDINGS}
      label='Language guides'
      accent={colors.red6}
    />
  </FreeKeyCallToAction>
)
