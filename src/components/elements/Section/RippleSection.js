import Section from './base'

const svg = ({ color, alternativeColor, ...props }) => {
  return `
    <svg xmlns='http://www.w3.org/2000/svg' width='3000' height='2000'>
    <defs>
      <linearGradient id='a' x1='1495' x2='1495' y1='2018' y2='-31' gradientUnits='userSpaceOnUse'>
        <stop offset='0' stop-color='${color}'/>
        <stop offset='1' stop-color='${alternativeColor}'/>
      </linearGradient>
    </defs>
    <path fill='url(#a)' d='M-38-31h3066v2049H-38z'/>
    <path fill='#fff' fill-rule='evenodd' d='M-53 1148c79.185-64.07 227.883 59.4 288 25 859.29-491.76 767.66 18.19 1006-72 309.84-117.249 403.57 203.75 770 79 254.89-86.78 741.48-353.2 989-293 107.71 26.2 0 1300 0 1300H-2c.765-.58-59.021-999.59-51-1039z' data-name='Color Fill 1' opacity='.25'/>
    <path fill='#fff' fill-rule='evenodd' d='M-2 840c457.748 14.672 551.1 278.46 820 261 253.51-16.46 434.71-181.553 689-165 328.14 21.36 413.1 72.01 800 84 597.49 18.51 599.28-61.959 694-102 172.94-73.109 0 1269 0 1269l-3006-6c.766-.58-5.021-1301.591 3-1341z' data-name='Color Fill 2' opacity='.2'/>
    </svg>
  `
}

export default Section.extend`
  background-image: ${props =>
    `url("data:image/svg+xml;utf8,${encodeURIComponent(svg(props))}")`};
  position: relative;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  background-color: #ffffff;
`
