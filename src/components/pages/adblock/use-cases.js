import React from 'react'
import { EyeOff, FileText, MousePointer, ToggleLeft, Zap } from 'react-feather'

import Switcher from 'components/patterns/UseCaseSwitcher'

const ICON_MAP = {
  zap: Zap,
  mouse: MousePointer,
  'eye-off': EyeOff,
  file: FileText,
  toggle: ToggleLeft
}

export const UseCaseSwitcher = ({ panels, language }) => (
  <Switcher
    baseId='adblock-use-cases'
    language={language}
    panels={panels.map(panel => ({
      ...panel,
      icon: ICON_MAP[panel.icon] || Zap
    }))}
  />
)
