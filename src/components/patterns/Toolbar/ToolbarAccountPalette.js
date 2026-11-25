import { css } from 'styled-components'

export const ACCOUNT_COLORS = {
  ink: 'var(--account-ink)',
  inkSoft: 'var(--account-ink-soft)',
  inkMuted: 'var(--account-ink-muted)',
  inkFaint: 'var(--account-ink-faint)',
  line: 'var(--account-line)',
  lineStrong: 'var(--account-line-strong)',
  paper: 'var(--account-paper)',
  brand: 'var(--account-brand)',
  brandStrong: 'var(--account-brand-strong)'
}

export const ACCOUNT_FONT_SIZE = '13.5px'
export const ACCOUNT_LINE_HEIGHT = 1.5
export const ACCOUNT_EMAIL_FONT_SIZE = '12px'
export const ACCOUNT_EMAIL_LINE_HEIGHT = '16px'
export const ACCOUNT_SEMIBOLD = 600
export const ACCOUNT_ITEM_PX = '12px'
export const ACCOUNT_ITEM_GAP = '10px'
export const ACCOUNT_UPGRADE_PY = '10px'
export const ACCOUNT_POPUP_PADDING = '6px'
export const ACCOUNT_POPUP_RADIUS = '12px'
export const ACCOUNT_POPUP_SHADOW = '0 12px 32px -12px rgb(15 15 20 / 0.25)'

export const accountPalette = css`
  --account-ink: #0f0f14;
  --account-ink-soft: #4a4a57;
  --account-ink-muted: #6b6b78;
  --account-ink-faint: #9a9aa6;
  --account-line: #ebebef;
  --account-line-strong: #d6d6de;
  --account-paper: #f6f6f8;
  --account-brand: #e11d68;
  --account-brand-strong: #c8175a;

  @media (prefers-contrast: more) {
    --account-ink-soft: #2e2e38;
    --account-ink-muted: #45454f;
    --account-ink-faint: #64646f;
    --account-line: #b4b4c0;
    --account-line-strong: #85858f;
  }
`
