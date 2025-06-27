'use client';

import { useState } from 'react';
import { Check, Star } from 'lucide-react';

interface SubscriptionTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  gradient: string;
}

const subscriptionTiers: SubscriptionTier[] = [
  {
    name: 'Trial',
    price: 'Free',
    description: 'Perfect for getting started',
    features: [
      '3 games per week',
      'Max stakes: $10',
      'Basic features'
    ],
    gradient: 'from-gray-600 to-gray-700'
  },
  {
    name: 'Silver',
    price: '$9.99',
    description: 'Great for casual players',
    features: [
      '10 games per week',
      'Max stakes: $50',
      'Priority matchmaking'
    ],
    gradient: 'from-gray-400 to-gray-500'
  },
  {
    name: 'Gold',
    price: '$24.99',
    description: 'For serious players',
    features: [
      'Unlimited games',
      'Max stakes: $200',
      'Exclusive features'
    ],
    popular: true,
    gradient: 'from-yellow-400 to-yellow-500'
  },
  {
    name: 'Platinum',
    price: '$49.99',
    description: 'Ultimate experience',
    features: [
      'Unlimited everything',
      'VIP tournaments',
      'Personal host'
    ],
    gradient: 'from-gray-200 to-gray-300'
  }
];

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#4B9CD3] to-transparent rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#7BB3E6] to-transparent rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <section className="relative py-20 px-4 text-center z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-3xl p-8 mb-8 shadow-2xl shadow-[#4B9CD3]/20 backdrop-blur-sm">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            <p className="text-xl md:text-2xl text-[#A0A0A0] mb-8 leading-relaxed">
              Unlock your full poker potential with our premium subscription tiers.
            </p>
          </div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="relative px-4 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800 rounded-xl p-1 flex items-center border border-[#4B9CD3]">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-[#4B9CD3] text-black shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  billingCycle === 'yearly'
                    ? 'bg-[#4B9CD3] text-black shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-green-500 text-black px-2 py-1 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Cards */}
      <section className="relative py-20 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subscriptionTiers.map((tier) => (
              <div
                key={tier.name}
                className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-2xl p-6 shadow-lg shadow-[#4B9CD3]/20 hover:shadow-xl hover:shadow-[#4B9CD3]/30 transition duration-300 transform hover:scale-105"
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] text-black px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#4B9CD3] mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">
                      {billingCycle === 'yearly' && tier.price !== 'Free' 
                        ? `$${(parseFloat(tier.price.replace('$', '')) * 10).toFixed(0)}` 
                        : tier.price}
                    </span>
                    <span className="text-gray-300 font-medium">
                      {tier.price === 'Free' ? '' : billingCycle === 'yearly' ? '/year' : '/month'}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{tier.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#4B9CD3] flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] hover:from-[#3A8BC2] hover:to-[#6AA2D5] text-black py-3 rounded-xl font-semibold transition duration-300 shadow-lg">
                  {tier.name === 'Trial' ? 'Start Free Trial' : `Get ${tier.name}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20 px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-[#4B9CD3] rounded-3xl p-8 shadow-2xl shadow-[#4B9CD3]/20 backdrop-blur-sm">
            <p className="text-xl text-[#A0A0A0] mb-6">
              Ready to elevate your poker game? Choose your plan and start playing today!
            </p>
            <button className="bg-gradient-to-r from-[#4B9CD3] to-[#7BB3E6] hover:from-[#3A8BC2] hover:to-[#6AA2D5] text-black px-8 py-4 rounded-2xl text-lg font-bold transition duration-300 shadow-lg shadow-[#4B9CD3]/30 hover:shadow-xl hover:shadow-[#4B9CD3]/40 transform hover:scale-105">
              Start Your Journey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 