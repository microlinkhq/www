import { theme } from 'theme'
import styled from 'styled-components'

import { Link } from 'components/elements/Link'

export const CardLink = styled(Link)`
  ${theme({
    color: 'secondary',
    fontWeight: 'bold',
    fontSize: [0, 1, 1, 1]
  })}
  margin-top: auto;
`

export const PROVIDERS = [
  {
    name: 'Akamai',
    category: 'Antibot',
    methods: ['Headers', 'Cookies', 'HTML']
  },
  { name: 'AliExpress CAPTCHA', category: 'CAPTCHA', methods: ['HTML', 'URL'] },
  { name: 'Anubis', category: 'Antibot', methods: ['HTML'] },
  {
    name: 'AWS WAF',
    category: 'Antibot',
    methods: ['Headers', 'Cookies', 'HTML']
  },
  { name: 'Captcha.eu', category: 'CAPTCHA', methods: ['HTML', 'URL'] },
  { name: 'Cheq', category: 'Antibot', methods: ['HTML', 'URL'] },
  { name: 'Cloudflare', category: 'Antibot', methods: ['Headers', 'Cookies'] },
  {
    name: 'Cloudflare Turnstile',
    category: 'CAPTCHA',
    methods: ['HTML', 'URL']
  },
  { name: 'DataDome', category: 'Antibot', methods: ['Headers', 'Cookies'] },
  { name: 'Friendly Captcha', category: 'CAPTCHA', methods: ['HTML', 'URL'] },
  {
    name: 'FunCaptcha (Arkose Labs)',
    category: 'CAPTCHA',
    methods: ['HTML', 'URL']
  },
  { name: 'GeeTest', category: 'CAPTCHA', methods: ['HTML', 'URL'] },
  { name: 'hCaptcha', category: 'CAPTCHA', methods: ['HTML', 'URL'] },
  {
    name: 'Imperva / Incapsula',
    category: 'Antibot',
    methods: ['Headers', 'Cookies', 'HTML']
  },
  { name: 'Instagram', category: 'Platform-specific', methods: ['HTML'] },
  { name: 'Kasada', category: 'Antibot', methods: ['Headers', 'HTML'] },
  { name: 'LinkedIn', category: 'Platform-specific', methods: ['Status Code'] },
  { name: 'Meetrics', category: 'Antibot', methods: ['HTML', 'URL'] },
  { name: 'Ocule', category: 'Antibot', methods: ['HTML', 'URL'] },
  {
    name: 'PerimeterX',
    category: 'Antibot',
    methods: ['Headers', 'Cookies', 'HTML']
  },
  { name: 'QCloud Captcha', category: 'CAPTCHA', methods: ['HTML', 'URL'] },
  { name: 'reCAPTCHA', category: 'CAPTCHA', methods: ['HTML', 'URL'] },
  { name: 'Reblaze', category: 'Antibot', methods: ['Cookies', 'HTML'] },
  {
    name: 'Reddit',
    category: 'Platform-specific',
    methods: ['HTML', 'Status Code']
  },
  { name: 'Shape Security', category: 'Antibot', methods: ['Headers', 'HTML'] },
  { name: 'Sucuri', category: 'Antibot', methods: ['HTML'] },
  { name: 'ThreatMetrix', category: 'Antibot', methods: ['HTML', 'URL'] },
  { name: 'Vercel', category: 'Antibot', methods: ['Headers'] },
  { name: 'YouTube', category: 'Platform-specific', methods: ['HTML'] }
]
