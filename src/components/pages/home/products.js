import Container from 'components/elements/Container'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import { trackEvent } from 'helpers/plausible'
import { transition, theme } from 'theme'
import { setSaturation } from 'polished'
import styled from 'styled-components'
import React from 'react'

// curated product line-up shown as an at-a-glance grid under the hero — each
// card carries its own accent colour, reused for the hover glow + arrow
const PRODUCTS = [
  {
    title: 'Screenshot',
    subtitle: 'Pixel-perfect captures of any web page',
    color: '#fd494a',
    href: '/screenshot'
  },
  {
    title: 'Link preview',
    subtitle: 'Beautiful previews for any URL',
    color: '#449bf8',
    href: '/link-preview'
  },
  {
    title: 'Markdown',
    subtitle: 'Structured, AI-ready page content',
    color: '#06c167',
    href: '/markdown'
  },
  {
    title: 'Metadata',
    subtitle: 'Normalized data from any website',
    color: '#3e55ff',
    href: '/metadata'
  },
  {
    title: 'Search API',
    subtitle: 'Turn Google results into structured data',
    color: '#1c7ed6',
    href: '/search'
  },
  {
    title: 'PDF',
    subtitle: 'Print-ready documents on demand',
    color: '#e000ac',
    href: '/pdf'
  },
  {
    title: 'Logo',
    subtitle: 'Favicons and brand marks at scale',
    color: '#d306aa',
    href: '/logo'
  }
]

// flex-wrap + centered so the trailing card in an incomplete row stays centered;
// max-width sized to hold three 300px cards (+ their 8px margins) per row
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 984px;
  margin: 0 auto;
`

// north-east arrow, rendered inline so its stroke follows the card's `color`
const Arrow = styled.svg`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 18px;
  height: 18px;
  color: #b9b9c0;
  transition: color ${transition.medium}, transform ${transition.medium};
`

const Card = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 300px;
  min-height: 208px;
  margin: 8px;
  padding: 32px 28px;
  background: #fff;
  border: 1px solid #eaeaec;
  border-radius: 16px;
  text-decoration: none;
  transition: border-color ${transition.medium}, box-shadow ${transition.medium},
    transform ${transition.medium};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${props => setSaturation(0.8, props.$color)};
      transform: translateY(-3px);
      box-shadow: 0 20px 44px -26px ${props => props.$color};
    }

    &:hover ${Arrow} {
      color: ${props => props.$color};
      transform: translate(2px, -2px);
    }
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`

const CardTitle = styled(Text)`
  display: block;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #0a0a0a;
`

const CardSubtitle = styled(Text)`
  display: block;
  margin-top: 12px;
  max-width: 15em;
  font-size: 17px;
  line-height: 1.4;
  color: #6a6a70;
`

const ProductCard = ({ title, subtitle, color, href }) => (
  <Card
    href={href}
    $color={color}
    onClick={() => trackEvent('home products grid', { product: title })}
  >
    <Arrow
      aria-hidden='true'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='7' y1='17' x2='17' y2='7' />
      <polyline points='7 7 17 7 17 17' />
    </Arrow>
    <CardTitle as='span'>{title}</CardTitle>
    <CardSubtitle as='span'>{subtitle}</CardSubtitle>
  </Card>
)

const Products = () => (
  <Container
    as='section'
    css={theme({
      maxWidth: '100%',
      px: [3, 3, 3, 3],
      pt: [4, 4, 5, 5],
      pb: [4, 4, 5, 5]
    })}
  >
    <Grid>
      {PRODUCTS.map(product => (
        <ProductCard key={product.href} {...product} />
      ))}
    </Grid>
  </Container>
)

export default Products
