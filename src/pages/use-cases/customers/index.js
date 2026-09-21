import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import { CUSTOMERS_HUB } from 'components/patterns/CustomerStory'
import {
  CustomersHub,
  customersStructured
} from 'components/patterns/UseCaseStory'

const CustomerStoriesPage = () => <CustomersHub />

export const Head = () => (
  <Meta
    title={CUSTOMERS_HUB.title}
    description={CUSTOMERS_HUB.description}
    schemaType='WebPage'
    structured={customersStructured()}
  />
)

export default CustomerStoriesPage
