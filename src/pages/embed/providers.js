import { colors, layout, theme, transition } from 'theme'
import React, { useState, useMemo } from 'react'
import styled from 'styled-components'

import {
  siYoutube,
  siInstagram,
  siTiktok,
  siFigma,
  siFacebook,
  siLoom,
  siVimeo,
  siNaver,
  siPinterest,
  siSpotify,
  siReddit,
  siGiphy,
  siSoundcloud,
  siBehance,
  siKickstarter,
  siMiro,
  siFlickr,
  siNewyorktimes,
  siApplemusic,
  siSway,
  siX,
  siAudiomack,
  siBluesky,
  siCodesandbox,
  siDailymotion,
  siDeviantart,
  siElevenlabs,
  siFlat,
  siFramer,
  siIfixit,
  siIheartradio,
  siIssuu,
  siLottiefiles,
  siMixcloud,
  siObservable,
  siOdysee,
  siPadlet,
  siPrezi,
  siReplit,
  siReverbnation,
  siRumble,
  siSketchfab,
  siSlideshare,
  siSmugmug,
  siSpeakerdeck,
  siSpreaker,
  siTed,
  siTumblr,
  siWistia,
  siWordpress,
  siHubspot
} from 'simple-icons'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'
import { UNAVATAR_TOKEN } from 'helpers/unavatar'

import { FeaturedToolCard } from 'components/patterns/Tools/ToolCards'
import { TOOLS } from 'components/patterns/Tools/toolCatalog'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const UNAVATAR = 'https://unavatar.io'

