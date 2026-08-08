import React from 'react'
import { colors } from 'theme'

import { LangLandings as LangLandingsPattern } from 'components/patterns/LangLandings'

import { LANG_LANDINGS } from './lang/registry'

export const LangLandings = () => (
  <LangLandingsPattern
    id='languages'
    accent={colors.red6}
    langs={LANG_LANDINGS}
    title={
      <>
        Screenshots in <span style={{ color: colors.red6 }}>your language</span>
      </>
    }
    caption='Language-specific guides with copy-paste snippets, framework integrations, and deployment notes for the runtime you already ship.'
  />
)
