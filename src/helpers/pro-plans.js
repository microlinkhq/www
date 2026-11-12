import { formatNumber } from './format-number'

const BASE_PLAN_PRICE = { EUR: 24, USD: 30 }

const MONTH_DAYS = 28

const calculateMonthlyPrice = reqsPerDay => ({
  EUR: Math.round((reqsPerDay / 1000) * BASE_PLAN_PRICE.EUR),
  USD: Math.round((reqsPerDay / 1000) * BASE_PLAN_PRICE.USD)
})

const createPlanFromMonthly = reqsPerMonthTotal => ({
  reqsPerMonth: formatNumber(reqsPerMonthTotal),
  reqsPerMonthTotal,
  reqsPerMonthPretty: `${formatNumber(Math.round(reqsPerMonthTotal / 1000))}K`,
  monthlyPrice: calculateMonthlyPrice(reqsPerMonthTotal / MONTH_DAYS)
})

const createPlanFromDaily = reqsPerDay =>
  createPlanFromMonthly(reqsPerDay * MONTH_DAYS)

export const PLANS = [
  { id: 'pro-1_625k-v4', ...createPlanFromMonthly(46000) },
  { id: 'pro-3k-v4', ...createPlanFromDaily(3000) },
  { id: 'pro-5k-v4', ...createPlanFromDaily(5000) },
  { id: 'pro-10k-v4', ...createPlanFromDaily(10000) },
  { id: 'pro-15k-v4', ...createPlanFromDaily(15000) }
]

export const DEFAULT_PLAN = PLANS[0]

export const pricePerThousand = (plan, currency) =>
  (plan.monthlyPrice[currency] / (plan.reqsPerMonthTotal / 1000)).toFixed(2)
