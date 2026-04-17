import { PricingPlan } from '@core/model/pricing.model'

const plans: PricingPlan[] = [
  {
    id: 1,
    name: 'Professional Pack',
    icon: 'ri-user-line',
    price: '$19',
    duration: 'Month',
    features: [
      '10 GB Storage',
      '500 GB Bandwidth',
      'No Domain',
      '1 User',
      'Email Support',
      '24x7 Support',
    ],
    isRecommended: false,
  },
  {
    id: 2,
    name: 'Business Pack',
    icon: 'ri-briefcase-line',
    price: '$29',
    duration: 'Month',
    features: [
      '50 GB Storage',
      '900 GB Bandwidth',
      '2 Domain',
      '10 User',
      'Email Support',
      '24x7 Support',
    ],
    isRecommended: true,
  },
  {
    id: 3,
    name: 'Enterprise Pack',
    icon: 'ri-store-2-line',
    price: '$39',
    duration: 'Month',
    features: [
      '100 GB Storage',
      'Unlimited Bandwidth',
      '10 Domain',
      'Unlimited Users',
      'Email Support',
      '24x7 Support',
    ],
    isRecommended: false,
  },
]

export { plans }
