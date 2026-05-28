import React from 'react'
import { Clock, Code as CodeIcon, FileText, MapPin, Star } from 'react-feather'
import { colors, theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import {
  brandMatchFor,
  buildBreadcrumb,
  formatBytes,
  formatCoordinate,
  formatRelativeTime,
  monogramFor,
  monogramOverrideFor,
  monogramTintFor,
  truncateLineCss
} from './utils'

import {
  HeroResultBadge,
  HeroResultBadgeSmall,
  HeroResultBrand,
  HeroResultBreadcrumb,
  HeroResultDescription,
  HeroResultList,
  HeroResultListItem,
  HeroResultListTitle,
  HeroResultMeta,
  HeroResultMonogram,
  HeroResultPath,
  HeroResultSite,
  HeroResultTitle
} from './'

const tabletHelperTextCss = theme({
  m: 0,
  color: 'black70',
  fontSize: [0, 0, 1, 1],
  lineHeight: 1,
  ...truncateLineCss
})

const HostBrandIcon = ({ host, size = '20px' }) => {
  const brand = brandMatchFor(host)
  if (brand) {
    return (
      <HeroResultBrand $size={size} $tint={brand.tint}>
        <img
          src={`https://cdn.simpleicons.org/${brand.icon}`}
          alt=''
          aria-hidden='true'
          loading='lazy'
        />
      </HeroResultBrand>
    )
  }
  const override = monogramOverrideFor(host)
  if (override) {
    return (
      <HeroResultBrand $size={size} $tint={override.tint}>
        <HeroResultMonogram $tint={override.tint} $color={override.color}>
          {override.label}
        </HeroResultMonogram>
      </HeroResultBrand>
    )
  }
  return (
    <HeroResultBrand $size={size} $tint={colors.white}>
      <HeroResultMonogram $tint={monogramTintFor(host)}>
        {monogramFor(host)}
      </HeroResultMonogram>
    </HeroResultBrand>
  )
}

const Dot = () => (
  <Text as='span' css={theme({ color: 'black50', fontSize: [0, 0, 1, 1] })}>
    •
  </Text>
)

const RelativeTime = ({ date }) => (
  <Flex css={theme({ alignItems: 'center', gap: 1 })}>
    <Clock size={12} aria-hidden='true' />
    <Text as='span' css={theme({ color: 'black60', fontSize: [0, 0, 1, 1] })}>
      {formatRelativeTime(date)}
    </Text>
  </Flex>
)

const ListDescription = ({ children }) => (
  <Text as='p' css={tabletHelperTextCss}>
    {children}
  </Text>
)

const HeroResultListRow = ({ children }) => (
  <Flex
    css={theme({
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 3,
      width: '100%',
      minWidth: 0
    })}
  >
    {children}
  </Flex>
)

const HeroResultBadgeGroup = ({ children }) => (
  <Flex css={theme({ alignItems: 'center', gap: 1, flexShrink: 0 })}>
    {children}
  </Flex>
)

export const HeroSearchResultCard = ({ data, badge = null }) => {
  const { host, path, origin } = buildBreadcrumb(data.url)
  return (
    <Box>
      <HeroResultBreadcrumb>
        <HostBrandIcon host={host} size='28px' />
        <Flex
          css={theme({
            flexDirection: 'column',
            minWidth: 0,
            lineHeight: 1
          })}
        >
          <HeroResultSite>{host}</HeroResultSite>
          <HeroResultPath>
            {origin}
            {path}
          </HeroResultPath>
        </Flex>
      </HeroResultBreadcrumb>
      <HeroResultTitle>{data.title}</HeroResultTitle>
      <HeroResultDescription>{data.description}</HeroResultDescription>
      {badge && <HeroResultMeta>{badge}</HeroResultMeta>}
    </Box>
  )
}

const HeroNewsResultCard = ({ data }) => (
  <Box>
    <HeroResultBreadcrumb>
      <HeroResultSite>{data.publisher}</HeroResultSite>
      <Dot />
      <RelativeTime date={data.date} />
    </HeroResultBreadcrumb>
    <HeroResultTitle>{data.title}</HeroResultTitle>
    <HeroResultDescription>{data.description}</HeroResultDescription>
  </Box>
)

const HeroPlacesResultCard = ({ data }) => (
  <Box>
    <Flex css={theme({ alignItems: 'center', gap: 2, minWidth: 0 })}>
      <HeroResultBrand $size='28px' $tint={colors.white}>
        <img
          src='https://cdn.simpleicons.org/googlemaps'
          alt=''
          aria-hidden='true'
          loading='lazy'
        />
      </HeroResultBrand>
      <Text
        as='span'
        css={theme({
          m: 0,
          color: 'black',
          fontSize: [1, 1, 2, 2],
          fontWeight: 'bold',
          lineHeight: 1,
          ...truncateLineCss,
          minWidth: 0
        })}
      >
        {data.title}
      </Text>
      <HeroResultBadge>{data.category}</HeroResultBadge>
    </Flex>
    <HeroResultMeta>
      <Flex
        as='span'
        css={theme({
          alignItems: 'center',
          gap: 1,
          color: 'black',
          fontSize: [1, 1, 2, 2]
        })}
      >
        <Star
          size={14}
          fill={colors.yellow5}
          color={colors.yellow5}
          aria-hidden='true'
        />
        <Text
          as='span'
          css={theme({
            color: 'black',
            fontSize: [1, 1, 2, 2],
            fontWeight: 'bold'
          })}
        >
          {data.rating.toFixed(1)}
        </Text>
        <Text
          as='span'
          css={theme({ color: 'black60', fontSize: [0, 0, 1, 1] })}
        >
          ({data.reviewCount.toLocaleString()})
        </Text>
      </Flex>
    </HeroResultMeta>
    <Flex css={theme({ alignItems: 'center', gap: 2, mt: 2 })}>
      <MapPin size={14} aria-hidden='true' color={colors.black70} />
      <Text as='span' css={theme({ color: 'black80', fontSize: [1, 1, 2, 2] })}>
        {data.address}
      </Text>
    </Flex>
    <Text
      as='span'
      css={theme({
        display: 'block',
        mt: 1,
        color: 'black50',
        fontFamily: 'mono',
        fontSize: [0, 0, 1, 1]
      })}
    >
      {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}
    </Text>
  </Box>
)

const HeroSearchListItem = ({ item }) => {
  const { host, path, origin } = buildBreadcrumb(item.url)
  return (
    <HeroResultListItem>
      <HeroResultBreadcrumb>
        <HostBrandIcon host={host} size='20px' />
        <Flex
          css={theme({
            flexDirection: 'column',
            minWidth: 0,
            lineHeight: 1
          })}
        >
          <HeroResultSite>{host}</HeroResultSite>
          <HeroResultPath>
            {origin}
            {path}
          </HeroResultPath>
        </Flex>
      </HeroResultBreadcrumb>
      <HeroResultListTitle>{item.title}</HeroResultListTitle>
      {item.description && (
        <ListDescription>{item.description}</ListDescription>
      )}
    </HeroResultListItem>
  )
}

const HeroNewsListItem = ({ item }) => {
  const { host } = buildBreadcrumb(item.url)
  return (
    <HeroResultListItem>
      <HeroResultBreadcrumb>
        <HostBrandIcon host={host} size='20px' />
        <HeroResultSite>{item.publisher}</HeroResultSite>
        <Dot />
        <RelativeTime date={item.date} />
      </HeroResultBreadcrumb>
      <HeroResultListTitle>{item.title}</HeroResultListTitle>
      {item.description && (
        <ListDescription>{item.description}</ListDescription>
      )}
    </HeroResultListItem>
  )
}

const HeroSearchEnrichedListItem = ({ item }) => {
  const { host } = buildBreadcrumb(item.url)
  return (
    <HeroResultListItem>
      <HeroResultListRow>
        <HeroResultBreadcrumb>
          <HostBrandIcon host={host} size='20px' />
          <HeroResultSite>{host}</HeroResultSite>
        </HeroResultBreadcrumb>
        <HeroResultBadgeGroup>
          <HeroResultBadgeSmall>
            <CodeIcon aria-hidden='true' />
            html · {formatBytes(item.htmlBytes)}
          </HeroResultBadgeSmall>
          {typeof item.mdBytes === 'number' && (
            <HeroResultBadgeSmall>
              <FileText aria-hidden='true' />
              md · {formatBytes(item.mdBytes)}
            </HeroResultBadgeSmall>
          )}
        </HeroResultBadgeGroup>
      </HeroResultListRow>
      <HeroResultListTitle>{item.title}</HeroResultListTitle>
      {item.description && (
        <ListDescription>{item.description}</ListDescription>
      )}
    </HeroResultListItem>
  )
}

const HeroImageListItem = ({ item }) => {
  const { host } = buildBreadcrumb(item.url)
  const width = item.image?.width ?? item.thumbnail?.width
  const height = item.image?.height ?? item.thumbnail?.height

  return (
    <HeroResultListItem>
      <HeroResultListRow>
        <HeroResultBreadcrumb>
          <HostBrandIcon host={host} size='20px' />
          <HeroResultSite>{host}</HeroResultSite>
        </HeroResultBreadcrumb>
        {(width || height) && (
          <HeroResultBadgeSmall>
            {width || '?'} × {height || '?'}
          </HeroResultBadgeSmall>
        )}
      </HeroResultListRow>
      <HeroResultListTitle>{item.title}</HeroResultListTitle>
    </HeroResultListItem>
  )
}

const HeroVideoListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <HeroResultBreadcrumb>
        <HeroResultSite>{item.publisher || item.channel}</HeroResultSite>
        {item.date && (
          <>
            <Dot />
            <RelativeTime date={item.date} />
          </>
        )}
      </HeroResultBreadcrumb>
      {item.duration_pretty && (
        <HeroResultBadgeSmall>{item.duration_pretty}</HeroResultBadgeSmall>
      )}
    </HeroResultListRow>
    <HeroResultListTitle>{item.title}</HeroResultListTitle>
    {item.description && <ListDescription>{item.description}</ListDescription>}
  </HeroResultListItem>
)

const HeroPlacesListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <Text
        as='span'
        css={theme({
          m: 0,
          color: 'black',
          fontSize: [1, 1, 2, 2],
          fontWeight: 'bold',
          lineHeight: 1,
          ...truncateLineCss,
          minWidth: 0
        })}
      >
        {item.title}
      </Text>
      {item.category && (
        <HeroResultBadgeSmall>{item.category}</HeroResultBadgeSmall>
      )}
    </HeroResultListRow>
    <HeroResultMeta css={theme({ mt: 1 })}>
      {typeof item.rating === 'number' && (
        <Flex
          as='span'
          css={theme({
            alignItems: 'center',
            gap: 1,
            color: 'black',
            fontSize: [1, 1, 2, 2]
          })}
        >
          <Star
            size={12}
            fill={colors.yellow5}
            color={colors.yellow5}
            aria-hidden='true'
          />
          <Text
            as='span'
            css={theme({
              color: 'black',
              fontSize: [0, 0, 1, 1],
              fontWeight: 'bold'
            })}
          >
            {item.rating.toFixed(1)}
          </Text>
          {typeof item.reviewCount === 'number' && (
            <Text
              as='span'
              css={theme({ color: 'black60', fontSize: [0, 0, 1, 1] })}
            >
              ({item.reviewCount.toLocaleString()})
            </Text>
          )}
        </Flex>
      )}
    </HeroResultMeta>
    {item.address && <ListDescription>{item.address}</ListDescription>}
  </HeroResultListItem>
)

