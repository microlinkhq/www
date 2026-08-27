---
title: 'proxy › location'
description: 'Route the request through a proxy IP in a specific country to fetch region-specific content.'
isPro: true
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'

Type: <Type children='<string>'/><br/>
Default: <Type children="'us'"/><br/>
Values: ISO 3166-1 alpha-2 country code

It routes the request through a [proxy](/docs/api/parameters/proxy) IP in the given country over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://geolocation.microlink.io',
  proxy: { location: 'us' }
}} />

The value is case-insensitive. Unknown codes are rejected with [EINVALQUERY](/docs/api/basics/error-codes#einvalquery). `location` and [url](/docs/api/parameters/proxy/url) are exclusive.

The following country codes are supported:

- 🇦🇩 Andorra <Type children="'ad'" />
- 🇦🇪 United Arab Emirates <Type children="'ae'" />
- 🇦🇫 Afghanistan <Type children="'af'" />
- 🇦🇬 Antigua & Barbuda <Type children="'ag'" />
- 🇦🇱 Albania <Type children="'al'" />
- 🇦🇲 Armenia <Type children="'am'" />
- 🇦🇴 Angola <Type children="'ao'" />
- 🇦🇷 Argentina <Type children="'ar'" />
- 🇦🇸 American Samoa <Type children="'as'" />
- 🇦🇹 Austria <Type children="'at'" />
- 🇦🇺 Australia <Type children="'au'" />
- 🇦🇼 Aruba <Type children="'aw'" />
- 🇦🇿 Azerbaijan <Type children="'az'" />
- 🇧🇦 Bosnia & Herzegovina <Type children="'ba'" />
- 🇧🇧 Barbados <Type children="'bb'" />
- 🇧🇩 Bangladesh <Type children="'bd'" />
- 🇧🇪 Belgium <Type children="'be'" />
- 🇧🇫 Burkina Faso <Type children="'bf'" />
- 🇧🇬 Bulgaria <Type children="'bg'" />
- 🇧🇭 Bahrain <Type children="'bh'" />
- 🇧🇮 Burundi <Type children="'bi'" />
- 🇧🇯 Benin <Type children="'bj'" />
- 🇧🇲 Bermuda <Type children="'bm'" />
- 🇧🇴 Bolivia <Type children="'bo'" />
- 🇧🇷 Brazil <Type children="'br'" />
- 🇧🇸 Bahamas <Type children="'bs'" />
- 🇧🇹 Bhutan <Type children="'bt'" />
- 🇧🇼 Botswana <Type children="'bw'" />
- 🇧🇾 Belarus <Type children="'by'" />
- 🇧🇿 Belize <Type children="'bz'" />
- 🇨🇦 Canada <Type children="'ca'" />
- 🇨🇫 Central African Republic <Type children="'cf'" />
- 🇨🇬 Congo - Brazzaville <Type children="'cg'" />
- 🇨🇭 Switzerland <Type children="'ch'" />
- 🇨🇮 Côte d’Ivoire <Type children="'ci'" />
- 🇨🇱 Chile <Type children="'cl'" />
- 🇨🇲 Cameroon <Type children="'cm'" />
- 🇨🇳 China <Type children="'cn'" />
- 🇨🇴 Colombia <Type children="'co'" />
- 🇨🇷 Costa Rica <Type children="'cr'" />
- 🇨🇻 Cape Verde <Type children="'cv'" />
- 🇨🇾 Cyprus <Type children="'cy'" />
- 🇨🇿 Czechia <Type children="'cz'" />
- 🇩🇪 Germany <Type children="'de'" />
- 🇩🇯 Djibouti <Type children="'dj'" />
- 🇩🇰 Denmark <Type children="'dk'" />
- 🇩🇲 Dominica <Type children="'dm'" />
- 🇩🇴 Dominican Republic <Type children="'do'" />
- 🇩🇿 Algeria <Type children="'dz'" />
- 🇪🇨 Ecuador <Type children="'ec'" />
- 🇪🇪 Estonia <Type children="'ee'" />
- 🇪🇬 Egypt <Type children="'eg'" />
- 🇪🇷 Eritrea <Type children="'er'" />
- 🇪🇸 Spain <Type children="'es'" />
- 🇪🇹 Ethiopia <Type children="'et'" />
- 🇫🇮 Finland <Type children="'fi'" />
- 🇫🇯 Fiji <Type children="'fj'" />
- 🇫🇷 France <Type children="'fr'" />
- 🇬🇦 Gabon <Type children="'ga'" />
- 🇬🇧 United Kingdom <Type children="'gb'" />
- 🇬🇩 Grenada <Type children="'gd'" />
- 🇬🇪 Georgia <Type children="'ge'" />
- 🇬🇬 Guernsey <Type children="'gg'" />
- 🇬🇭 Ghana <Type children="'gh'" />
- 🇬🇮 Gibraltar <Type children="'gi'" />
- 🇬🇲 Gambia <Type children="'gm'" />
- 🇬🇳 Guinea <Type children="'gn'" />
- 🇬🇶 Equatorial Guinea <Type children="'gq'" />
- 🇬🇷 Greece <Type children="'gr'" />
- 🇬🇹 Guatemala <Type children="'gt'" />
- 🇬🇼 Guinea-Bissau <Type children="'gw'" />
- 🇭🇰 Hong Kong SAR China <Type children="'hk'" />
- 🇭🇳 Honduras <Type children="'hn'" />
- 🇭🇷 Croatia <Type children="'hr'" />
- 🇭🇹 Haiti <Type children="'ht'" />
- 🇭🇺 Hungary <Type children="'hu'" />
- 🇮🇩 Indonesia <Type children="'id'" />
- 🇮🇪 Ireland <Type children="'ie'" />
- 🇮🇱 Israel <Type children="'il'" />
- 🇮🇳 India <Type children="'in'" />
- 🇮🇸 Iceland <Type children="'is'" />
- 🇮🇹 Italy <Type children="'it'" />
- 🇯🇲 Jamaica <Type children="'jm'" />
- 🇯🇴 Jordan <Type children="'jo'" />
- 🇯🇵 Japan <Type children="'jp'" />
- 🇰🇪 Kenya <Type children="'ke'" />
- 🇰🇬 Kyrgyzstan <Type children="'kg'" />
- 🇰🇭 Cambodia <Type children="'kh'" />
- 🇰🇲 Comoros <Type children="'km'" />
- 🇰🇷 South Korea <Type children="'kr'" />
- 🇰🇼 Kuwait <Type children="'kw'" />
- 🇰🇿 Kazakhstan <Type children="'kz'" />
- 🇱🇧 Lebanon <Type children="'lb'" />
- 🇱🇨 St. Lucia <Type children="'lc'" />
- 🇱🇮 Liechtenstein <Type children="'li'" />
- 🇱🇰 Sri Lanka <Type children="'lk'" />
- 🇱🇸 Lesotho <Type children="'ls'" />
- 🇱🇹 Lithuania <Type children="'lt'" />
- 🇱🇺 Luxembourg <Type children="'lu'" />
- 🇱🇻 Latvia <Type children="'lv'" />
- 🇲🇦 Morocco <Type children="'ma'" />
- 🇲🇨 Monaco <Type children="'mc'" />
- 🇲🇩 Moldova <Type children="'md'" />
- 🇲🇪 Montenegro <Type children="'me'" />
- 🇲🇬 Madagascar <Type children="'mg'" />
- 🇲🇰 North Macedonia <Type children="'mk'" />
- 🇲🇱 Mali <Type children="'ml'" />
- 🇲🇲 Myanmar (Burma) <Type children="'mm'" />
- 🇲🇳 Mongolia <Type children="'mn'" />
- 🇲🇴 Macao SAR China <Type children="'mo'" />
- 🇲🇶 Martinique <Type children="'mq'" />
- 🇲🇷 Mauritania <Type children="'mr'" />
- 🇲🇹 Malta <Type children="'mt'" />
- 🇲🇺 Mauritius <Type children="'mu'" />
- 🇲🇻 Maldives <Type children="'mv'" />
- 🇲🇼 Malawi <Type children="'mw'" />
- 🇲🇽 Mexico <Type children="'mx'" />
- 🇲🇾 Malaysia <Type children="'my'" />
- 🇲🇿 Mozambique <Type children="'mz'" />
- 🇳🇦 Namibia <Type children="'na'" />
- 🇳🇪 Niger <Type children="'ne'" />
- 🇳🇬 Nigeria <Type children="'ng'" />
- 🇳🇮 Nicaragua <Type children="'ni'" />
- 🇳🇱 Netherlands <Type children="'nl'" />
- 🇳🇴 Norway <Type children="'no'" />
- 🇳🇵 Nepal <Type children="'np'" />
- 🇳🇷 Nauru <Type children="'nr'" />
- 🇳🇿 New Zealand <Type children="'nz'" />
- 🇴🇲 Oman <Type children="'om'" />
- 🇵🇦 Panama <Type children="'pa'" />
- 🇵🇪 Peru <Type children="'pe'" />
- 🇵🇬 Papua New Guinea <Type children="'pg'" />
- 🇵🇭 Philippines <Type children="'ph'" />
- 🇵🇰 Pakistan <Type children="'pk'" />
- 🇵🇱 Poland <Type children="'pl'" />
- 🇵🇷 Puerto Rico <Type children="'pr'" />
- 🇵🇹 Portugal <Type children="'pt'" />
- 🇵🇼 Palau <Type children="'pw'" />
- 🇵🇾 Paraguay <Type children="'py'" />
- 🇶🇦 Qatar <Type children="'qa'" />
- 🇷🇴 Romania <Type children="'ro'" />
- 🇷🇸 Serbia <Type children="'rs'" />
- 🇷🇺 Russia <Type children="'ru'" />
- 🇷🇼 Rwanda <Type children="'rw'" />
- 🇸🇦 Saudi Arabia <Type children="'sa'" />
- 🇸🇨 Seychelles <Type children="'sc'" />
- 🇸🇪 Sweden <Type children="'se'" />
- 🇸🇬 Singapore <Type children="'sg'" />
- 🇸🇮 Slovenia <Type children="'si'" />
- 🇸🇰 Slovakia <Type children="'sk'" />
- 🇸🇱 Sierra Leone <Type children="'sl'" />
- 🇸🇳 Senegal <Type children="'sn'" />
- 🇸🇴 Somalia <Type children="'so'" />
- 🇸🇷 Suriname <Type children="'sr'" />
- 🇸🇸 South Sudan <Type children="'ss'" />
- 🇸🇹 São Tomé & Príncipe <Type children="'st'" />
- 🇸🇻 El Salvador <Type children="'sv'" />
- 🇹🇩 Chad <Type children="'td'" />
- 🇹🇬 Togo <Type children="'tg'" />
- 🇹🇭 Thailand <Type children="'th'" />
- 🇹🇯 Tajikistan <Type children="'tj'" />
- 🇹🇲 Turkmenistan <Type children="'tm'" />
- 🇹🇳 Tunisia <Type children="'tn'" />
- 🇹🇴 Tonga <Type children="'to'" />
- 🇹🇷 Türkiye <Type children="'tr'" />
- 🇹🇹 Trinidad & Tobago <Type children="'tt'" />
- 🇹🇻 Tuvalu <Type children="'tv'" />
- 🇹🇼 Taiwan <Type children="'tw'" />
- 🇹🇿 Tanzania <Type children="'tz'" />
- 🇺🇦 Ukraine <Type children="'ua'" />
- 🇺🇬 Uganda <Type children="'ug'" />
- 🇺🇸 United States <Type children="'us'" />
- 🇺🇾 Uruguay <Type children="'uy'" />
- 🇺🇿 Uzbekistan <Type children="'uz'" />
- 🇻🇪 Venezuela <Type children="'ve'" />
- 🇻🇬 British Virgin Islands <Type children="'vg'" />
- 🇻🇳 Vietnam <Type children="'vn'" />
- 🇻🇺 Vanuatu <Type children="'vu'" />
- 🇾🇪 Yemen <Type children="'ye'" />
- 🇿🇦 South Africa <Type children="'za'" />
- 🇿🇲 Zambia <Type children="'zm'" />
