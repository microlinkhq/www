import React from 'react'
import { CallToAction as FreeKeyCallToAction } from 'components/patterns/CallToAction'
import { LangLandingsNav } from 'components/patterns/LangLandings'
import { LANG_LANDINGS } from './lang/registry'

export const CallToAction = () => (
  <FreeKeyCallToAction outcome='generating PDFs' cta='pdf:footer-cta'>
    <LangLandingsNav langs={LANG_LANDINGS} label='Language guides' />
  </FreeKeyCallToAction>
)
