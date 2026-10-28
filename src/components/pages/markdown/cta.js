import React from 'react'
import { colors } from 'theme'
import { CallToAction as FreeKeyCallToAction } from 'components/patterns/CallToAction'
import { LangLandingsNav } from 'components/patterns/LangLandings'
import { LANG_LANDINGS } from './lang/registry'

export const CallToAction = () => (
  <FreeKeyCallToAction
    accent={colors.orange7}
    outcome='converting URLs to markdown'
    cta='markdown:footer-cta'
  >
    <LangLandingsNav
      langs={LANG_LANDINGS}
      label='Language guides'
      accent={colors.orange9}
    />
  </FreeKeyCallToAction>
)
