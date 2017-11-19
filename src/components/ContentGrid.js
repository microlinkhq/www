import {Row, Column, Avatar, Box, Subhead, Measure} from 'rebass'
import chunk from 'lodash.chunk'
import React from 'react'

const CustomMeasure = Measure.extend`
  max-width: 20rem;
  margin: auto;
`

export default ({data, itemsPerRow}) => (
  <div>
    {
      chunk(data, itemsPerRow).map((row, index) => (
        <Row key={index} pb={4}>
          {row.map(({icon, title, description}, index) => (
            <Column key={index} style={{textAlign: 'center'}}>
              <Avatar
                size={54}
                src={icon}
                style={{borderRadius: 0}}
              />
              <Box py={3}>
                <Subhead f={3} py={3} bold>
                  {title}
                </Subhead>
                <CustomMeasure color='#4B5663'>{description}</CustomMeasure>
              </Box>
            </Column>
          ))}
        </Row>
      ))
    }
  </div>
)
