import { SubscriptionPlan } from "types"
import { env } from "@/env.mjs"

export const pricingData: SubscriptionPlan[] = [
  {
    title: 'Starter',
    description: 'For Individuals and Small Businesses',
    benefits: [
      'Rental website',
      'Unlimited products',
      'Basic analytics and reporting',
    ],
    limitations: [
      'No priority access to new features.',
      'Limited customer support',
      'No custom branding',
      'Limited access to business resources.',
    ],
    prices: {
      monthly: 0,
      yearly: 0,
    },
    stripeIds: {
      monthly: null,
      yearly: null,
    },
  },
  {
    title: 'Pro',
    description: 'For Small and Medium Businesses',
    benefits: [
      'Rental website',
      'Unlimited products',
      'Advanced analytics and reporting',
      'Priority customer support',
    ],
    limitations: [
      'No custom branding',
      'Limited access to business resources.',
    ],
    prices: {
      monthly: 15,
      yearly: 144,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    },
  },
  {
    title: 'Business',
    description: 'For Medium and Large Businesses',
    benefits: [
      'Rental website',
      'Unlimited products',
      'Real-time analytics and reporting',
      'Access to all templates, including custom branding',
      '24/7 business customer support',
      'Personalized onboarding and account management.',
    ],
    limitations: [],
    prices: {
      monthly: 30,
      yearly: 300,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
    },
  },
];
