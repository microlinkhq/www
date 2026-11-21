import { EveryoneProfitableVisual } from './visuals/everyone-profitable'
import { EveryoneShipsVisual } from './visuals/everyone-ships'
import { MakeFastFasterVisual } from './visuals/make-fast-faster'
import { NoMeetingsVisual } from './visuals/no-meetings'
import { OwnOutcomesVisual } from './visuals/own-outcomes'
import { ZeroPersonWorkVisual } from './visuals/zero-person-work'

export const META = {
  title: 'Manifesto: How Microlink Works',
  description:
    'The six principles behind how Microlink builds, decides and ships: zero-person work, everyone ships, everyone profitable, own outcomes, no meetings, and make fast faster.'
}

export const HERO = {
  eyebrow: 'Manifesto',
  title: 'How we work',
  description:
    'Six principles. Every project, page and decision at Microlink answers to them.'
}

export const CLOSING_LINKS = [
  { label: 'Read our history', href: '/about' },
  { label: 'See what we shipped', href: '/changelog' }
]

export const PRINCIPLES = [
  {
    id: 'zero-person-work',
    name: 'Zero-person work.',
    tagline: 'Once, never twice.',
    body: 'Doing a task by hand once shows you how it works. Doing it a second time is waste. Turn it into a script, a skill or a scheduled job, and nobody touches it again. That keeps a small team moving like a big one.',
    Visual: ZeroPersonWorkVisual
  },
  {
    id: 'everyone-ships',
    name: 'Everyone ships.',
    tagline: 'Bring work, not ideas.',
    body: 'An idea is cheap to say and easy to ignore. A draft, a page or a prototype can be read, tried and shipped the same day. Whoever brings the work sets the direction.',
    Visual: EveryoneShipsVisual
  },
  {
    id: 'everyone-profitable',
    name: 'Everyone profitable.',
    tagline: 'Every project pays for itself.',
    body: 'What we sell pays for what we build. Every project earns its place through revenue, the customers it brings in, or the hours it saves. If a project can’t show any of those, it’s a hobby, and we stop it.',
    Visual: EveryoneProfitableVisual
  },
  {
    id: 'own-outcomes',
    name: 'Own outcomes.',
    tagline: 'Don’t wait for orders.',
    body: 'Nobody hands out tasks here. If you see a problem, it’s yours until it’s fixed. You own the result, including the parts nobody asked for.',
    Visual: OwnOutcomesVisual
  },
  {
    id: 'no-meetings',
    name: 'No meetings.',
    tagline: 'Write it. Decide. Ship.',
    body: 'Writing forces clear thinking and leaves a record anyone can read later. People answer a written proposal when it suits them, in any time zone. Decide in the thread, then move on.',
    Visual: NoMeetingsVisual
  },
  {
    id: 'make-fast-faster',
    name: 'Make fast faster.',
    tagline: 'Ask why great takes this long, then fix it.',
    body: 'Slow work usually has one extra step behind it: a handoff, an approval or a tool. Find that step and remove it. The next thing then ships faster on its own.',
    Visual: MakeFastFasterVisual
  }
]