const HeroMapListItem = ({ item }) => (
  <HeroResultListItem>
    <Box css={theme({ minWidth: 0 })}>
      <HeroResultListRow>
        <Text
          as='span'
          css={theme({
            m: 0,
            color: 'black',
            fontSize: [1, 1, 2, 2],
            fontWeight: 'bold',
            lineHeight: 1,
            ...truncateLineCss,
            minWidth: 0
          })}
        >
          {item.title}
        </Text>
        <HeroResultBadgeSmall>map</HeroResultBadgeSmall>
      </HeroResultListRow>

      {item.address && (
        <Text
          as='p'
          css={theme({
            m: 0,
            mt: 2,
            color: 'black70',
            fontSize: [0, 0, 1, 1],
            lineHeight: 2
          })}
        >
          {item.address}
        </Text>
      )}

      {(typeof item.latitude === 'number' ||
        typeof item.longitude === 'number') && (
          <Box
            css={theme({
              mt: 2,
              p: 2,
              borderRadius: 3,
              bg: 'gray0',
              border: 1,
              borderColor: 'black05'
            })}
          >
            <Text
              as='p'
              css={theme({
                m: 0,
                color: 'black50',
                fontFamily: 'mono',
                fontSize: [0, 0, 1, 1],
                fontWeight: 'bold',
                lineHeight: 1
              })}
            >
              Coordinates
            </Text>
            <Flex css={theme({ gap: 2, mt: 2, flexWrap: 'wrap' })}>
              {typeof item.latitude === 'number' && (
                <HeroResultBadgeSmall>
                  lat · {formatCoordinate(item.latitude, 'N', 'S')}
                </HeroResultBadgeSmall>
              )}
              {typeof item.longitude === 'number' && (
                <HeroResultBadgeSmall>
                  lng · {formatCoordinate(item.longitude, 'E', 'W')}
                </HeroResultBadgeSmall>
              )}
            </Flex>
          </Box>
      )}

      {item.place?.id && (
        <HeroResultMeta css={theme({ mt: 2, gap: 1 })}>
          <HeroResultBadgeSmall>place · {item.place.id}</HeroResultBadgeSmall>
        </HeroResultMeta>
      )}
    </Box>
  </HeroResultListItem>
)

const HeroShoppingListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <HeroResultBreadcrumb>
        <HeroResultSite>{item.publisher}</HeroResultSite>
      </HeroResultBreadcrumb>
      {item.priceLabel && (
        <HeroResultBadgeSmall>{item.priceLabel}</HeroResultBadgeSmall>
      )}
    </HeroResultListRow>
    <HeroResultListTitle>{item.title}</HeroResultListTitle>
  </HeroResultListItem>
)

const HeroScholarListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <HeroResultBadgeGroup>
        {item.year && <HeroResultBadgeSmall>{item.year}</HeroResultBadgeSmall>}
        {typeof item.citations === 'number' && (
          <HeroResultBadgeSmall>
            {item.citations.toLocaleString()} cites
          </HeroResultBadgeSmall>
        )}
      </HeroResultBadgeGroup>
    </HeroResultListRow>
    <HeroResultListTitle>{item.title}</HeroResultListTitle>
    {item.publisher && <ListDescription>{item.publisher}</ListDescription>}
  </HeroResultListItem>
)

const HeroPatentListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <HeroResultBadgeGroup>
        {item.publicationNumber && (
          <HeroResultBadgeSmall>{item.publicationNumber}</HeroResultBadgeSmall>
        )}
        {item.language && (
          <HeroResultBadgeSmall>{item.language}</HeroResultBadgeSmall>
        )}
      </HeroResultBadgeGroup>
    </HeroResultListRow>
    <HeroResultListTitle>{item.title}</HeroResultListTitle>
    <ListDescription>{item.assignee || item.inventor}</ListDescription>
  </HeroResultListItem>
)

const HeroAutocompleteListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <HeroResultBadgeSmall>suggestion</HeroResultBadgeSmall>
    </HeroResultListRow>
    <HeroResultListTitle>{item.value}</HeroResultListTitle>
  </HeroResultListItem>
)

const RESULT_VARIANTS = {
  search: {
    ItemComponent: HeroSearchListItem,
    SingleComponent: HeroSearchResultCard,
    keyOf: item => item.url
  },
  news: {
    ItemComponent: HeroNewsListItem,
    SingleComponent: HeroNewsResultCard,
    keyOf: item => item.url
  },
  images: {
    ItemComponent: HeroImageListItem,
    SingleComponent: HeroSearchResultCard,
    keyOf: item => item.url
  },
  videos: {
    ItemComponent: HeroVideoListItem,
    SingleComponent: HeroSearchResultCard,
    keyOf: item => item.url
  },
  places: {
    ItemComponent: HeroPlacesListItem,
    SingleComponent: HeroPlacesResultCard,
    keyOf: item => item.cid || item.title
  },
  maps: {
    ItemComponent: HeroMapListItem,
    SingleComponent: HeroSearchResultCard,
    keyOf: item => item.cid || item.title
  },
  shopping: {
    ItemComponent: HeroShoppingListItem,
    SingleComponent: HeroSearchResultCard,
    keyOf: item => item.id || item.title
  },
  scholar: {
    ItemComponent: HeroScholarListItem,
    SingleComponent: HeroSearchResultCard,
    keyOf: item => item.id || item.title
  },
  patents: {
    ItemComponent: HeroPatentListItem,
    SingleComponent: HeroSearchResultCard,
    keyOf: item => item.publicationNumber || item.title
  },
  autocomplete: {
    ItemComponent: HeroAutocompleteListItem,
    SingleComponent: HeroSearchResultCard,
    keyOf: item => item.value
  },
  'search-enriched': {
    ItemComponent: HeroSearchEnrichedListItem,
    SingleComponent: ({ data }) => (
      <HeroSearchResultCard
        data={data}
        badge={
          <HeroResultBadge>
            <CodeIcon size={12} aria-hidden='true' />
            html · {formatBytes(data.htmlBytes)}
          </HeroResultBadge>
        }
      />
    ),
    keyOf: item => item.url
  }
}

export const HeroResultCard = ({ result }) => {
  if (!result) return null
  const { variant, data } = result
  const config = RESULT_VARIANTS[variant] ?? RESULT_VARIANTS.search

  if (Array.isArray(data)) {
    const { ItemComponent, keyOf } = config
    return (
      <HeroResultList>
        {data.map(item => (
          <ItemComponent key={keyOf(item)} item={item} />
        ))}
      </HeroResultList>
    )
  }

  const { SingleComponent } = config
  return <SingleComponent data={data} />
}
