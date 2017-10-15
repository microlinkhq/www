import {Row, Column, Avatar, Box, Subhead, Measure} from 'rebass'
import chunk from 'lodash.chunk'
import React from 'react'

export default ({data, itemsPerRow}) => (
  <div>
    {
      chunk(data, itemsPerRow).map((row, index) => (
        <Row key={index} pb={4}>
          {row.map(({title, description}, index) => (
            <Column key={index} style={{textAlign: 'center'}}>
              <Avatar
                size={54}
                src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
              />
              <Box py={3}>
                <Subhead f={3} py={3} bold>
                  {title}
                </Subhead>
                <Measure color='#4B5663'>{description}</Measure>
              </Box>
            </Column>
          ))}
        </Row>
      ))
    }
  </div>
)