const PROVIDERS = [
  { name: 'YouTube', slug: 'youtube', icon: siYoutube },
  { name: 'Instagram', slug: 'instagram', icon: siInstagram },
  { name: 'Twitter / X', slug: 'twitter-or-x', icon: siX },
  { name: 'TikTok', slug: 'tiktok', icon: siTiktok },
  { name: 'Figma', slug: 'figma', icon: siFigma },
  { name: 'Replit', slug: 'replit', icon: siReplit },
  { name: 'Facebook', slug: 'facebook', icon: siFacebook },
  { name: 'Loom', slug: 'loom', icon: siLoom },
  { name: 'Vimeo', slug: 'vimeo', icon: siVimeo },
  {
    name: 'Canva',
    slug: 'canva',
    color: '#00C4CC',
    logo: `${UNAVATAR}/canva.com?token=${UNAVATAR_TOKEN}`
  },
  { name: 'CodeSandbox', slug: 'codesandbox', icon: siCodesandbox },
  { name: 'Pinterest', slug: 'pinterest', icon: siPinterest },
  { name: 'Spotify', slug: 'spotify', icon: siSpotify },
  { name: 'Reddit', slug: 'reddit', icon: siReddit },
  { name: 'GIPHY', slug: 'giphy', icon: siGiphy },
  { name: 'SoundCloud', slug: 'soundcloud', icon: siSoundcloud },
  { name: 'Behance', slug: 'behance', icon: siBehance },
  { name: 'Kickstarter', slug: 'kickstarter', icon: siKickstarter },
  { name: 'HubSpot', slug: 'hubspot', icon: siHubspot },
  { name: 'Miro', slug: 'miro', icon: siMiro },
  {
    name: 'Microsoft',
    slug: 'microsoft',
    color: '#5E5E5E',
    logo: `${UNAVATAR}/microsoft.com?token=${UNAVATAR_TOKEN}`
  },
  { name: 'Flickr', slug: 'flickr', icon: siFlickr },
  { name: 'Framer', slug: 'framer', icon: siFramer },
  { name: 'ElevenLabs', slug: 'elevenlabs', icon: siElevenlabs },
  { name: 'New York Times', slug: 'new-york-times', icon: siNewyorktimes },
  { name: 'Apple Music', slug: 'apple-music', icon: siApplemusic },
  { name: 'WordPress', slug: 'wordpress-com', icon: siWordpress },
  { name: 'Tumblr', slug: 'tumblr', icon: siTumblr },
  { name: 'Dailymotion', slug: 'dailymotion', icon: siDailymotion },
  {
    name: 'Getty Images',
    slug: 'getty-images',
    color: '#000000',
    logo: `${UNAVATAR}/gettyimages.com?token=${UNAVATAR_TOKEN}`
  },
  { name: 'TED', slug: 'ted', icon: siTed },
  { name: 'Bluesky', slug: 'bluesky', icon: siBluesky },
  { name: 'Wistia', slug: 'wistia', icon: siWistia },
  {
    name: 'CodePen',
    slug: 'codepen',
    color: '#000000',
    logo: `${UNAVATAR}/codepen.io?token=${UNAVATAR_TOKEN}`
  },
  { name: 'SlideShare', slug: 'slideshare', icon: siSlideshare },
  {
    name: 'Scribd',
    slug: 'scribd',
    color: '#1A7BBA',
    logo: `${UNAVATAR}/scribd.com?token=${UNAVATAR_TOKEN}`
  },
  { name: 'DeviantArt', slug: 'deviantart-com', icon: siDeviantart },
  { name: 'Prezi', slug: 'prezi', icon: siPrezi },
  { name: 'Issuu', slug: 'issuu', icon: siIssuu },
  { name: 'Rumble', slug: 'rumble', icon: siRumble },
  { name: 'iFixit', slug: 'ifixit', icon: siIfixit },
  {
    name: 'Datawrapper',
    slug: 'datawrapper',
    color: '#1D81A2',
    logo: `${UNAVATAR}/datawrapper.de?token=${UNAVATAR_TOKEN}`
  },
  { name: 'Naver TV', slug: 'naver-tv', icon: siNaver },
  {
    name: 'Gyazo',
    slug: 'gyazo',
    color: '#6AC2E7',
    logo: `${UNAVATAR}/gyazo.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Flourish',
    slug: 'flourish',
    color: '#3654FF',
    logo: `${UNAVATAR}/public.flourish.studio?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Brightcove',
    slug: 'brightcove',
    color: '#006DCC',
    logo: `${UNAVATAR}/brightcove.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Hulu',
    slug: 'hulu',
    color: '#1CE783',
    logo: `${UNAVATAR}/hulu.com?token=${UNAVATAR_TOKEN}`
  },
  { name: 'Mixcloud', slug: 'mixcloud', icon: siMixcloud },
  { name: 'iHeartRadio', slug: 'iheartradio', icon: siIheartradio },
  { name: 'Sketchfab', slug: 'sketchfab', icon: siSketchfab },
  { name: 'Padlet', slug: 'padlet', icon: siPadlet },
  {
    name: 'Streamable',
    slug: 'streamable',
    color: '#0B79E3',
    logo: `${UNAVATAR}/streamable.com?token=${UNAVATAR_TOKEN}`
  },
  { name: 'Audiomack', slug: 'audiomack', icon: siAudiomack },
  {
    name: 'Whimsical',
    slug: 'whimsical',
    color: '#7B57DF',
    logo: `${UNAVATAR}/whimsical.com?token=${UNAVATAR_TOKEN}`
  },
  { name: 'Microsoft Sway', slug: 'microsoft-sway', icon: siSway },
  { name: 'LottieFiles', slug: 'lottiefiles', icon: siLottiefiles },
  {
    name: 'Vidyard',
    slug: 'vidyard',
    color: '#25BB66',
    logo: `${UNAVATAR}/vidyard.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'IFTTT',
    slug: 'ifttt',
    color: '#666666',
    logo: `${UNAVATAR}/ifttt.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Synthesia',
    slug: 'synthesia',
    color: '#666666',
    logo: `${UNAVATAR}/synthesia.io?token=${UNAVATAR_TOKEN}`
  },
  { name: 'SmugMug', slug: 'smugmug', icon: siSmugmug },
  { name: 'Speaker Deck', slug: 'speakerdeck', icon: siSpeakerdeck },
  {
    name: 'Vevo',
    slug: 'vevo',
    color: '#ED1439',
    logo: `${UNAVATAR}/vevo.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'BitChute',
    slug: 'bitchute',
    color: '#EF4137',
    logo: `${UNAVATAR}/bitchute.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Infogram',
    slug: 'infogram',
    color: '#00C9A2',
    logo: `${UNAVATAR}/infogram.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Matterport',
    slug: 'matterport',
    color: '#000000',
    logo: `${UNAVATAR}/matterport.com?token=${UNAVATAR_TOKEN}`
  },
  { name: 'Observable', slug: 'observable', icon: siObservable },
  { name: 'Odysee', slug: 'odysee', icon: siOdysee },
  {
    name: 'Podbean',
    slug: 'podbean',
    color: '#6CBB47',
    logo: `${UNAVATAR}/podbean.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Zeplin',
    slug: 'zeplin',
    color: '#FDBD39',
    logo: `${UNAVATAR}/zeplin.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Carbon',
    slug: 'carbon',
    color: '#666666',
    logo: `${UNAVATAR}/carbon.now.sh?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Sketch',
    slug: 'sketch',
    color: '#666666',
    logo: `${UNAVATAR}/sketch.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Balsamiq',
    slug: 'balsamiq',
    color: '#CC0000',
    logo: `${UNAVATAR}/balsamiq.cloud?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Simplecast',
    slug: 'simplecast',
    color: '#F5B724',
    logo: `${UNAVATAR}/simplecast.com?token=${UNAVATAR_TOKEN}`
  },
  { name: 'Spreaker', slug: 'spreaker', icon: siSpreaker },
  {
    name: 'Inoreader',
    slug: 'inoreader',
    color: '#666666',
    logo: `${UNAVATAR}/inoreader.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Gong',
    slug: 'gong',
    color: '#666666',
    logo: `${UNAVATAR}/gong.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Mixpanel',
    slug: 'mixpanel',
    color: '#666666',
    logo: `${UNAVATAR}/mixpanel.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Totango',
    slug: 'totango',
    color: '#666666',
    logo: `${UNAVATAR}/totango.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Tella',
    slug: 'tella',
    color: '#666666',
    logo: `${UNAVATAR}/tella.video?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Wokwi',
    slug: 'wokwi',
    color: '#3751C7',
    logo: `${UNAVATAR}/wokwi.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Raindrop.io',
    slug: 'raindrop',
    color: '#3290EC',
    logo: `${UNAVATAR}/raindrop.io?token=${UNAVATAR_TOKEN}`
  },
  { name: 'ReverbNation', slug: 'reverbnation', icon: siReverbnation },
  {
    name: 'Yumpu',
    slug: 'yumpu',
    color: '#D72E26',
    logo: `${UNAVATAR}/yumpu.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Coub',
    slug: 'coub',
    color: '#2BA9E1',
    logo: `${UNAVATAR}/coub.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Cacoo',
    slug: 'cacoo',
    color: '#57C2A7',
    logo: `${UNAVATAR}/cacoo.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Animoto',
    slug: 'animoto',
    color: '#3781F6',
    logo: `${UNAVATAR}/animoto.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Audius',
    slug: 'audius',
    color: '#CC0FE0',
    logo: `${UNAVATAR}/audius.co?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Buttondown',
    slug: 'buttondown',
    color: '#0069FF',
    logo: `${UNAVATAR}/buttondown.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Wave.video',
    slug: 'wavevideo',
    color: '#2D60FF',
    logo: `${UNAVATAR}/wave.video?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Homey',
    slug: 'homey',
    color: '#666666',
    logo: `${UNAVATAR}/homey.app?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Songlink',
    slug: 'songlink',
    color: '#666666',
    logo: `${UNAVATAR}/song.link?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Mermaid Ink',
    slug: 'mermaid-ink',
    color: '#666666',
    logo: `${UNAVATAR}/mermaid.ink?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'PeerTube',
    slug: 'peertube-tv',
    color: '#666666',
    logo: `${UNAVATAR}/peertube.tv?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Nebula',
    slug: 'nebula',
    color: '#666666',
    logo: `${UNAVATAR}/nebula.tv?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'CircuitLab',
    slug: 'circuitlab',
    color: '#2B70D4',
    logo: `${UNAVATAR}/circuitlab.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'DocDroid',
    slug: 'docdroid',
    color: '#666666',
    logo: `${UNAVATAR}/docdroid.net?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Ludus',
    slug: 'ludus',
    color: '#2A2A2A',
    logo: `${UNAVATAR}/ludus.one?token=${UNAVATAR_TOKEN}`
  },
  { name: 'Flat.io', slug: 'flat', icon: siFlat },
  {
    name: 'amCharts',
    slug: 'amcharts-live-editor',
    color: '#3CABFF',
    logo: `${UNAVATAR}/live.amcharts.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'StoryMaps',
    slug: 'storymaps',
    color: '#666666',
    logo: `${UNAVATAR}/storymaps.arcgis.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Acast',
    slug: 'acast',
    color: '#666666',
    logo: `${UNAVATAR}/acast.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Vouch',
    slug: 'vouch',
    color: '#3BD2C1',
    logo: `${UNAVATAR}/vouchfor.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'DocumentCloud',
    slug: 'documentcloud',
    color: '#666666',
    logo: `${UNAVATAR}/documentcloud.org?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Beautiful',
    slug: 'beautiful',
    color: '#666666',
    logo: `${UNAVATAR}/beautiful.ai?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Ceros',
    slug: 'ceros',
    color: '#666666',
    logo: `${UNAVATAR}/ceros.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Rooster Teeth',
    slug: 'roosterteeth',
    color: '#666666',
    logo: `${UNAVATAR}/roosterteeth.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Marimo',
    slug: 'marimo',
    color: '#666666',
    logo: `${UNAVATAR}/marimo.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'hearthis.at',
    slug: 'hearthis',
    color: '#666666',
    logo: `${UNAVATAR}/hearthis.at?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Kit',
    slug: 'kit',
    color: '#666666',
    logo: `${UNAVATAR}/kit.co?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'HubSpot Bynder',
    slug: 'hubspot-bynder',
    color: '#666666',
    logo: `${UNAVATAR}/bynder.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Altium',
    slug: 'altium',
    color: '#666666',
    logo: `${UNAVATAR}/altium.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Twinmotion',
    slug: 'twinmotion',
    color: '#666666',
    logo: `${UNAVATAR}/twinmotion.unrealengine.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'KakaoTV',
    slug: 'kakaotv',
    color: '#666666',
    logo: `${UNAVATAR}/tv.kakao.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'AfreecaTV',
    slug: 'afreecatv',
    color: '#666666',
    logo: `${UNAVATAR}/afreecatv.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'SoopLive',
    slug: 'sooplive',
    color: '#666666',
    logo: `${UNAVATAR}/sooplive.co.kr?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Vlive',
    slug: 'vlive',
    color: '#666666',
    logo: `${UNAVATAR}/vlive.tv?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Actblue',
    slug: 'actblue',
    color: '#666666',
    logo: `${UNAVATAR}/actblue.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Wolfram Cloud',
    slug: 'wolframcloud',
    color: '#666666',
    logo: `${UNAVATAR}/wolframcloud.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Ustream',
    slug: 'ustream',
    color: '#666666',
    logo: `${UNAVATAR}/ustream.tv?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Spotlightr',
    slug: 'spotlightr',
    color: '#666666',
    logo: `${UNAVATAR}/spotlightr.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'SproutVideo',
    slug: 'sproutvideo',
    color: '#666666',
    logo: `${UNAVATAR}/sproutvideo.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Audioboom',
    slug: 'audioboom',
    color: '#666666',
    logo: `${UNAVATAR}/audioboom.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Omnystudio',
    slug: 'omnystudio',
    color: '#666666',
    logo: `${UNAVATAR}/omnystudio.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Hippo Video',
    slug: 'hippovideo',
    color: '#666666',
    logo: `${UNAVATAR}/hippovideo.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Gumlet',
    slug: 'gumlet',
    color: '#666666',
    logo: `${UNAVATAR}/gumlet.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Bunny.net',
    slug: 'bunnynet',
    color: '#666666',
    logo: `${UNAVATAR}/bunny.net?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Blackfire',
    slug: 'blackfire-io',
    color: '#25282B',
    logo: `${UNAVATAR}/blackfire.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Screencast',
    slug: 'screencast-com',
    color: '#666666',
    logo: `${UNAVATAR}/screencast.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Web3 Is Going Great',
    slug: 'web3isgoinggreat',
    color: '#666666',
    logo: `${UNAVATAR}/web3isgoinggreat.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Clyp',
    slug: 'clyp',
    color: '#666666',
    logo: `${UNAVATAR}/clyp.it?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Polldaddy',
    slug: 'poll-daddy',
    color: '#666666',
    logo: `${UNAVATAR}/polldaddy.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Heyzine',
    slug: 'heyzine',
    color: '#666666',
    logo: `${UNAVATAR}/heyzine.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Codehs',
    slug: 'codehs',
    color: '#666666',
    logo: `${UNAVATAR}/codehs.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Scribblemaps',
    slug: 'scribblemaps',
    color: '#666666',
    logo: `${UNAVATAR}/scribblemaps.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Docswell',
    slug: 'docswell',
    color: '#666666',
    logo: `${UNAVATAR}/docswell.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Dtube',
    slug: 'dtube',
    color: '#666666',
    logo: `${UNAVATAR}/d.tube?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Framatube',
    slug: 'framatube',
    color: '#666666',
    logo: `${UNAVATAR}/framatube.org?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Geograph',
    slug: 'geograph',
    color: '#666666',
    logo: `${UNAVATAR}/geograph.org.uk?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Insighttimer',
    slug: 'insighttimer',
    color: '#666666',
    logo: `${UNAVATAR}/insighttimer.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Jovian',
    slug: 'jovian',
    color: '#666666',
    logo: `${UNAVATAR}/jovian.ai?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'LearningApps',
    slug: 'learningapps-org',
    color: '#666666',
    logo: `${UNAVATAR}/learningapps.org?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'NFB',
    slug: 'nfb-ca',
    color: '#666666',
    logo: `${UNAVATAR}/nfb.ca?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Skoletube',
    slug: 'skoletube',
    color: '#666666',
    logo: `${UNAVATAR}/skoletube.dk?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Sutori',
    slug: 'sutori',
    color: '#666666',
    logo: `${UNAVATAR}/sutori.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Typecast',
    slug: 'typecast',
    color: '#666666',
    logo: `${UNAVATAR}/typecast.ai?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Deseretnews',
    slug: 'deseretnews',
    color: '#666666',
    logo: `${UNAVATAR}/deseretnews.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: '23hq',
    slug: '23hq',
    color: '#666666',
    logo: `${UNAVATAR}/23hq.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: '3Q',
    slug: '3q',
    color: '#666666',
    logo: `${UNAVATAR}/3q.video?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Abraia',
    slug: 'abraia',
    color: '#666666',
    logo: `${UNAVATAR}/abraia.me?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Amtraker',
    slug: 'amtraker',
    color: '#666666',
    logo: `${UNAVATAR}/amtraker.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Animatron',
    slug: 'animatron',
    color: '#666666',
    logo: `${UNAVATAR}/animatron.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Anniemusic',
    slug: 'anniemusic',
    color: '#666666',
    logo: `${UNAVATAR}/anniemusic.app?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Appforcestudio',
    slug: 'appforcestudio',
    color: '#666666',
    logo: `${UNAVATAR}/appforcestudio.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Assemblrworld',
    slug: 'assemblrworld',
    color: '#666666',
    logo: `${UNAVATAR}/assemblrworld.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Audioclip',
    slug: 'audioclip',
    color: '#666666',
    logo: `${UNAVATAR}/audioclip.naver.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Audio.com',
    slug: 'audiocom',
    color: '#666666',
    logo: `${UNAVATAR}/audio.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Audiomeans',
    slug: 'audiomeans',
    color: '#666666',
    logo: `${UNAVATAR}/audiomeans.fr?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Backtracks',
    slug: 'backtracks',
    color: '#666666',
    logo: `${UNAVATAR}/backtracks.fm?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Biqnetwork',
    slug: 'biqnetwork',
    color: '#666666',
    logo: `${UNAVATAR}/biqnetwork.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Bookingmood',
    slug: 'bookingmood',
    color: '#666666',
    logo: `${UNAVATAR}/bookingmood.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Bornetube',
    slug: 'bornetube',
    color: '#666666',
    logo: `${UNAVATAR}/bornetube.dk?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Boxofficebuz',
    slug: 'boxofficebuz',
    color: '#666666',
    logo: `${UNAVATAR}/boxofficebuz.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Briovr',
    slug: 'briovr',
    color: '#666666',
    logo: `${UNAVATAR}/briovr.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Bumper',
    slug: 'bumper',
    color: '#666666',
    logo: `${UNAVATAR}/bumper.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Byzart',
    slug: 'byzart',
    color: '#666666',
    logo: `${UNAVATAR}/byzart.eu?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Celero',
    slug: 'celero',
    color: '#666666',
    logo: `${UNAVATAR}/celero.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Chartblocks',
    slug: 'chartblocks',
    color: '#666666',
    logo: `${UNAVATAR}/chartblocks.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Chroco',
    slug: 'chroco',
    color: '#666666',
    logo: `${UNAVATAR}/chroco.ooo?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Circle Zero Eight',
    slug: 'circlezeroeight',
    color: '#666666',
    logo: `${UNAVATAR}/cze.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Clipland',
    slug: 'clipland',
    color: '#666666',
    logo: `${UNAVATAR}/clipland.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Clueso',
    slug: 'clueso',
    color: '#666666',
    logo: `${UNAVATAR}/clueso.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Codepoints',
    slug: 'codepoints',
    color: '#666666',
    logo: `${UNAVATAR}/codepoints.net?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Commaful',
    slug: 'commaful',
    color: '#666666',
    logo: `${UNAVATAR}/commaful.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Cueup',
    slug: 'cueup',
    color: '#666666',
    logo: `${UNAVATAR}/cueup.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Curated',
    slug: 'curated',
    color: '#666666',
    logo: `${UNAVATAR}/curated.co?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Customerdb',
    slug: 'customerdb',
    color: '#666666',
    logo: `${UNAVATAR}/customerdb.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Dadan',
    slug: 'dadan',
    color: '#666666',
    logo: `${UNAVATAR}/dadan.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Dalexni',
    slug: 'dalexni',
    color: '#666666',
    logo: `${UNAVATAR}/dalexni.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Demofly',
    slug: 'demofly',
    color: '#666666',
    logo: `${UNAVATAR}/demofly.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Developer',
    slug: 'developer',
    color: '#666666',
    logo: `${UNAVATAR}/developer.li?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Digiteka',
    slug: 'digiteka',
    color: '#666666',
    logo: `${UNAVATAR}/digiteka.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Dotsub',
    slug: 'dotsub',
    color: '#666666',
    logo: `${UNAVATAR}/dotsub.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Dreambroker',
    slug: 'dreambroker',
    color: '#666666',
    logo: `${UNAVATAR}/dreambroker.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Embases',
    slug: 'embases',
    color: '#666666',
    logo: `${UNAVATAR}/embases.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Embedery',
    slug: 'embedery',
    color: '#666666',
    logo: `${UNAVATAR}/embedery.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Ethfiddle',
    slug: 'ethfiddle',
    color: '#666666',
    logo: `${UNAVATAR}/ethfiddle.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'EventLive',
    slug: 'eventlive',
    color: '#666666',
    logo: `${UNAVATAR}/eventlive.pro?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Everviz',
    slug: 'everviz',
    color: '#666666',
    logo: `${UNAVATAR}/everviz.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Everwall',
    slug: 'everwall',
    color: '#666666',
    logo: `${UNAVATAR}/everwall.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Exco',
    slug: 'exco',
    color: '#666666',
    logo: `${UNAVATAR}/exco.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Fader',
    slug: 'fader',
    color: '#666666',
    logo: `${UNAVATAR}/fader.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Faithlifetv',
    slug: 'faithlifetv',
    color: '#666666',
    logo: `${UNAVATAR}/faithlifetv.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Filestage',
    slug: 'filestage',
    color: '#666666',
    logo: `${UNAVATAR}/filestage.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Fireworktv',
    slug: 'fireworktv',
    color: '#666666',
    logo: `${UNAVATAR}/fireworktv.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Fite',
    slug: 'fite',
    color: '#666666',
    logo: `${UNAVATAR}/fite.tv?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'FlowHub',
    slug: 'flowhuborg',
    color: '#666666',
    logo: `${UNAVATAR}/flowhub.org?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Fooday',
    slug: 'fooday',
    color: '#666666',
    logo: `${UNAVATAR}/fooday.app?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Form.Data',
    slug: 'form-data',
    color: '#666666',
    logo: `${UNAVATAR}/form-data.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Geometry Viewer',
    slug: 'geometryviewer',
    color: '#666666',
    logo: `${UNAVATAR}/geometryviewer.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Getshow',
    slug: 'getshow',
    color: '#666666',
    logo: `${UNAVATAR}/getshow.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Gifnote',
    slug: 'gifnote',
    color: '#666666',
    logo: `${UNAVATAR}/gifnote.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Gloriatv',
    slug: 'gloriatv',
    color: '#666666',
    logo: `${UNAVATAR}/gloria.tv?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Gmetri',
    slug: 'gmetri',
    color: '#666666',
    logo: `${UNAVATAR}/gmetri.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Good for Job',
    slug: 'good-for-job',
    color: '#666666',
    logo: `${UNAVATAR}/good-for-job.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Grain',
    slug: 'grain',
    color: '#666666',
    logo: `${UNAVATAR}/grain.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Gtchannel',
    slug: 'gtchannel',
    color: '#666666',
    logo: `${UNAVATAR}/gtchannel.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Gw2fashions',
    slug: 'gw2fashions',
    color: '#666666',
    logo: `${UNAVATAR}/gw2fashions.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'HASH',
    slug: 'hash',
    color: '#666666',
    logo: `${UNAVATAR}/hash.ai?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Hihaho',
    slug: 'hihaho',
    color: '#666666',
    logo: `${UNAVATAR}/hihaho.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Hivo',
    slug: 'hivo',
    color: '#666666',
    logo: `${UNAVATAR}/hivo.co?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Hopvue',
    slug: 'hopvue',
    color: '#666666',
    logo: `${UNAVATAR}/hopvue.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Huffduffer',
    slug: 'huffduffer',
    color: '#666666',
    logo: `${UNAVATAR}/huffduffer.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Icosa Gallery',
    slug: 'icosa-gallery',
    color: '#666666',
    logo: `${UNAVATAR}/icosa.gallery?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Ideamapper',
    slug: 'ideamapper',
    color: '#666666',
    logo: `${UNAVATAR}/ideamapper.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Idomoo',
    slug: 'idomoo',
    color: '#666666',
    logo: `${UNAVATAR}/idomoo.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Ignite',
    slug: 'ignite',
    color: '#666666',
    logo: `${UNAVATAR}/ignite.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Imenupro',
    slug: 'imenupro',
    color: '#666666',
    logo: `${UNAVATAR}/imenupro.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Indaco',
    slug: 'indaco',
    color: '#666666',
    logo: `${UNAVATAR}/player.indacolive.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Infoveave',
    slug: 'infoveave',
    color: '#666666',
    logo: `${UNAVATAR}/infoveave.net?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Injurymap',
    slug: 'injurymap',
    color: '#666666',
    logo: `${UNAVATAR}/injurymap.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Insticator',
    slug: 'insticator',
    color: '#666666',
    logo: `${UNAVATAR}/insticator.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Juntos',
    slug: 'juntos',
    color: '#666666',
    logo: `${UNAVATAR}/juntos.live?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Kirimemail',
    slug: 'kirimemail',
    color: '#666666',
    logo: `${UNAVATAR}/kirimemail.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Knacki',
    slug: 'knacki',
    color: '#666666',
    logo: `${UNAVATAR}/knacki.info?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Knowledgepad',
    slug: 'knowledgepad',
    color: '#666666',
    logo: `${UNAVATAR}/knowledgepad.co?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Kubit',
    slug: 'kubit',
    color: '#666666',
    logo: `${UNAVATAR}/kubit.ai?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Kurozora',
    slug: 'kurozora',
    color: '#666666',
    logo: `${UNAVATAR}/kurozora.app?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Landofassets',
    slug: 'landofassets',
    color: '#666666',
    logo: `${UNAVATAR}/landofassets.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Laude',
    slug: 'laude',
    color: '#666666',
    logo: `${UNAVATAR}/laude.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Linkstackz',
    slug: 'linkstackz',
    color: '#666666',
    logo: `${UNAVATAR}/linkstackz.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Livid',
    slug: 'livid',
    color: '#666666',
    logo: `${UNAVATAR}/livid.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Lumiere',
    slug: 'lumiere',
    color: '#666666',
    logo: `${UNAVATAR}/lumiere.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Mediastream',
    slug: 'mediastream',
    color: '#666666',
    logo: `${UNAVATAR}/mediastream.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Medienarchiv ZHdK',
    slug: 'medienarchiv-zhdk',
    color: '#666666',
    logo: `${UNAVATAR}/medienarchiv.zhdk.ch?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Meme',
    slug: 'meme',
    color: '#666666',
    logo: `${UNAVATAR}/meme.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Minerva',
    slug: 'minerva',
    color: '#666666',
    logo: `${UNAVATAR}/minerva.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Music Box Maniacs',
    slug: 'musicboxmaniacs-com',
    color: '#666666',
    logo: `${UNAVATAR}/musicboxmaniacs.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Mysqlexplain',
    slug: 'mysqlexplain',
    color: '#666666',
    logo: `${UNAVATAR}/mysqlexplain.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Namchey',
    slug: 'namchey',
    color: '#666666',
    logo: `${UNAVATAR}/namchey.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Nanoo',
    slug: 'nanoo',
    color: '#666666',
    logo: `${UNAVATAR}/nanoo.tv?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Nasjonalbiblioteket',
    slug: 'nasjonalbiblioteket',
    color: '#666666',
    logo: `${UNAVATAR}/nb.no?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Natural Atlas',
    slug: 'naturalatlas',
    color: '#666666',
    logo: `${UNAVATAR}/naturalatlas.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'NDLA',
    slug: 'ndla',
    color: '#666666',
    logo: `${UNAVATAR}/ndla.no?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'neetoRecord',
    slug: 'neetorecord',
    color: '#666666',
    logo: `${UNAVATAR}/neetorecord.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Odds',
    slug: 'odds',
    color: '#666666',
    logo: `${UNAVATAR}/odds.com.au?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Official Fm',
    slug: 'official-fm',
    color: '#666666',
    logo: `${UNAVATAR}/official.fm?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Omniscope',
    slug: 'omniscope-me',
    color: '#666666',
    logo: `${UNAVATAR}/omniscope.me?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Orbitvu',
    slug: 'orbitvu',
    color: '#666666',
    logo: `${UNAVATAR}/orbitvu.co?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Origits',
    slug: 'origits',
    color: '#666666',
    logo: `${UNAVATAR}/origits.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Outplayed',
    slug: 'outplayed-tv',
    color: '#666666',
    logo: `${UNAVATAR}/outplayed.tv?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Overflow',
    slug: 'overflow-io',
    color: '#666666',
    logo: `${UNAVATAR}/overflow.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'OZ',
    slug: 'oz',
    color: '#666666',
    logo: `${UNAVATAR}/oz.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Pandavideo',
    slug: 'pandavideo',
    color: '#666666',
    logo: `${UNAVATAR}/pandavideo.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Parta',
    slug: 'parta',
    color: '#666666',
    logo: `${UNAVATAR}/parta.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Pastery',
    slug: 'pastery',
    color: '#666666',
    logo: `${UNAVATAR}/pastery.net?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Pingvp',
    slug: 'pingvp',
    color: '#666666',
    logo: `${UNAVATAR}/pingvp.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Pinpoll',
    slug: 'pinpoll',
    color: '#666666',
    logo: `${UNAVATAR}/pinpoll.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Pitchhub',
    slug: 'pitchhub',
    color: '#666666',
    logo: `${UNAVATAR}/pitchhub.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Pixdor',
    slug: 'pixdor',
    color: '#666666',
    logo: `${UNAVATAR}/pixdor.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Plusdocs',
    slug: 'plusdocs',
    color: '#666666',
    logo: `${UNAVATAR}/plusdocs.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Pod Lille',
    slug: 'podulille',
    color: '#666666',
    logo: `${UNAVATAR}/pod.univ-lille.fr?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Pod Paris 1',
    slug: 'poduparis1',
    color: '#666666',
    logo: `${UNAVATAR}/mediatheque.univ-paris1.fr?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Pod UPEC',
    slug: 'podupec',
    color: '#666666',
    logo: `${UNAVATAR}/pod.u-pec.fr?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Portfolium',
    slug: 'portfolium',
    color: '#666666',
    logo: `${UNAVATAR}/portfolium.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Programmingly',
    slug: 'programmingly-dev',
    color: '#666666',
    logo: `${UNAVATAR}/programmingly.dev?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'QTpi',
    slug: 'qtpi',
    color: '#666666',
    logo: `${UNAVATAR}/qtpi.gg?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Quartr',
    slug: 'quartr',
    color: '#666666',
    logo: `${UNAVATAR}/quartr.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Quiz.biz',
    slug: 'quiz-biz',
    color: '#666666',
    logo: `${UNAVATAR}/quiz.biz?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'RCVis',
    slug: 'rcvis',
    color: '#666666',
    logo: `${UNAVATAR}/rcvis.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Redlof Medien',
    slug: 'redlof-medien',
    color: '#666666',
    logo: `${UNAVATAR}/redlof.de?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Releasewire',
    slug: 'releasewire',
    color: '#666666',
    logo: `${UNAVATAR}/releasewire.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Saooti',
    slug: 'saooti',
    color: '#666666',
    logo: `${UNAVATAR}/saooti.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Screen9',
    slug: 'screen9',
    color: '#666666',
    logo: `${UNAVATAR}/screen9.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Screenr',
    slug: 'screenr',
    color: '#666666',
    logo: `${UNAVATAR}/screenr.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Sendtonews',
    slug: 'sendtonews',
    color: '#666666',
    logo: `${UNAVATAR}/sendtonews.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Shoudio',
    slug: 'shoudio',
    color: '#666666',
    logo: `${UNAVATAR}/shoudio.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Show the Way',
    slug: 'show-the-way',
    color: '#666666',
    logo: `${UNAVATAR}/showtheway.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Sizzle',
    slug: 'sizzle',
    color: '#666666',
    logo: `${UNAVATAR}/sizzle.gg?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Smashnotes',
    slug: 'smashnotes',
    color: '#666666',
    logo: `${UNAVATAR}/smashnotes.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Social Explorer',
    slug: 'socialexplorer',
    color: '#666666',
    logo: `${UNAVATAR}/socialexplorer.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Spyke',
    slug: 'spyke',
    color: '#666666',
    logo: `${UNAVATAR}/spyke.social?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Stanford Digital Repository',
    slug: 'stanford-digital-repository',
    color: '#666666',
    logo: `${UNAVATAR}/purl.stanford.edu?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Streamio',
    slug: 'streamio',
    color: '#666666',
    logo: `${UNAVATAR}/streamio.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Subscribi',
    slug: 'subscribi',
    color: '#666666',
    logo: `${UNAVATAR}/subscribi.io?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Sudomemo',
    slug: 'sudomemo',
    color: '#666666',
    logo: `${UNAVATAR}/sudomemo.net?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Supercut',
    slug: 'supercut',
    color: '#666666',
    logo: `${UNAVATAR}/supercut.video?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Techpostcast',
    slug: 'techpostcast',
    color: '#666666',
    logo: `${UNAVATAR}/techpostcast.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'They Said So',
    slug: 'they-said-so',
    color: '#666666',
    logo: `${UNAVATAR}/theysaidso.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'TickCounter',
    slug: 'tickcounter',
    color: '#666666',
    logo: `${UNAVATAR}/tickcounter.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Tonicaudio',
    slug: 'tonicaudio',
    color: '#666666',
    logo: `${UNAVATAR}/tonicaudio.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Toornament',
    slug: 'toornament',
    color: '#666666',
    logo: `${UNAVATAR}/toornament.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Trinity Audio',
    slug: 'trinityaudio',
    color: '#666666',
    logo: `${UNAVATAR}/trinityaudio.ai?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'TryCLI',
    slug: 'trycli',
    color: '#666666',
    logo: `${UNAVATAR}/trycli.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Tuxx',
    slug: 'tuxx-be',
    color: '#666666',
    logo: `${UNAVATAR}/tuxx.be?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'TVCF',
    slug: 'tvcf',
    color: '#666666',
    logo: `${UNAVATAR}/tvcf.co.kr?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Typlog',
    slug: 'typlog',
    color: '#666666',
    logo: `${UNAVATAR}/typlog.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Cambridge Map',
    slug: 'ucam-map',
    color: '#666666',
    logo: `${UNAVATAR}/map.cam.ac.uk?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Ustudio',
    slug: 'ustudio',
    color: '#666666',
    logo: `${UNAVATAR}/ustudio.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Videfit',
    slug: 'videfit',
    color: '#666666',
    logo: `${UNAVATAR}/videfit.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Vidmount',
    slug: 'vidmount',
    color: '#666666',
    logo: `${UNAVATAR}/vidmount.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Viostream',
    slug: 'viostream',
    color: '#666666',
    logo: `${UNAVATAR}/viostream.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Viously',
    slug: 'viously',
    color: '#666666',
    logo: `${UNAVATAR}/viously.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Vlipsy',
    slug: 'vlipsy',
    color: '#666666',
    logo: `${UNAVATAR}/vlipsy.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Voxsnap',
    slug: 'voxsnap',
    color: '#666666',
    logo: `${UNAVATAR}/voxsnap.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Webcrumbs',
    slug: 'webcrumbs',
    color: '#666666',
    logo: `${UNAVATAR}/webcrumbs.org?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Wecandeo',
    slug: 'wecandeo',
    color: '#666666',
    logo: `${UNAVATAR}/wecandeo.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Wizer',
    slug: 'wizer-me',
    color: '#666666',
    logo: `${UNAVATAR}/wizer.me?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Zingsoft',
    slug: 'zingsoft',
    color: '#666666',
    logo: `${UNAVATAR}/zingsoft.com?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Znipe',
    slug: 'znipe',
    color: '#666666',
    logo: `${UNAVATAR}/znipe.tv?token=${UNAVATAR_TOKEN}`
  },
  {
    name: 'Zoomable',
    slug: 'zoomable',
    color: '#666666',
    logo: `${UNAVATAR}/zoomable.ca?token=${UNAVATAR_TOKEN}`
  }
]

const PAGE_SIZE = 40

const ProviderIcon = ({ icon, color, logo, name }) => {
  if (icon) {
    return (
      <svg
        aria-hidden='true'
        viewBox='0 0 24 24'
        width='24'
        height='24'
        fill={`#${icon.hex}`}
        style={{ flexShrink: 0 }}
      >
        <path d={icon.path} />
      </svg>
    )
  }
  if (logo) {
    return (
      <img
        aria-hidden='true'
        src={logo}
        alt=''
        width='24'
        height='24'
        loading='lazy'
        style={{ flexShrink: 0, borderRadius: '50%', objectFit: 'cover' }}
      />
    )
  }
  const letter = (name || '?').charAt(0).toUpperCase()
  return (
    <span
      aria-hidden='true'
      style={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 700,
        color: '#fff',
        lineHeight: 1,
        background: color || '#999'
      }}
    >
      {letter}
    </span>
  )
}

const SearchWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
`

const SearchInput = styled.input`
  ${theme({
    fontFamily: 'sans',
    fontSize: [1, 1, 2, 2],
    color: 'black80',
    borderRadius: '12px',
    border: 1,
    borderColor: 'black10'
  })}
  width: 100%;
  height: 50px;
  padding: 0 16px 0 44px;
  background: ${colors.white};
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: border-color ${transition.medium}, box-shadow ${transition.medium};

  &:focus {
    border-color: ${colors.link};
    box-shadow: 0 0 0 3px ${colors.link}20;
  }

  &::placeholder {
    color: ${colors.black30};
  }

  @media (max-width: 599px) {
    font-size: 16px;
  }
`

const ProviderCardLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid ${colors.black10};
  background: #fff;
  text-decoration: none;
  color: ${colors.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  transition: border-color ${transition.medium}, box-shadow ${transition.medium},
    transform 150ms ease;

  &:hover {
    border-color: ${colors.black20};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`

const PageButton = styled.button`
  ${theme({
    fontFamily: 'sans',
    fontSize: 1,
    fontWeight: 'bold',
    borderRadius: '10px',
    cursor: 'pointer'
  })}
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ $active }) => ($active ? colors.link : colors.black10)};
  background: ${({ $active }) => ($active ? colors.link : 'white')};
  color: ${({ $active }) => ($active ? 'white' : colors.black80)};
  transition: background ${transition.short}, border-color ${transition.short};

  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? colors.link : colors.black05)};
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`

