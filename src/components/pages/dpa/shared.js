import { slug } from 'github-slugger'
import { layout } from 'theme'

import { DPA_LEAD_REF } from 'components/pages/enterprise/lead-mailto'

export { DPA_MAILTO } from 'components/pages/enterprise/lead-mailto'

export const REQUEST_DPA_HREF = `/enterprise?ref=${DPA_LEAD_REF}`

export const REQUEST_DPA_LABEL = 'Request a signed DPA'

export const LEGAL_SECTIONS = [
  '1. Definitions and Interpretation',
  '2. Processing of Company Personal Data',
  '3. Processor Personnel',
  '4. Security',
  '5. Subprocessing',
  '6. Data Subject Rights',
  '7. Personal Data Breach',
  '8. Data Protection Impact Assessment and Prior Consultation',
  '9. Deletion or return of Company Personal Data',
  '10. Audit rights',
  '11. Data Transfer',
  '12. General Terms',
  '13. Governing Law and Jurisdiction',
  'Annex I: Description of the processing',
  'Annex II: Technical and organisational measures',
  'Annex III: Subprocessors'
]

export const toAnchor = title => `#${slug(title)}`

export const BLOCK_STYLE = {
  maxWidth: layout.small,
  mx: 'auto',
  width: '100%'
}
