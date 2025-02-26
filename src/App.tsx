import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Check, Zap } from 'lucide-react';
const PricingPage = () => {
  const features = {
    basic: [
      "Up to 10 projects",
      "Basic analytics",
      "24/7 support",
      "1 team member"
    ],
    pro: [
      "Up to 50 projects",
      "Advanced analytics",
      "Priority support",
      "5 team members",
      "Custom integrations"
    ],
    enterprise: [
      "Unlimited projects",
      "Enterprise analytics",
      "Dedicated support team",
      "Unlimited team members",
      "Custom integrations",
      "SLA guarantee",
      "Custom training"
    ]
  };
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
        <p className="text-lg text-gray-600">Choose the plan that's right for you</p>
        <div className="flex items-center justify-center mt-4 gap-2">
          <Clock className="h-5 w-5 text-red-500" />
          <p className="text-red-500 font-semibold">Special offer ends in 48 hours</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Basic Plan */}
        <Card className="relative">
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>For individuals getting started</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">$29</span>
              <span className="text-gray-500">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {features.basic.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Get Started</Button>
          </CardFooter>
        </Card>
        {/* Pro Plan */}
        <Card className="relative">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For growing teams</CardDescription>
              </div>
              <Badge className="bg-blue-500">Popular</Badge>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold">$79</span>
              <span className="text-gray-500">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {features.pro.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-500 hover:bg-blue-600">Upgrade to Pro</Button>
          </CardFooter>
        </Card>
        {/* Enterprise Plan */}
        <Card className="relative border-2 border-purple-500 shadow-lg">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-purple-500">
              <Zap className="h-4 w-4 mr-1" />
              Best Value
            </Badge>
          </div>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>For large organizations</CardDescription>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">$199</span>
                <span className="text-gray-500">/month</span>
                <Badge variant="outline" className="ml-2">Save 20%</Badge>
              </div>
              <p className="text-sm text-red-500 mt-2">Special offer ends soon!</p>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {features.enterprise.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-purple-500 hover:bg-purple-600">Contact Sales</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">All plans include our 30-day money-back guarantee</p>
      </div>
    </div>
  );
};
export default PricingPage;