const ArrowButton = styled(PageButton)`
  width: 44px;
  height: 44px;
  border-radius: 50%;
`

const ArrowLeft = () => (
  <svg
    viewBox='0 0 24 24'
    width='20'
    height='20'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='15 18 9 12 15 6' />
  </svg>
)

const ArrowRight = () => (
  <svg
    viewBox='0 0 24 24'
    width='20'
    height='20'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='9 6 15 12 9 18' />
  </svg>
)

const Hero = () => (
  <Flex
    as='section'
    id='hero'
    css={theme({
      flexDirection: 'column',
      alignItems: 'center',
      pt: [1],
      pb: [1]
    })}
  >
    <Heading
      css={theme({
        px: [3, 3],
        maxWidth: layout.large,
        fontSize: [5, '45px', '50px', '60px']
      })}
    >
      Embed Code Providers
    </Heading>
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [2, 2, 3, 3],
        px: 3,
        maxWidth: layout.large,
        fontSize: [2, 2, '26px', '28px']
      })}
    >
      Generate embed code for 300+ supported sites. Pick a provider below or use
      the <Link href='/embed'>Microlink Embed API</Link> to embed any URL at
      scale.
    </Caption>
  </Flex>
)

const ProviderGrid = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    if (!search.trim()) return PROVIDERS
    const q = search.trim().toLowerCase()
    return PROVIDERS.filter(p => p.name.toLowerCase().includes(q))
  }, [search])

  const isSearching = search.trim().length > 0
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)

  return (
    <Container
      as='section'
      id='providers'
      css={theme({
        alignItems: 'center',
        maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
        pt: [3, 3, 4, 5],
        pb: [4, 4, 5, 5]
      })}
    >
      <SearchWrapper css={theme({ pb: [3, 3, 4, 4] })}>
        <svg
          viewBox='0 0 24 24'
          width='18'
          height='18'
          fill='none'
          stroke={colors.black30}
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          style={{ position: 'absolute', left: 16, zIndex: 1 }}
        >
          <circle cx='11' cy='11' r='8' />
          <line x1='21' y1='21' x2='16.65' y2='16.65' />
        </svg>
        <SearchInput
          type='search'
          placeholder='Search providers…'
          value={search}
          onChange={e => {
            setSearch(e.target.value)
            setPage(0)
          }}
        />
      </SearchWrapper>
      <Box
        css={theme({
          display: 'grid',
          gridTemplateColumns: [
            '1fr 1fr',
            '1fr 1fr 1fr',
            'repeat(5, 1fr)',
            'repeat(5, 1fr)'
          ],
          gap: '10px',
          width: '100%',
          mx: 'auto'
        })}
      >
        {(isSearching ? filtered : PROVIDERS).map(
          ({ name, slug, icon, color, logo }, i) => {
            const onCurrentPage =
              isSearching ||
              (i >= page * PAGE_SIZE && i < (page + 1) * PAGE_SIZE)
            return (
              <ProviderCardLink
                key={slug}
                href={`/tools/embed-url/${slug}`}
                style={onCurrentPage ? undefined : { display: 'none' }}
              >
                <ProviderIcon
                  icon={icon}
                  color={color}
                  logo={logo}
                  name={name}
                />
                {name}
              </ProviderCardLink>
            )
          }
        )}
      </Box>
      {totalPages > 1 && (
        <Flex
          css={theme({
            justifyContent: 'center',
            alignItems: 'center',
            gap: '6px',
            pt: [3, 3, 4, 4]
          })}
        >
          <ArrowButton
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
            aria-label='Previous page'
          >
            <ArrowLeft />
          </ArrowButton>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageButton
              key={i}
              $active={page === i}
              onClick={() => setPage(i)}
              aria-label={`Page ${i + 1}`}
            >
              {i + 1}
            </PageButton>
          ))}
          <ArrowButton
            disabled={page === totalPages - 1}
            onClick={() => setPage(p => p + 1)}
            aria-label='Next page'
          >
            <ArrowRight />
          </ArrowButton>
        </Flex>
      )}
      {search.trim() && filtered.length === 0 && (
        <Flex css={theme({ justifyContent: 'center', pt: 4 })}>
          <Text css={theme({ fontSize: 1, color: 'black50' })}>
            No providers match "{search}". Try the{' '}
            <Link href='/tools/embed-url'>universal embed tool</Link> — it works
            for any URL.
          </Text>
        </Flex>
      )}
    </Container>
  )
}

