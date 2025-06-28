"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Rocket, Palette, Zap, Settings, Smartphone, Shield, ArrowRight, Github, Twitter, Mail } from 'lucide-react';

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyCommand = () => {
    navigator.clipboard.writeText('npx forkforms add contact-form');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#164A41] via-[#4D774E] to-[#90C695] relative overflow-hidden">
      {/* Floating Geometric Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#E1B564]/20 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#90C695]/30 to-transparent rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-[#E1B564]/15 to-transparent rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-br from-[#4D774E]/20 to-transparent rounded-lg -rotate-12 animate-bounce delay-500"></div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-[#164A41]/95 backdrop-blur-md' : 'bg-transparent'
        }`}>
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">ForkForms</div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/80 hover:text-[#E1B564] transition-colors">Home</Link>
              <Link href="/templates" className="text-white/80 hover:text-[#E1B564] transition-colors">Templates</Link>
              <Link href="/docs" className="text-white/80 hover:text-[#E1B564] transition-colors">Docs</Link>
              <Link href="/createform" className="text-white/80 hover:text-[#E1B564] transition-colors">Create Form</Link>
            </div>
            <Button className="bg-[#E1B564]/0 hover:bg-[#E1B564]/90 text-[#164A41] font-semibold">

            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 text-center text-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              FORKFORMS
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Beautiful, ready-to-use form components for Next.js. Just run one command and add stunning forms to your project instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/templates"
                className="inline-flex items-center bg-[#E1B564] hover:bg-[#E1B564]/90 text-[#164A41] font-semibold text-lg px-8 py-3 rounded-md"
              >
                Browse Templates
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/docs"
                className="inline-flex items-center bg-[#E1B564] hover:bg-[#E1B564]/90 text-[#164A41] font-semibold text-lg px-8 py-3 rounded-md"
              >
                view Documentation
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* Command Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-[#164A41] border-[#4D774E] shadow-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyCommand}
                    className="text-white/60 hover:text-white hover:bg-white/10"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="font-mono text-white">
              <div className="space-y-2">
                <div className="text-[#E1B564]">$ npx forkforms add contact-form</div>
                <div className="text-[#90C695]">✓ Component added to your project</div>
                <div className="text-[#90C695]">✓ Ready to use in seconds</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#E1B564]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#164A41] mb-4">
              Why Choose ForkForms?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to add beautiful forms to your Next.js application
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Rocket className="h-8 w-8" />,
                title: "Lightning Fast Setup",
                description: "Get forms up and running in seconds with a single NPX command. No complex configuration or setup required."
              },
              {
                icon: <Palette className="h-8 w-8" />,
                title: "Beautiful Templates",
                description: "Professionally designed form components that look great out of the box. Fully customizable to match your brand."
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Next.js Optimized",
                description: "Built specifically for Next.js with TypeScript support, server components, and modern React patterns."
              },
              {
                icon: <Settings className="h-8 w-8" />,
                title: "Fully Customizable",
                description: "Modify styles, add validation, and extend functionality. Every component is yours to customize."
              },
              {
                icon: <Smartphone className="h-8 w-8" />,
                title: "Mobile Ready",
                description: "All forms are responsive by default and work perfectly on mobile, tablet, and desktop devices."
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Built-in Validation",
                description: "Smart validation with helpful error messages and accessibility features built right in."
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-[#164A41]/10">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#90C695] to-[#4D774E] rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-[#164A41] text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 bg-gradient-to-br from-[#164A41] to-[#4D774E] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Popular Templates
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Choose from our collection of pre-built form components
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Contact Form",
                description: "Classic contact form with name, email, subject, and message fields. Perfect for landing pages.",
                command: "npx forkforms add contact-form"
              },
              {
                name: "Newsletter Signup",
                description: "Simple email collection form with validation and success states. Great for building your email list.",
                command: "npx forkforms add newsletter"
              },
              {
                name: "User Registration",
                description: "Complete signup form with password strength indicator and terms acceptance checkbox.",
                command: "npx forkforms add register-form"
              },
              {
                name: "Login Form",
                description: "Sleek authentication form with remember me option and forgot password link.",
                command: "npx forkforms add login-form"
              },
              {
                name: "Feedback Form",
                description: "Collect user feedback with rating system and detailed comment sections.",
                command: "npx forkforms add feedback-form"
              },
              {
                name: "Survey Form",
                description: "Multi-step survey with progress indicator and various input types for data collection.",
                command: "npx forkforms add survey-form"
              }
            ].map((template, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-[#E1B564] text-lg">{template.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-white/80 leading-relaxed">
                    {template.description}
                  </CardDescription>
                  <Badge variant="outline" className="border-[#E1B564] text-[#E1B564] font-mono text-xs">
                    {template.command}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#164A41] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-[#E1B564] font-semibold mb-4">Product</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">Templates</a>
                <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">Documentation</a>
                <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">Examples</a>
                <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">Pricing</a>
              </div>
            </div>

            <div>
              <h4 className="text-[#E1B564] font-semibold mb-4">Developers</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">API Reference</a>
                <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">Contributing</a>
                <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">GitHub</a>
                <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">Changelog</a>
              </div>
            </div>

            <div>
              <h4 className="text-[#E1B564] font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">Help Center</a>
                <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">Contact Us</a>
                <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">Bug Reports</a>
                <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">Feature Requests</a>
              </div>
            </div>

            <div>
              <h4 className="text-[#E1B564] font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-white/70 hover:text-[#E1B564] transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-[#E1B564] transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-[#E1B564] transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>&copy; 2025 ForkForms. Built for Next.js developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
