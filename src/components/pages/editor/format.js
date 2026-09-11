import { prettier } from 'helpers/prettier'

export const formatSource = code => prettier(code, 'js')
