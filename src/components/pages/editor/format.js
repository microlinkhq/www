import { prettier } from 'helpers/prettier'

import { isTypeScriptFile } from './shared'

export const formatSource = (code, file) =>
  prettier(code, isTypeScriptFile(file) ? 'ts' : 'js')
