import React from 'react'

import { LangLandings as LangLandingsPattern } from 'components/patterns/LangLandings'

import { ACCENT } from './shared'
import { LANG_LANDINGS } from './lang/registry'

export const LangLandings = () => (
  <LangLandingsPattern
    id='languages'
    accent={ACCENT}
    langs={LANG_LANDINGS}
    title={
      <>
        HTML to PDF in <span style={{ color: ACCENT }}>your language</span>
      </>
    }
    caption='Language-specific guides with copy-paste snippets, framework integrations, and deployment notes for the runtime you already ship.'
  />
)
