"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, ArrowRight, Github, Terminal, Download, Code, Zap, Book, ChevronRight, ExternalLink, TwitterIcon } from 'lucide-react';

export default function DocsPage() {
  const [copied, setCopied] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('getting-started');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyCommand = (command: string, id: string) => {
    navigator.clipboard.writeText(command);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const steps = [
    {
      id: 'step-1',
      title: '1. Install shadcn/ui',
      description: 'First, set up shadcn/ui in your Next.js project',
      commands: [
        'npx shadcn-ui@latest init'
      ]
    },
    {
      id: 'step-2',
      title: '3. Choose Your Template',
      description: 'Run any command from our templates section to add form components',
      commands: [
        'npx forkforms add contactform',
        'npx forkforms add addressform',
        'npx forkforms add userfrom'
      ]
    }
  ];

  const templates = [
    {
      name: "Contact Form",
      description: "Classic contact form with name, email, subject, and message fields",
      command: "npx forkforms add contactform",
      features: ["Email validation", "Responsive design"]
    },
    {
      name: "Address Form",
      description: "Complete address form Perfect for checkouts.",
      command: "npx forkforms add addressform",
      features: ["Responsive design", "drop down options"]
    },
    {
      name: "Signup Form",
      description: "Sleek signup form perfect for new account registration",
      command: "npx forkforms add signupform",
      features: ["Email validation", "login button"]

    },
    {
      name: "Feedback Form",
      description: "Collect user feedback with rating system",
      command: "npx forkforms add feedback-form",
      features: ["Star rating component", "Comment section", "Category selection"]
    },
    {
      name: "Survey Form",
      description: "Multi-step survey with progress indicator",
      command: "npx forkforms add survey-form",
      features: ["Progress indicator", "Multiple question types", "Data export ready"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#164A41] via-[#4D774E] to-[#90C695] relative overflow-hidden">
      {/* Floating Geometric Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#E1B564]/20 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#90C695]/30 to-transparent rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-[#E1B564]/15 to-transparent rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-[#164A41]/95 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">ForkForms</Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white/80 hover:text-[#E1B564] transition-colors">Home</Link>
              <Link href="/templates" className="text-white/80 hover:text-[#E1B564] transition-colors">Templates</Link>
              <Link href="/docs" className="text-[#E1B564] font-semibold">Docs</Link>
              <Link href="/createform" className="text-white/80 hover:text-[#E1B564] transition-colors">Create Form</Link>
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
            <div className="flex items-center justify-center gap-3 mb-6">
              <Book className="h-12 w-12 text-[#E1B564]" />
              <h1 className="text-5xl md:text-6xl font-black tracking-tight">
                DOCUMENTATION
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Everything you need to get started with ForkForms. From setup to deployment in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Quick Start Guide</h2>
              <p className="text-white/80 text-lg">Get up and running in 2 simple steps</p>
            </div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <Card key={step.id} className="bg-[#164A41] border-[#4D774E] shadow-2xl">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E1B564] to-[#E1B564]/80 rounded-full flex items-center justify-center text-[#164A41] font-bold text-xl">
                        {index + 1}
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">{step.title}</CardTitle>
                        <CardDescription className="text-white/70">{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {step.commands.map((command, cmdIndex) => (
                      <div key={cmdIndex} className="bg-[#0D1A17] rounded-lg p-4 font-mono">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Terminal className="h-4 w-4 text-[#E1B564]" />
                            <span className="text-[#90C695]">{command}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyCommand(command, `${step.id}-${cmdIndex}`)}
                            className="text-white/60 hover:text-white hover:bg-white/10"
                          >
                            {copied === `${step.id}-${cmdIndex}` ?
                              <Check className="h-4 w-4" /> :
                              <Copy className="h-4 w-4" />
                            }
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Installation Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#164A41] mb-8">Installation Details</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-[#164A41]/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Download className="h-6 w-6 text-[#4D774E]" />
                    <CardTitle className="text-[#164A41]">Prerequisites</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[#4D774E]" />
                    <span>Next.js 13+ project</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[#4D774E]" />
                    <span>React 18+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[#4D774E]" />
                    <span>TypeScript (recommended)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-[#4D774E]" />
                    <span>Tailwind CSS configured</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#164A41]/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Code className="h-6 w-6 text-[#4D774E]" />
                    <CardTitle className="text-[#164A41]">File Structure</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                    <div className="space-y-1">
                      <div>your-project/</div>
                      <div className="ml-4">├── components/</div>
                      <div className="ml-8">└── ui/</div>
                      <div className="ml-12 text-[#4D774E]">├── button.tsx</div>
                      <div className="ml-12 text-[#4D774E]">├── card.tsx</div>
                      <div className="ml-12 text-[#4D774E]">├── input.tsx</div>
                      <div className="ml-12 text-[#4D774E]">├── label.tsx</div>
                      <div className="ml-12 text-[#E1B564]">└── contact-form.tsx</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-16 bg-gradient-to-br from-[#164A41] to-[#4D774E] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Available Templates</h2>
              <p className="text-white/80 text-lg mb-6">Choose from our collection of pre-built form components</p>
              <Link href="/templates">
                <Button className="bg-[#E1B564] hover:bg-[#E1B564]/90 text-[#164A41] font-semibold">
                  View All Templates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.slice(0, 3).map((template, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-[#E1B564] text-lg">{template.name}</CardTitle>
                    <CardDescription className="text-white/80 leading-relaxed">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {template.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm text-white/70">
                          <Check className="h-3 w-3 text-[#90C695]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#0D1A17] rounded-lg p-3 font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-[#90C695] text-sm">{template.command}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyCommand(template.command, `template-${index}`)}
                          className="text-white/60 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                        >
                          {copied === `template-${index}` ?
                            <Check className="h-3 w-3" /> :
                            <Copy className="h-3 w-3" />
                          }
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples - Updated with better visibility */}
      <section className="py-16 bg-gradient-to-br from-[#E1B564] to-[#E1B564]/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#164A41] mb-8">Usage Example</h2>

            <Card className="border-[#164A41]/20 bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-[#164A41] flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  How to use your form component
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-[#1E293B] rounded-lg p-6 font-mono text-sm overflow-x-auto shadow-inner">
                  <div className="space-y-2 relative">
                    <div>
                      <span className="text-emerald-400">import</span>{" "}
                      <span className="text-yellow-400">ContactForm</span>{" "}
                      <span className="text-emerald-400">from</span>{" "}
                      <span className="text-sky-300">'@/components/ui/contact-form'</span>;
                    </div>
                    <div className="mt-4">
                      <div>
                        <span className="text-emerald-400">export default function</span>{" "}
                        <span className="text-yellow-400">Page</span>() {`{`}
                      </div>
                      <div className="ml-4">
                        <span className="text-emerald-400">return</span> (
                      </div>
                      <div className="ml-8">
                        &lt;<span className="text-yellow-400">div</span>{" "}
                        <span className="text-sky-300">className</span>=
                        <span className="text-green-300">"container mx-auto py-8"</span>&gt;
                      </div>
                      <div className="ml-12">
                        &lt;<span className="text-yellow-400">ContactForm</span> /&gt;
                      </div>
                      <div className="ml-8">
                        &lt;/<span className="text-yellow-400">div</span>&gt;
                      </div>
                      <div className="ml-4">);</div>
                      <div className="text-white">{`}`}</div>
                    </div>
                  </div>
                </div>

                {/* Copy button */}
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyCommand(`import ContactForm from '@/components/ui/contact-form';

export default function Page() {
  return (
    <div className="container mx-auto py-8">
      <ContactForm />
    </div>
  );
}`, 'usage-example')}
                    className="text-[#164A41] hover:bg-[#164A41]/10"
                  >
                    {copied === 'usage-example' ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    Copy Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Added: Additional usage notes */}
            <div className="mt-6 space-y-4">
              <Card className="border-[#164A41]/20 bg-white/95">
                <CardContent className="p-6">
                  <h3 className="text-[#164A41] font-semibold mb-2 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-[#E1B564]" />
                    Quick Tips
                  </h3>
                  <ul className="space-y-2 text-[#164A41]/80">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-1 text-[#E1B564]" />
                      <span>All form components are fully customizable through props</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-1 text-[#E1B564]" />
                      <span>Forms are responsive by default and adapt to all screen sizes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-1 text-[#E1B564]" />
                      <span>Built-in form validation and error handling included</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
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
                  <TwitterIcon className="h-5 w-5" />
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
