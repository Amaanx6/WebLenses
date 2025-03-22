"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"

export default function PricingSection() {
  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for individual testers and small projects",
      features: [
        "Local commits",
        "Basic UI tracking",
        "DOM diff analysis",
        "Up to 50 commits per project",
        "1 project",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "per month",
      description: "Ideal for professional testers and small teams",
      features: [
        "Everything in Free",
        "Cloud sync",
        "Advanced diff analysis",
        "Unlimited commits",
        "Up to 10 projects",
        "Team sharing (up to 5 members)",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$49",
      period: "per month",
      description: "For organizations with advanced testing needs",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "API access",
        "Unlimited projects",
        "Unlimited team members",
        "Priority support",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-emerald-500 text-emerald-400">
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day free trial with no credit card required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex"
            >
              <Card
                className={`flex flex-col h-full bg-black/40 backdrop-blur-xl border ${
                  plan.popular ? "border-emerald-500" : "border-gray-800"
                } overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.05)]`}
              >
                {plan.popular && (
                  <div className="bg-emerald-500 text-white text-xs font-medium py-1 text-center">Most Popular</div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-gray-400 ml-1">{plan.period}</span>}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-emerald-400 mr-2 shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-emerald-500 hover:bg-emerald-600" : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}