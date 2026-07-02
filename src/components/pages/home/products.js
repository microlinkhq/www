import Container from 'components/elements/Container'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import { PRODUCTS, VERTICAL_ORDER } from 'components/pages/home/catalog'
import { trackEvent } from 'helpers/plausible'
import { transition, theme } from 'theme'
import { setSaturation } from 'polished'
import styled from 'styled-components'
import React from 'react'

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

const ProductCard = ({ label, description, color, href }) => (
  <Card
    href={href}
    $color={color}
    onClick={() => trackEvent('home products grid', { product: label })}
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
    <CardTitle as='span'>{label}</CardTitle>
    <CardSubtitle as='span'>{description}</CardSubtitle>
  </Card>
)

// render every product in the same order as the hero's product menu, straight
// from the shared catalog, so the two surfaces always list the same set
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
      {VERTICAL_ORDER.map(vertical => (
        <ProductCard key={vertical} {...PRODUCTS[vertical]} />
      ))}
    </Grid>
  </Container>
)

export default Products
