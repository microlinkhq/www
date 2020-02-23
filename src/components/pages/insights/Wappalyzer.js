import React from 'react'
import { Link, Text, Flex, Image, Box } from 'components/elements'

const getCategories = ({ categories }) =>
  categories.reduce((acc, item) => [...acc, ...Object.values(item)], [])

export default ({ data, ...props }) => (
  <Flex {...props}>
    <Image
      width='40px'
      src={`https://www.wappalyzer.com/images/icons/${data.icon}`}
    />
    <Box pl={3}>
      <Link icon href={data.website} children={data.name} />
      <Text>
        {getCategories(data).map((category, index) => (
          <Text
            color='gray7'
            as='span'
            key={category}
            children={index === 0 ? category : `, ${category}`}
          />
        ))}
      </Text>
    </Box>
  </Flex>
)