const CatchAll = () => (
  <Container
    as='section'
    css={theme({
      alignItems: 'center',
      textAlign: 'center',
      pt: [5, 5, 6, 6],
      pb: [4, 4, 5, 5]
    })}
  >
    <Subhead css={theme({ fontSize: [3, '30px', '35px', '45px'] })}>
      Need another provider?
    </Subhead>
    <Caption
      css={theme({
        pt: [2, 2, 3, 3],
        maxWidth: layout.normal,
        fontSize: [2, 2, 3, 3]
      })}
    >
      The <Link href='/tools/embed-url'>universal embed tool</Link> works for
      any URL — 300+ oEmbed providers and a fallback card for everything else.
    </Caption>
    <Box
      css={theme({
        pt: [3, 3, 4, 4],
        width: '100%',
        maxWidth: layout.small,
        mx: 'auto'
      })}
    >
      {(() => {
        const embedTool = TOOLS.flatMap(c => c.tools).find(
          t => t.href === '/tools/embed-url'
        )
        return embedTool ? <FeaturedToolCard {...embedTool} /> : null
      })()}
    </Box>
  </Container>
)

const ProductInformation = () => (
  <Faq
    title='FAQ'
    css={theme({
      fontSize: [1, 1, 1, 1],
      pt: [5, 5, 6, 6],
      pb: 4
    })}
    questions={[
      {
        question: 'How many embed providers are supported?',
        answer: (
          <>
            <div>
              Over 300 verified oEmbed providers are supported, including
              YouTube, Instagram, Twitter / X, TikTok, Figma, Spotify, and many
              more. The list grows automatically — no SDK upgrade needed.
            </div>
          </>
        )
      },
      {
        question: 'What if my provider is not listed?',
        answer: (
          <>
            <div>
              Use the{' '}
              <Link href='/tools/embed-url'>
                universal embed code generator
              </Link>
              . It works for any URL — if the site supports oEmbed, you get the
              native player. Otherwise, you get a styled preview card.
            </div>
          </>
        )
      },
      {
        question:
          'Are the provider-specific tools different from the main tool?',
        answer: (
          <>
            <div>
              They use the same embed engine. The provider pages offer tailored
              guidance, pre-filled example URLs, and provider-specific FAQs to
              help you get started faster.
            </div>
          </>
        )
      },
      {
        question: 'Is the embed tool free?',
        answer: (
          <>
            <div>
              Yes — 50 requests per day, no login, no credit card. For
              production volume, see <Link href='/pricing'>Pro plans</Link>.
            </div>
          </>
        )
      }
    ]}
  />
)

