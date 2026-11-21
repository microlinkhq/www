import MANIFEST from './figures/manifest.json'
import { createBalanceScalePose } from './anatomy/motion/everyone-profitable'
import { createLaunchPadPose } from './anatomy/motion/everyone-ships'
import { createMarbleRunPose } from './anatomy/motion/make-fast-faster'
import { createTypewriterPose } from './anatomy/motion/no-meetings'
import { createTorqueWrenchPose } from './anatomy/motion/own-outcomes'
import { createStampingJigPose } from './anatomy/motion/zero-person-work'

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
    body: 'Doing a task by hand once shows you how it works. Doing it a second time is waste. Turn it into a script, [a skill](/skills) or a scheduled job, and nobody touches it again. That keeps a small team moving like a big one.',
    figure: {
      ...MANIFEST['zero-person-work'],
      load: () => import('./figures/zero-person-work.json'),
      createPose: createStampingJigPose,
      restShare: 0.6
    }
  },
  {
    id: 'everyone-ships',
    name: 'Everyone ships.',
    tagline: 'Bring work, not ideas.',
    body: 'An idea is cheap to say and easy to ignore. A draft, a page or a prototype can be read, tried and [shipped the same day](/changelog). Whoever brings the work sets the direction.',
    figure: {
      ...MANIFEST['everyone-ships'],
      load: () => import('./figures/everyone-ships.json'),
      createPose: createLaunchPadPose,
      restShare: 0.2
    }
  },
  {
    id: 'everyone-profitable',
    name: 'Everyone profitable.',
    tagline: 'Every project pays for itself.',
    body: '[What we sell](/pricing) pays for what we build. Every project earns its place through revenue, the customers it brings in, or the hours it saves. If a project can’t show any of those, it’s a hobby, and we stop it.',
    figure: {
      ...MANIFEST['everyone-profitable'],
      load: () => import('./figures/everyone-profitable.json'),
      createPose: createBalanceScalePose,
      restShare: 0.6
    }
  },
  {
    id: 'own-outcomes',
    name: 'Own outcomes.',
    tagline: 'Don’t wait for orders.',
    body: 'Nobody hands out tasks here. If you see a problem, [it’s yours until it’s fixed](/blog/faster-webgl-screenshots). You own the result, including the parts nobody asked for.',
    figure: {
      ...MANIFEST['own-outcomes'],
      load: () => import('./figures/own-outcomes.json'),
      createPose: createTorqueWrenchPose,
      restShare: 0.5
    }
  },
  {
    id: 'no-meetings',
    name: 'No meetings.',
    tagline: 'Write it. Decide. Ship.',
    body: 'Writing forces clear thinking and leaves a record anyone can read later. People answer [a written proposal](/blog/master-plan-for-2019) when it suits them, in any time zone. Decide in the thread, then move on.',
    figure: {
      ...MANIFEST['no-meetings'],
      load: () => import('./figures/no-meetings.json'),
      createPose: createTypewriterPose,
      restShare: 0.55
    }
  },
  {
    id: 'make-fast-faster',
    name: 'Make fast faster.',
    tagline: 'Ask why great takes this long, then fix it.',
    body: 'Slow work usually has one extra step behind it: a handoff, an approval or a tool. [Find that step and remove it](/blog/how-we-cut-our-kubernetes-image-pull-from-111s-to-25s). The next thing then ships faster on its own.',
    figure: {
      ...MANIFEST['make-fast-faster'],
      load: () => import('./figures/make-fast-faster.json'),
      createPose: createMarbleRunPose,
      restShare: 0.75
    }
  }
]
