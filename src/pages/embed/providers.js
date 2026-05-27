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
  siRunkit,
  siRumble,
  siSketchfab,
  siSlideshare,
  siSmugmug,
  siSpeakerdeck,
  siSpreaker,
  siTed,
  siTumblr,
  siWistia,
  siWordpress
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

import { FeaturedToolCard } from 'components/patterns/Tools/ToolCards'
import { TOOLS } from 'components/patterns/Tools/toolCatalog'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const PROVIDERS = [
  { name: 'YouTube', slug: 'youtube', icon: siYoutube },
  { name: 'Instagram', slug: 'instagram', icon: siInstagram },
  { name: 'Twitter / X', slug: 'twitter-or-x', icon: siX },
  { name: 'TikTok', slug: 'tiktok', icon: siTiktok },
  { name: 'Figma', slug: 'figma', icon: siFigma },
  { name: 'Datawrapper', slug: 'datawrapper', color: '#1D81A2' },
  { name: 'Facebook', slug: 'facebook', icon: siFacebook },
  { name: 'Loom', slug: 'loom', icon: siLoom },
  { name: 'Vimeo', slug: 'vimeo', icon: siVimeo },
  { name: 'Canva', slug: 'canva', color: '#00C4CC' },
  { name: 'Naver TV', slug: 'naver-tv', icon: siNaver },
  { name: 'Pinterest', slug: 'pinterest', icon: siPinterest },
  { name: 'Spotify', slug: 'spotify', icon: siSpotify },
  { name: 'Reddit', slug: 'reddit', icon: siReddit },
  { name: 'GIPHY', slug: 'giphy', icon: siGiphy },
  { name: 'SoundCloud', slug: 'soundcloud', icon: siSoundcloud },
  { name: 'Behance', slug: 'behance', icon: siBehance },
  { name: 'Kickstarter', slug: 'kickstarter', icon: siKickstarter },
  { name: 'Miro', slug: 'miro', icon: siMiro },
  { name: 'Microsoft', slug: 'microsoft', color: '#5E5E5E' },
  { name: 'Flickr', slug: 'flickr', icon: siFlickr },
  { name: 'Gyazo', slug: 'gyazo', color: '#6AC2E7' },
  { name: 'Flourish', slug: 'flourish', color: '#3654FF' },
  { name: 'New York Times', slug: 'new-york-times', icon: siNewyorktimes },
  { name: 'Apple Music', slug: 'apple-music', icon: siApplemusic },
  { name: 'Microsoft Sway', slug: 'microsoft-sway', icon: siSway },
  { name: 'amCharts', slug: 'amcharts-live-editor', color: '#3CABFF' },
  { name: 'Animoto', slug: 'animoto', color: '#3781F6' },
  { name: 'Audiomack', slug: 'audiomack', icon: siAudiomack },
  { name: 'Audius', slug: 'audius', color: '#CC0FE0' },
  { name: 'Balsamiq', slug: 'balsamiq', color: '#CC0000' },
  { name: 'BitChute', slug: 'bitchute', color: '#EF4137' },
  { name: 'Blackfire', slug: 'blackfire-io', color: '#25282B' },
  { name: 'Bluesky', slug: 'bluesky', icon: siBluesky },
  { name: 'Brightcove', slug: 'brightcove', color: '#006DCC' },
  { name: 'Buttondown', slug: 'buttondown', color: '#0069FF' },
  { name: 'Cacoo', slug: 'cacoo', color: '#57C2A7' },
  { name: 'CircuitLab', slug: 'circuitlab', color: '#2B70D4' },
  { name: 'CodePen', slug: 'codepen', color: '#000000' },
  { name: 'CodeSandbox', slug: 'codesandbox', icon: siCodesandbox },
  { name: 'Coub', slug: 'coub', color: '#2BA9E1' },
  { name: 'Dailymotion', slug: 'dailymotion', icon: siDailymotion },
  { name: 'DeviantArt', slug: 'deviantart-com', icon: siDeviantart },
  { name: 'ElevenLabs', slug: 'elevenlabs', icon: siElevenlabs },
  { name: 'Flat.io', slug: 'flat', icon: siFlat },
  { name: 'Framer', slug: 'framer', icon: siFramer },
  { name: 'Getty Images', slug: 'getty-images', color: '#000000' },
  { name: 'Hulu', slug: 'hulu', color: '#1CE783' },
  { name: 'iFixit', slug: 'ifixit', icon: siIfixit },
  { name: 'iHeartRadio', slug: 'iheartradio', icon: siIheartradio },
  { name: 'Infogram', slug: 'infogram', color: '#00C9A2' },
  { name: 'Issuu', slug: 'issuu', icon: siIssuu },
  { name: 'LottieFiles', slug: 'lottiefiles', icon: siLottiefiles },
  { name: 'Ludus', slug: 'ludus', color: '#2A2A2A' },
  { name: 'Matterport', slug: 'matterport', color: '#000000' },
  { name: 'Mixcloud', slug: 'mixcloud', icon: siMixcloud },
  { name: 'Observable', slug: 'observable', icon: siObservable },
  { name: 'Odysee', slug: 'odysee', icon: siOdysee },
  { name: 'Padlet', slug: 'padlet', icon: siPadlet },
  { name: 'Podbean', slug: 'podbean', color: '#6CBB47' },
  { name: 'Prezi', slug: 'prezi', icon: siPrezi },
  { name: 'RadioPublic', slug: 'radiopublic', color: '#CE262F' },
  { name: 'Raindrop.io', slug: 'raindrop', color: '#3290EC' },
  { name: 'Replit', slug: 'replit', icon: siReplit },
  { name: 'ReverbNation', slug: 'reverbnation', icon: siReverbnation },
  { name: 'Rumble', slug: 'rumble', icon: siRumble },
  { name: 'RunKit', slug: 'runkit', icon: siRunkit },
  { name: 'Scribd', slug: 'scribd', color: '#1A7BBA' },
  { name: 'Simplecast', slug: 'simplecast', color: '#F5B724' },
  { name: 'Sketchfab', slug: 'sketchfab', icon: siSketchfab },
  { name: 'SlideShare', slug: 'slideshare', icon: siSlideshare },
  { name: 'SmugMug', slug: 'smugmug', icon: siSmugmug },
  { name: 'Speaker Deck', slug: 'speakerdeck', icon: siSpeakerdeck },
  { name: 'Spreaker', slug: 'spreaker', icon: siSpreaker },
  { name: 'Streamable', slug: 'streamable', color: '#0B79E3' },
  { name: 'TED', slug: 'ted', icon: siTed },
  { name: 'Tumblr', slug: 'tumblr', icon: siTumblr },
  { name: 'Vevo', slug: 'vevo', color: '#ED1439' },
  { name: 'Vidyard', slug: 'vidyard', color: '#25BB66' },
  { name: 'Vouch', slug: 'vouch', color: '#3BD2C1' },
  { name: 'Wave.video', slug: 'wavevideo', color: '#2D60FF' },
  { name: 'Whimsical', slug: 'whimsical', color: '#7B57DF' },
  { name: 'Wistia', slug: 'wistia', icon: siWistia },
  { name: 'Wokwi', slug: 'wokwi', color: '#3751C7' },
  { name: 'WordPress', slug: 'wordpress-com', icon: siWordpress },
  { name: 'Yumpu', slug: 'yumpu', color: '#D72E26' },
  { name: 'Zeplin', slug: 'zeplin', color: '#FDBD39' },
  { name: '23hq', slug: '23hq', color: '#666666' },
  { name: '3Q', slug: '3q', color: '#666666' },
  { name: 'Abraia', slug: 'abraia', color: '#666666' },
  { name: 'Acast', slug: 'acast', color: '#666666' },
  { name: 'Actblue', slug: 'actblue', color: '#666666' },
  { name: 'Adilo', slug: 'adilo', color: '#666666' },
  { name: 'AfreecaTV', slug: 'afreecatv', color: '#666666' },
  { name: 'Altium', slug: 'altium', color: '#666666' },
  { name: 'Altrulabs', slug: 'altrulabs', color: '#666666' },
  { name: 'Amtraker', slug: 'amtraker', color: '#666666' },
  { name: 'Animatron', slug: 'animatron', color: '#666666' },
  { name: 'Anniemusic', slug: 'anniemusic', color: '#666666' },
  { name: 'Appforcestudio', slug: 'appforcestudio', color: '#666666' },
  { name: 'Archivos', slug: 'archivos', color: '#666666' },
  { name: 'Assemblrworld', slug: 'assemblrworld', color: '#666666' },
  { name: 'Audioboom', slug: 'audioboom', color: '#666666' },
  { name: 'Audioclip', slug: 'audioclip', color: '#666666' },
  { name: 'Audio.com', slug: 'audiocom', color: '#666666' },
  { name: 'Audiomeans', slug: 'audiomeans', color: '#666666' },
  { name: 'Backtracks', slug: 'backtracks', color: '#666666' },
  { name: 'Beams', slug: 'beams', color: '#666666' },
  { name: 'Beautiful', slug: 'beautiful', color: '#666666' },
  { name: 'Biqnetwork', slug: 'biqnetwork', color: '#666666' },
  { name: 'Blogcast', slug: 'blogcast', color: '#666666' },
  { name: 'Bookingmood', slug: 'bookingmood', color: '#666666' },
  { name: 'Bornetube', slug: 'bornetube', color: '#666666' },
  { name: 'Boxofficebuz', slug: 'boxofficebuz', color: '#666666' },
  { name: 'Briovr', slug: 'briovr', color: '#666666' },
  { name: 'Bumper', slug: 'bumper', color: '#666666' },
  { name: 'Bunny.net', slug: 'bunnynet', color: '#666666' },
  { name: 'Byzart', slug: 'byzart', color: '#666666' },
  { name: 'Carbon', slug: 'carbon', color: '#666666' },
  { name: 'Castmake', slug: 'castmake', color: '#666666' },
  { name: 'Catboat', slug: 'catboat', color: '#666666' },
  { name: 'Celero', slug: 'celero', color: '#666666' },
  { name: 'Ceros', slug: 'ceros', color: '#666666' },
  { name: 'Chainflix', slug: 'chainflix', color: '#666666' },
  { name: 'Chartblocks', slug: 'chartblocks', color: '#666666' },
  { name: 'Chirbit', slug: 'chirbit-com', color: '#666666' },
  { name: 'Chroco', slug: 'chroco', color: '#666666' },
  { name: 'Clipland', slug: 'clipland', color: '#666666' },
  { name: 'Clueso', slug: 'clueso', color: '#666666' },
  { name: 'Clyp', slug: 'clyp', color: '#666666' },
  { name: 'Coco Corp', slug: 'coco-corp', color: '#666666' },
  { name: 'Codehs', slug: 'codehs', color: '#666666' },
  { name: 'Codepoints', slug: 'codepoints', color: '#666666' },
  { name: 'Collegehumor', slug: 'collegehumor', color: '#666666' },
  { name: 'Commaful', slug: 'commaful', color: '#666666' },
  { name: 'Create', slug: 'create', color: '#666666' },
  { name: 'Crowd Ranking', slug: 'crowd-ranking', color: '#666666' },
  { name: 'Crumbs', slug: 'crumbs', color: '#666666' },
  { name: 'Cueup', slug: 'cueup', color: '#666666' },
  { name: 'Curated', slug: 'curated', color: '#666666' },
  { name: 'Customerdb', slug: 'customerdb', color: '#666666' },
  { name: 'Dadan', slug: 'dadan', color: '#666666' },
  { name: 'Dalexni', slug: 'dalexni', color: '#666666' },
  { name: 'Demofly', slug: 'demofly', color: '#666666' },
  { name: 'Deseretnews', slug: 'deseretnews', color: '#666666' },
  { name: 'Developer', slug: 'developer', color: '#666666' },
  { name: 'Digiteka', slug: 'digiteka', color: '#666666' },
  { name: 'DocDroid', slug: 'docdroid', color: '#666666' },
  { name: 'Docswell', slug: 'docswell', color: '#666666' },
  { name: 'DocumentCloud', slug: 'documentcloud', color: '#666666' },
  { name: 'Dotsub', slug: 'dotsub', color: '#666666' },
  { name: 'Dreambroker', slug: 'dreambroker', color: '#666666' },
  { name: 'Dtube', slug: 'dtube', color: '#666666' },
  { name: 'Echoeshq', slug: 'echoeshq', color: '#666666' },
  { name: 'EduMedia', slug: 'edumedia-sciences-com', color: '#666666' },
  { name: 'Egliseinfo', slug: 'egliseinfo', color: '#666666' },
  { name: 'Embases', slug: 'embases', color: '#666666' },
  { name: 'Embedery', slug: 'embedery', color: '#666666' },
  { name: 'Ethfiddle', slug: 'ethfiddle', color: '#666666' },
  { name: 'EventLive', slug: 'eventlive', color: '#666666' },
  { name: 'Everviz', slug: 'everviz', color: '#666666' },
  { name: 'Everwall', slug: 'everwall', color: '#666666' },
  { name: 'Exco', slug: 'exco', color: '#666666' },
  { name: 'Eyrieio', slug: 'eyrieio', color: '#666666' },
  { name: 'Fader', slug: 'fader', color: '#666666' },
  { name: 'Faithlifetv', slug: 'faithlifetv', color: '#666666' },
  { name: 'Filestage', slug: 'filestage', color: '#666666' },
  { name: 'Fireworktv', slug: 'fireworktv', color: '#666666' },
  { name: 'Fite', slug: 'fite', color: '#666666' },
  { name: 'Fooday', slug: 'fooday', color: '#666666' },
  { name: 'Form.Data', slug: 'form-data', color: '#666666' },
  { name: 'Framatube', slug: 'framatube', color: '#666666' },
  { name: 'Framebuzz', slug: 'framebuzz', color: '#666666' },
  { name: 'Geograph', slug: 'geograph', color: '#666666' },
  { name: 'Getshow', slug: 'getshow', color: '#666666' },
  { name: 'Gifnote', slug: 'gifnote', color: '#666666' },
  { name: 'Gloriatv', slug: 'gloriatv', color: '#666666' },
  { name: 'Gmetri', slug: 'gmetri', color: '#666666' },
  { name: 'Gong', slug: 'gong', color: '#666666' },
  { name: 'Good for Job', slug: 'good-for-job', color: '#666666' },
  { name: 'Grain', slug: 'grain', color: '#666666' },
  { name: 'Gtchannel', slug: 'gtchannel', color: '#666666' },
  { name: 'Gumlet', slug: 'gumlet', color: '#666666' },
  { name: 'Gw2fashions', slug: 'gw2fashions', color: '#666666' },
  { name: 'hearthis.at', slug: 'hearthis', color: '#666666' },
  { name: 'Helen English', slug: 'helenenglish-education', color: '#666666' },
  { name: 'Heyzine', slug: 'heyzine', color: '#666666' },
  { name: 'Hihaho', slug: 'hihaho', color: '#666666' },
  { name: 'Hippo Video', slug: 'hippovideo', color: '#666666' },
  { name: 'Hivo', slug: 'hivo', color: '#666666' },
  { name: 'Homey', slug: 'homey', color: '#666666' },
  { name: 'HubSpot Bynder', slug: 'hubspot-bynder', color: '#666666' },
  { name: 'Huffduffer', slug: 'huffduffer', color: '#666666' },
  { name: 'Icosa Gallery', slug: 'icosa-gallery', color: '#666666' },
  { name: 'Ideamapper', slug: 'ideamapper', color: '#666666' },
  { name: 'Idomoo', slug: 'idomoo', color: '#666666' },
  { name: 'IFTTT', slug: 'ifttt', color: '#666666' },
  { name: 'Ignite', slug: 'ignite', color: '#666666' },
  { name: 'Imenupro', slug: 'imenupro', color: '#666666' },
  { name: 'Incredible', slug: 'incredible', color: '#666666' },
  { name: 'Indaco', slug: 'indaco', color: '#666666' },
  { name: 'Inoreader', slug: 'inoreader', color: '#666666' },
  { name: 'Inphood', slug: 'inphood', color: '#666666' },
  { name: 'Insighttimer', slug: 'insighttimer', color: '#666666' },
  { name: 'Insticator', slug: 'insticator', color: '#666666' },
  { name: 'Jovian', slug: 'jovian', color: '#666666' },
  { name: 'Juntos', slug: 'juntos', color: '#666666' },
  { name: 'KakaoTV', slug: 'kakaotv', color: '#666666' },
  { name: 'Kidoju', slug: 'kidoju', color: '#666666' },
  { name: 'Kirimemail', slug: 'kirimemail', color: '#666666' },
  { name: 'Kit', slug: 'kit', color: '#666666' },
  { name: 'Kitchenbowl', slug: 'kitchenbowl', color: '#666666' },
  { name: 'Kmdr', slug: 'kmdr', color: '#666666' },
  { name: 'Knacki', slug: 'knacki', color: '#666666' },
  { name: 'Knowledgepad', slug: 'knowledgepad', color: '#666666' },
  { name: 'Kooapp', slug: 'kooapp', color: '#666666' },
  { name: 'Kubit', slug: 'kubit', color: '#666666' },
  { name: 'Kurozora', slug: 'kurozora', color: '#666666' },
  { name: 'Landofassets', slug: 'landofassets', color: '#666666' },
  { name: 'LearningApps', slug: 'learningapps-org', color: '#666666' },
  { name: 'Lineplace', slug: 'lineplace', color: '#666666' },
  { name: 'Linkstackz', slug: 'linkstackz', color: '#666666' },
  { name: 'Livid', slug: 'livid', color: '#666666' },
  { name: 'Lumiere', slug: 'lumiere', color: '#666666' },
  { name: 'Marimo', slug: 'marimo', color: '#666666' },
  { name: 'Mathembed', slug: 'mathembed', color: '#666666' },
  { name: 'Mediastream', slug: 'mediastream', color: '#666666' },
  { name: 'Medienarchiv ZHdK', slug: 'medienarchiv-zhdk', color: '#666666' },
  { name: 'Meme', slug: 'meme', color: '#666666' },
  { name: 'Mermaid Ink', slug: 'mermaid-ink', color: '#666666' },
  { name: 'Minerva', slug: 'minerva', color: '#666666' },
  { name: 'Minesweeper', slug: 'minesweeper-today', color: '#666666' },
  { name: 'Circle Zero Eight', slug: 'circlezeroeight', color: '#666666' },
  { name: 'FlowHub', slug: 'flowhuborg', color: '#666666' },
  { name: 'Geometry Viewer', slug: 'geometryviewer', color: '#666666' },
  { name: 'HASH', slug: 'hash', color: '#666666' },
  { name: 'Hopvue', slug: 'hopvue', color: '#666666' },
  { name: 'Infoveave', slug: 'infoveave', color: '#666666' },
  { name: 'Injurymap', slug: 'injurymap', color: '#666666' },
  { name: 'Laude', slug: 'laude', color: '#666666' },
  { name: 'QTpi', slug: 'qtpi', color: '#666666' },
  { name: 'Waltrack', slug: 'waltrack', color: '#666666' },
  { name: 'Mixpanel', slug: 'mixpanel', color: '#666666' },
  { name: 'Moby Picture', slug: 'moby-picture', color: '#666666' },
  { name: 'Music Box Maniacs', slug: 'musicboxmaniacs-com', color: '#666666' },
  { name: 'Mybeweeg', slug: 'mybeweeg', color: '#666666' },
  { name: 'Mysqlexplain', slug: 'mysqlexplain', color: '#666666' },
  { name: 'Namchey', slug: 'namchey', color: '#666666' },
  { name: 'Nanoo', slug: 'nanoo', color: '#666666' },
  {
    name: 'Nasjonalbiblioteket',
    slug: 'nasjonalbiblioteket',
    color: '#666666'
  },
  { name: 'Natural Atlas', slug: 'naturalatlas', color: '#666666' },
  { name: 'NDLA', slug: 'ndla', color: '#666666' },
  { name: 'Nebula', slug: 'nebula', color: '#666666' },
  { name: 'Needlecloud', slug: 'needlecloud', color: '#666666' },
  { name: 'neetoRecord', slug: 'neetorecord', color: '#666666' },
  { name: 'NFB', slug: 'nfb-ca', color: '#666666' },
  { name: 'Nopaste', slug: 'nopaste', color: '#666666' },
  { name: 'Odds', slug: 'odds', color: '#666666' },
  { name: 'Official Fm', slug: 'official-fm', color: '#666666' },
  { name: 'Omniscope', slug: 'omniscope-me', color: '#666666' },
  { name: 'Omnystudio', slug: 'omnystudio', color: '#666666' },
  { name: 'Orbitvu', slug: 'orbitvu', color: '#666666' },
  { name: 'Origits', slug: 'origits', color: '#666666' },
  { name: 'Outplayed', slug: 'outplayed-tv', color: '#666666' },
  { name: 'Overflow', slug: 'overflow-io', color: '#666666' },
  { name: 'OZ', slug: 'oz', color: '#666666' },
  { name: 'Pandavideo', slug: 'pandavideo', color: '#666666' },
  { name: 'Parta', slug: 'parta', color: '#666666' },
  { name: 'Pastery', slug: 'pastery', color: '#666666' },
  { name: 'PeerTube', slug: 'peertube-tv', color: '#666666' },
  { name: 'Picturelfy', slug: 'picturelfy', color: '#666666' },
  { name: 'Piggy', slug: 'piggy', color: '#666666' },
  { name: 'Pikasso', slug: 'pikasso', color: '#666666' },
  { name: 'Pingvp', slug: 'pingvp', color: '#666666' },
  { name: 'Pinpoll', slug: 'pinpoll', color: '#666666' },
  { name: 'Pitchhub', slug: 'pitchhub', color: '#666666' },
  { name: 'Pixdor', slug: 'pixdor', color: '#666666' },
  { name: 'Plinth', slug: 'plinth', color: '#666666' },
  { name: 'Plusdocs', slug: 'plusdocs', color: '#666666' },
  { name: 'Pod Antilles', slug: 'poduantilles', color: '#666666' },
  { name: 'Pod Le Mans', slug: 'podulemans', color: '#666666' },
  { name: 'Pod Lille', slug: 'podulille', color: '#666666' },
  { name: 'Pod UPEC', slug: 'podupec', color: '#666666' },
  { name: 'Pod Paris 1', slug: 'poduparis1', color: '#666666' },
  { name: 'Polldaddy', slug: 'poll-daddy', color: '#666666' },
  { name: 'Portfolium', slug: 'portfolium', color: '#666666' },
  { name: 'Present', slug: 'present', color: '#666666' },
  { name: 'Programmingly', slug: 'programmingly-dev', color: '#666666' },
  { name: 'Quartr', slug: 'quartr', color: '#666666' },
  { name: 'Quellensuche', slug: 'quellensuche', color: '#666666' },
  { name: 'Quiz.biz', slug: 'quiz-biz', color: '#666666' },
  { name: 'RCVis', slug: 'rcvis', color: '#666666' },
  { name: 'Redlof Medien', slug: 'redlof-medien', color: '#666666' },
  { name: 'Releasewire', slug: 'releasewire', color: '#666666' },
  { name: 'Roomshare', slug: 'roomshare', color: '#666666' },
  { name: 'Rooster Teeth', slug: 'roosterteeth', color: '#666666' },
  { name: 'Saooti', slug: 'saooti', color: '#666666' },
  { name: 'SAPO Videos', slug: 'sapo-videos', color: '#666666' },
  { name: 'Satcat', slug: 'satcat', color: '#666666' },
  { name: 'Sato', slug: 'sato', color: '#666666' },
  { name: 'Sbedit', slug: 'sbedit', color: '#666666' },
  { name: 'Scenes', slug: 'scenes', color: '#666666' },
  { name: 'Screen9', slug: 'screen9', color: '#666666' },
  { name: 'Screencast', slug: 'screencast-com', color: '#666666' },
  { name: 'Screenr', slug: 'screenr', color: '#666666' },
  { name: 'Scribblemaps', slug: 'scribblemaps', color: '#666666' },
  { name: 'Sendtonews', slug: 'sendtonews', color: '#666666' },
  { name: 'Shared File', slug: 'shared-file-kappa', color: '#666666' },
  { name: 'Shopshare', slug: 'shopshare', color: '#666666' },
  { name: 'Shortnote', slug: 'shortnote', color: '#666666' },
  { name: 'Shoudio', slug: 'shoudio', color: '#666666' },
  { name: 'Show the Way', slug: 'show-the-way', color: '#666666' },
  { name: 'Sizzle', slug: 'sizzle', color: '#666666' },
  { name: 'Sketch', slug: 'sketch', color: '#666666' },
  { name: 'Skoletube', slug: 'skoletube', color: '#666666' },
  { name: 'Smashnotes', slug: 'smashnotes', color: '#666666' },
  { name: 'Smeme', slug: 'smeme', color: '#666666' },
  { name: 'Smrthi', slug: 'smrthi', color: '#666666' },
  { name: 'Social Explorer', slug: 'socialexplorer', color: '#666666' },
  { name: 'Songlink', slug: 'songlink', color: '#666666' },
  { name: 'SoopLive', slug: 'sooplive', color: '#666666' },
  { name: 'Spotlightr', slug: 'spotlightr', color: '#666666' },
  { name: 'SproutVideo', slug: 'sproutvideo', color: '#666666' },
  { name: 'Spyke', slug: 'spyke', color: '#666666' },
  {
    name: 'Stanford Digital Repository',
    slug: 'stanford-digital-repository',
    color: '#666666'
  },
  { name: 'StoryMaps', slug: 'storymaps', color: '#666666' },
  { name: 'Streamio', slug: 'streamio', color: '#666666' },
  { name: 'Subscribi', slug: 'subscribi', color: '#666666' },
  { name: 'Sudomemo', slug: 'sudomemo', color: '#666666' },
  { name: 'Supercut', slug: 'supercut', color: '#666666' },
  { name: 'Sutori', slug: 'sutori', color: '#666666' },
  { name: 'Synthesia', slug: 'synthesia', color: '#666666' },
  { name: 'Techpostcast', slug: 'techpostcast', color: '#666666' },
  { name: 'Tella', slug: 'tella', color: '#666666' },
  { name: 'They Said So', slug: 'they-said-so', color: '#666666' },
  { name: 'TickCounter', slug: 'tickcounter', color: '#666666' },
  { name: 'TKSN', slug: 'tksn', color: '#666666' },
  { name: 'Tonicaudio', slug: 'tonicaudio', color: '#666666' },
  { name: 'Toornament', slug: 'toornament', color: '#666666' },
  { name: 'Topy', slug: 'topy', color: '#666666' },
  { name: 'Totango', slug: 'totango', color: '#666666' },
  { name: 'Trackspace', slug: 'trackspace', color: '#666666' },
  { name: 'Trinity Audio', slug: 'trinityaudio', color: '#666666' },
  { name: 'TryCLI', slug: 'trycli', color: '#666666' },
  { name: 'Tuxx', slug: 'tuxx-be', color: '#666666' },
  { name: 'TVCF', slug: 'tvcf', color: '#666666' },
  { name: 'Twinmotion', slug: 'twinmotion', color: '#666666' },
  { name: 'Typecast', slug: 'typecast', color: '#666666' },
  { name: 'Typlog', slug: 'typlog', color: '#666666' },
  { name: 'Cambridge Map', slug: 'ucam-map', color: '#666666' },
  { name: 'Ustream', slug: 'ustream', color: '#666666' },
  { name: 'Ustudio', slug: 'ustudio', color: '#666666' },
  { name: 'Veer', slug: 'veer', color: '#666666' },
  { name: 'Videfit', slug: 'videfit', color: '#666666' },
  { name: 'Vidmount', slug: 'vidmount', color: '#666666' },
  { name: 'Viostream', slug: 'viostream', color: '#666666' },
  { name: 'Viously', slug: 'viously', color: '#666666' },
  { name: 'Vizdom', slug: 'vizdom', color: '#666666' },
  { name: 'Vizydrop', slug: 'vizydrop', color: '#666666' },
  { name: 'Vlipsy', slug: 'vlipsy', color: '#666666' },
  { name: 'Vlive', slug: 'vlive', color: '#666666' },
  { name: 'Voxsnap', slug: 'voxsnap', color: '#666666' },
  { name: 'Web3 Is Going Great', slug: 'web3isgoinggreat', color: '#666666' },
  { name: 'Webcrumbs', slug: 'webcrumbs', color: '#666666' },
  { name: 'Wecandeo', slug: 'wecandeo', color: '#666666' },
  { name: 'Wizer', slug: 'wizer-me', color: '#666666' },
  { name: 'Wolfram Cloud', slug: 'wolframcloud', color: '#666666' },
  { name: 'Zingsoft', slug: 'zingsoft', color: '#666666' },
  { name: 'Znipe', slug: 'znipe', color: '#666666' },
  { name: 'Zoomable', slug: 'zoomable', color: '#666666' }
]