export const Head = () => (
  <Meta
    title='Embed Code Providers — 300+ Supported Sites'
    noSuffix
    description='Browse 300+ supported embed providers. Generate embed code for YouTube, Instagram, Twitter, TikTok, Figma, and more — free, no signup.'
    image='https://cdn.microlink.io/banner/sdk.jpeg'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/embed/providers',
        name: 'Embed Code Providers',
        description:
          'Browse 300+ supported embed providers. Generate embed code for YouTube, Instagram, Twitter, TikTok, Figma, and more.',
        url: 'https://microlink.io/embed/providers',
        applicationCategory: ['DeveloperApplication', 'UtilitiesApplication'],
        keywords: [
          'embed code providers',
          'embed supported sites',
          'oembed providers list',
          'embed url providers',
          'supported embed websites',
          'embed code supported sites'
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free tier with 50 requests per day'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How many embed providers are supported?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Over 300 verified oEmbed providers are supported, including YouTube, Instagram, Twitter / X, TikTok, Figma, Spotify, and many more.'
            }
          },
          {
            '@type': 'Question',
            name: 'What if my provider is not listed?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Use the universal embed code generator. It works for any URL — if the site supports oEmbed, you get the native player. Otherwise, you get a styled preview card.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is the embed tool free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — 50 requests per day, no login, no credit card. For production volume, see Pro plans.'
            }
          }
        ]
      }
    ]}
  />
)

const ProvidersPage = () => (
  <Layout>
    <Hero />
    <ProviderGrid />
    <CatchAll />
    <ProductInformation />
  </Layout>
)

export default ProvidersPage
