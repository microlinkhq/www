import { color, space } from 'styled-system'
import styled from 'styled-components'

const svg = ({data, ...props}) => {
  const {image, logo} = data
  const alternativeColor = image.alternative_color || logo.alternative_color
  const color = image.color || logo.color
  return (
    `
    <svg width='3342' height='1688' viewBox='0 0 3342 1688' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient x1='0%' y1='50%' y2='50%' id='a'>
          <stop stop-color='${alternativeColor}' offset='0%' />
          <stop stop-color='${alternativeColor}' offset='0%' />
          <stop stop-color='#ebedef' offset='100%' />
        </linearGradient>
        <linearGradient x1='0%' y1='50%' y2='50%' id='b'>
          <stop stop-color='${color}' offset='0%' />
          <stop stop-color='${color}' offset='45.6%' />
          <stop stop-color='${color}' offset='100%' />
        </linearGradient>
        <linearGradient x1='0%' y1='50%' y2='50%' id='c'>
          <stop stop-color='#FAFBFC' offset='0%' />
          <stop stop-color='#FAFBFC' offset='100%' />
        </linearGradient>
      </defs>
      <g fill='none' fill-rule='evenodd'>
        <path d='M68.06 1655.696c508.346-416.423 594.262-287.227 879.95-266.245 508.042 37.308 385.943-204.53 651.573-186.706 366.353 24.58 408.608 1.833 672.138-261.222 124.255-124.025 249.894-86.84 343.106-177.498 126.938-123.456 51.715-211.79 187.247-339.923 168.997-159.77 399.614-135.46 520.61-413.6 65.503-150.583-97.64 1363.382 17.317 1674.5H41c.83-.486 18.377 3.692 27.06-29.304z' fill='url(#a)' />
        <path d='M3.467 1666.564c409.6-180.125 394.887-237.864 797.67-170.806 503.58 83.838 563.707-151.707 831.26-131.772 570.165 42.484 421.75-84.398 748.806-297.755 147.062-95.935 388.022-26.072 521.15-334.206 48.033-111.183-2.206-150.827 191.407-316.363 103.806-88.75 152.682-89.45 227.953-257.927 67.153-150.298-53.923 1489.808-53.923 1489.808L4.558 1684.986c.836-.486-9.843 14.577-1.09-18.42z' fill='url(#b)' />
        <path d='M886.717 1604.63c664.05 36.142 501.25-80.042 754.58-124.74 287.404-50.707 585.942 66.942 798.838-179.54 122.455-141.77 114.724-117.792 435.53-189.655 219.917-49.26 453.59-527.354 464.036-714.535 8.856-158.72-10.726 1288.84-10.726 1288.84H34c371.545-85.886 567.107-95.916 852.717-80.37z' fill='url(#c)' />
      </g>
    </svg>
    `
  )
}

export default styled.section`
${color}
${space}
background-size: cover;
min-height: 100vh;
background-image: ${props => `url("data:image/svg+xml;utf8,${svg(props)}")`}
`