const PAGE_SIZE = 40

const ProviderIcon = ({ icon, color, name }) => {
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
      Generate embed code for 380+ supported sites. Pick a provider below or use
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
          ({ name, slug, icon, color }, i) => {
            const onCurrentPage =
              isSearching ||
              (i >= page * PAGE_SIZE && i < (page + 1) * PAGE_SIZE)
            return (
              <ProviderCardLink
                key={slug}
                href={`/tools/embed-url/${slug}`}
                style={onCurrentPage ? undefined : { display: 'none' }}
              >
                <ProviderIcon icon={icon} color={color} name={name} />
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
      any URL — 380+ oEmbed providers and a fallback card for everything else.
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
              Over 380 verified oEmbed providers are supported, including
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
    title='Embed Code Providers — 380+ Supported Sites'
    noSuffix
    description='Browse 380+ supported embed providers. Generate embed code for YouTube, Instagram, Twitter, TikTok, Figma, and more — free, no signup.'
    image='https://cdn.microlink.io/banner/sdk.jpeg'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/embed/providers',
        name: 'Embed Code Providers',
        description:
          'Browse 380+ supported embed providers. Generate embed code for YouTube, Instagram, Twitter, TikTok, Figma, and more.',
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
              text: 'Over 380 verified oEmbed providers are supported, including YouTube, Instagram, Twitter / X, TikTok, Figma, Spotify, and many more.'
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
