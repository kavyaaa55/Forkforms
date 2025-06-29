"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, ArrowLeft, Github, Twitter, Mail, User, MessageSquare, UserPlus, LogIn, Star, BarChart3, CreditCard, Phone } from 'lucide-react';

export default function TemplatesPage() {
  const [copiedIndex, setCopiedIndex] = useState(-1);

  const copyCommand = (command: string, index: number): void => {
    navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(-1), 2000);
  };

  const templates = [
    {
      name: "Address Form",
      description: "Complete address form with country, state, and postal code validation. Perfect for shipping and billing information.",
      command: "npx forkforms add addressform",
      icon: <User className="h-6 w-6" />,
      // Add your image URL here
      image: "addressform.png", // Replace with "https://your-image-url.com/address-form.png"
    },
    {
      name: "Checkout Form",
      description: "Full checkout experience with payment details, shipping info, and order summary. E-commerce ready.",
      command: "npx forkforms add checkoutform",
      icon: <CreditCard className="h-6 w-6" />,
      image: "addressform.png",
    },
    {
      name: "Contact Form",
      description: "Classic contact form with name, email, subject, and message fields. Perfect for landing pages.",
      command: "npx forkforms add contactform",
      icon: <MessageSquare className="h-6 w-6" />,
      image: "contactform.png",
    },
    {
      name: "Edit Profile Form",
      description: "User profile editing form with avatar upload, personal info, and account settings.",
      command: "npx forkforms add editprofileform",
      icon: <User className="h-6 w-6" />,

      image: "editprofileform.png",
    },
    {
      name: "Feedback Form",
      description: "Collect user feedback with rating system and detailed comment sections. Great for product improvement.",
      command: "npx forkforms add feedbackform",
      icon: <Star className="h-6 w-6" />,
      image: "feedbackform.png",
    },
    {
      name: "Signup Form",
      description: "Complete registration form with password strength indicator and terms acceptance checkbox.",
      command: "npx forkforms add signupform",
      icon: <UserPlus className="h-6 w-6" />,
      image: "signupform.png",
    },
    // {
    //   name: "User Form",
    //   description: "General user information form with validation and error handling. Flexible for various use cases.",
    //   command: "npx forkforms add userform",
    //   icon: <User className="h-6 w-6" />,
    //
    //   image: "userfrom.png",
    // }
  ];

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#164A41]/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-2xl font-bold text-white">ForkForms</a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-white/80 hover:text-[#E1B564] transition-colors">Home</a>
              <a href="/templates" className="text-[#E1B564] font-semibold transition-colors">Templates</a>
              <a href="/docs" className="text-white/80 hover:text-[#E1B564] transition-colors">Docs</a>
              <a href="/createform" className="text-white/80 hover:text-[#E1B564] transition-colors">Create Form</a>
            </div>
            <Button className="bg-[#E1B564]/0 hover:bg-[#E1B564]/90 text-[#164A41] font-semibold">
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-12 text-center text-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              TEMPLATES
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Beautiful, production-ready form components. Copy the command and add to your Next.js project instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="pb-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {templates.map((template, index) => (
              <Card key={index} className="group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden">
                {/* Template Preview Section - Dynamic height based on content */}
                <div className="relative bg-gradient-to-br from-[#164A41] to-[#4D774E] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20"></div>

                  {/* Image or Fallback Preview */}
                  {template.image ? (
                    // Direct Image Display
                    <div className="relative z-10 p-4 w-full">
                      <img
                        src={template.image}
                        alt={`${template.name} preview`}
                        className="w-full h-auto max-h-80 object-contain rounded-lg shadow-xl transform group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          console.error(`Failed to load image for ${template.name}`);
                          // Hide the image on error and show fallback
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    // Fallback Mock Form Preview
                    <div className="relative z-10 bg-white/95 rounded-lg p-6 w-5/6 h-64 shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center justify-center h-full">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#164A41] to-[#4D774E] flex items-center justify-center text-white shadow-lg">
                          {React.cloneElement(template.icon, { className: "h-8 w-8" })}
                        </div>
                      </div>

                      {/* Form Elements Preview */}
                      <div className="absolute top-3 left-3 right-3 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full mt-3"></div>
                        <div className="h-2 bg-gray-100 rounded w-2/3"></div>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                        <div className="h-6 bg-[#E1B564] rounded w-1/3 ml-auto mt-3"></div>
                      </div>

                      <div className="absolute top-1/2 left-3 right-3 -translate-y-1/2 space-y-3">
                        <div className="h-8 bg-gray-50 border border-gray-200 rounded"></div>
                        <div className="h-8 bg-gray-50 border border-gray-200 rounded"></div>
                      </div>
                    </div>
                  )}

                  {/* Animated Background Elements */}
                  <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 left-6 w-8 h-8 bg-white/10 rounded-full animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 left-4 w-6 h-6 bg-white/5 rounded-full animate-pulse delay-500"></div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-[#E1B564] text-2xl flex items-center gap-2">
                    {template.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-white/80 leading-relaxed min-h-[4rem] text-base">
                    {template.description}
                  </CardDescription>

                  {/* Command Section */}
                  <div className="bg-[#164A41]/50 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#E1B564] text-sm font-semibold">Install Command</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyCommand(template.command, index)}
                        className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                      >
                        {copiedIndex === index ?
                          <Check className="h-4 w-4 text-green-400" /> :
                          <Copy className="h-4 w-4" />
                        }
                      </Button>
                    </div>
                    <code className="text-white/90 text-sm font-mono block break-all">
                      {template.command}
                    </code>
                  </div>

                  <Button
                    className="w-full bg-[#E1B564] hover:bg-[#E1B564]/90 text-[#164A41] font-semibold py-3 text-base"
                    onClick={() => copyCommand(template.command, index)}
                  >
                    {copiedIndex === index ? 'Copied!' : 'Copy Command'}
                  </Button>
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
                <a href="/templates" className="block text-white/70 hover:text-[#E1B564] transition-colors">Templates</a>
                <a href="/docs" className="block text-white/70 hover:text-[#E1B564] transition-colors">Documentation</a>
                <a href="/createforms" className="block text-white/70 hover:text-[#E1B564] transition-colors">Create forms</a>

              </div>
            </div>

            {/* <div> */}
            {/*   <h4 className="text-[#E1B564] font-semibold mb-4">Developers</h4> */}
            {/*   <div className="space-y-2"> */}
            {/*     <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">API Reference</a> */}
            {/*     <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">Contributing</a> */}
            {/*     <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">GitHub</a> */}
            {/*     <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">Changelog</a> */}
            {/*   </div> */}
            {/* </div> */}

            {/* <div> */}
            {/*   <h4 className="text-[#E1B564] font-semibold mb-4">Support</h4> */}
            {/*   <div className="space-y-2"> */}
            {/*     <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">Help Center</a> */}
            {/*     <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">Contact Us</a> */}
            {/*     <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">Bug Reports</a> */}
            {/*     <a href="#" className="block text-white/70 hover:text-[#E1B564] transition-colors">Feature Requests</a> */}
            {/*   </div> */}
            {/* </div> */}

            <div>
              <h4 className="text-[#E1B564] font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                {/* <a href="#" className="text-white/70 hover:text-[#E1B564] transition-colors"> */}
                {/*   <Github className="h-5 w-5" /> */}
                {/* </a> */}
                <a href="https://x.com/CODEStalker1111?t=mn0bmsRikKvmUVvelnBYag&s=08" className="text-white/70 hover:text-[#E1B564] transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                {/* <a href="#" className="text-white/70 hover:text-[#E1B564] transition-colors"> */}
                {/*   <Mail className="h-5 w-5" /> */}
                {/* </a> */}
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
