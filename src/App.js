import React, { useState, useEffect } from 'react';
import { 
  Crown, Sparkles, Zap, Target, Brain, Users, Shield, 
  ChevronRight, Star, Check, X, Menu, Search, Filter,
  Download, Share2, Copy, Heart, Bookmark, TrendingUp,
  BarChart3, Settings, User, CreditCard, Trophy,
  Lightbulb, Rocket, Globe, Lock, Unlock, Play,
  ArrowRight, Plus, Edit, Trash2, Eye, Code,
  MessageSquare, FileText, Image, Video, Music,
  ShoppingBag, Calendar, Clock, DollarSign
} from 'lucide-react';

// Smart Press Media Brand Colors
const brandColors = {
  gold: '#F4B942',
  cream: '#F5E6C8',
  dark: '#1a1a1a',
  charcoal: '#2a2a2a',
  white: '#ffffff',
  lightCream: '#faf7f0'
};

// Business Categories with Templates
const businessCategories = {
  'Marketing & Sales': {
    icon: TrendingUp,
    templates: ['Social Media Campaigns', 'Email Marketing', 'Sales Copy', 'Product Descriptions', 'Ad Copy', 'Landing Pages', 'Sales Funnels', 'Customer Personas', 'Brand Messaging', 'Lead Generation', 'Cold Outreach', 'Content Marketing', 'Influencer Outreach', 'Press Releases', 'Case Studies', 'Testimonial Collection', 'Survey Creation', 'Market Research', 'Competitor Analysis', 'SEO Content', 'Blog Posts', 'Newsletter Content', 'Video Scripts', 'Podcast Scripts', 'Webinar Content'],
    color: '#FF6B6B'
  },
  'Code & Development': {
    icon: Code,
    templates: ['API Documentation', 'Code Reviews', 'Bug Reports', 'User Stories', 'Technical Specs', 'Database Queries', 'Testing Scripts', 'Git Commit Messages', 'Code Comments', 'Debugging Prompts', 'Algorithm Design', 'Function Documentation', 'Class Definitions', 'Error Handling', 'Performance Optimization', 'Security Audits', 'Code Refactoring', 'Unit Tests', 'Integration Tests', 'Pull Request Templates', 'Code Standards', 'Architecture Documentation', 'Data Models', 'REST API Design', 'GraphQL Schemas'],
    color: '#8B5CF6'
  },
  'Business Operations': {
    icon: BarChart3,
    templates: ['Business Plans', 'Strategic Planning', 'Project Proposals', 'Meeting Agendas', 'Status Reports', 'Performance Reviews', 'Policy Documents', 'Process Documentation', 'Training Materials', 'Onboarding Guides', 'Employee Handbooks', 'Risk Assessment', 'Compliance Checklists', 'Quality Assurance', 'Vendor Agreements', 'Contract Templates', 'Time Tracking', 'KPI Dashboards', 'Board Presentations', 'Investor Pitches', 'Operational Procedures', 'Workflow Design', 'Standard Operating Procedures', 'Change Management', 'Project Planning'],
    color: '#4ECDC4'
  },
  'Customer Service': {
    icon: Users,
    templates: ['Support Responses', 'FAQ Creation', 'Complaint Resolution', 'Customer Onboarding', 'Product Tutorials', 'Troubleshooting Guides', 'Escalation Protocols', 'Feedback Surveys', 'Service Scripts', 'Chat Responses', 'Email Templates', 'Return Policies', 'Warranty Information', 'User Manuals', 'Help Documentation', 'Training Scripts', 'Quality Assurance', 'Customer Journey Maps', 'Service Standards', 'Response Templates', 'Follow-up Sequences', 'Retention Campaigns', 'Loyalty Programs', 'Customer Success Plans', 'Satisfaction Surveys'],
    color: '#45B7D1'
  },
  'Legal & Compliance': {
    icon: Shield,
    templates: ['Legal Documents', 'Terms of Service', 'Privacy Policies', 'Contracts', 'Agreements', 'Compliance Reports', 'Risk Assessments', 'Audit Preparations', 'Regulatory Filings', 'IP Protection', 'Employment Law', 'Consumer Protection', 'Data Protection', 'Corporate Governance', 'Due Diligence', 'Litigation Support', 'Settlement Agreements', 'Non-Disclosure Agreements', 'Partnership Agreements', 'Licensing Terms', 'Trademark Applications', 'Copyright Notices', 'Disclaimers', 'Waivers', 'Insurance Claims'],
    color: '#96CEB4'
  },
  'Technology & IT': {
    icon: Settings,
    templates: ['System Administration', 'DevOps Procedures', 'Infrastructure Setup', 'Monitoring & Alerts', 'Security Assessments', 'Network Configuration', 'Cloud Deployment', 'Backup Strategies', 'Disaster Recovery', 'Change Management', 'Release Notes', 'Migration Plans', 'Troubleshooting Guides', 'IT Policies', 'Security Protocols', 'Server Management', 'Database Administration', 'Performance Monitoring', 'Incident Response', 'Capacity Planning', 'Automation Scripts', 'Configuration Management', 'Service Level Agreements', 'Technical Support', 'IT Training'],
    color: '#FECA57'
  },
  'HR & People': {
    icon: User,
    templates: ['Job Descriptions', 'Interview Questions', 'Performance Reviews', 'Employee Evaluations', 'Onboarding Checklists', 'Training Programs', 'Skills Assessments', 'Career Development', 'Succession Planning', 'Compensation Analysis', 'Benefits Communication', 'Employee Surveys', 'Exit Interviews', 'Disciplinary Actions', 'Recognition Programs', 'Team Building Activities', 'Workplace Policies', 'Diversity & Inclusion', 'Remote Work Guidelines', 'Professional Development', 'Goal Setting', 'Feedback Templates', 'Recruitment Strategies', 'Talent Acquisition', 'Employee Retention'],
    color: '#10B981'
  },
  'Finance & Accounting': {
    icon: DollarSign,
    templates: ['Budget Planning', 'Financial Reports', 'Invoice Templates', 'Expense Reports', 'Cash Flow Analysis', 'ROI Calculations', 'Cost-Benefit Analysis', 'Financial Projections', 'Tax Documentation', 'Audit Preparations', 'Accounts Receivable', 'Accounts Payable', 'Payroll Processing', 'Financial Statements', 'Budget Variance Reports', 'Investment Analysis', 'Risk Assessment', 'Credit Applications', 'Banking Documentation', 'Insurance Claims', 'Grant Applications', 'Funding Proposals', 'Financial Controls', 'Compliance Reports', 'Payment Processing'],
    color: '#F59E0B'
  },
  'Healthcare & Medical': {
    icon: Heart,
    templates: ['Patient Records', 'Medical Assessments', 'Treatment Plans', 'Prescription Templates', 'Insurance Forms', 'Medical Reports', 'Patient Communication', 'Appointment Scheduling', 'Medical Histories', 'Consent Forms', 'Discharge Instructions', 'Referral Letters', 'Lab Results', 'Diagnostic Reports', 'Care Plans', 'Medical Billing', 'HIPAA Compliance', 'Quality Metrics', 'Patient Education', 'Clinical Documentation', 'Medical Research', 'Drug Information', 'Emergency Protocols', 'Telemedicine Setup', 'Health Screenings'],
    color: '#EF4444'
  },
  'E-commerce & Retail': {
    icon: ShoppingBag,
    templates: ['Product Listings', 'Product Descriptions', 'Category Management', 'Inventory Tracking', 'Order Processing', 'Shipping Documentation', 'Return Policies', 'Customer Reviews', 'Pricing Strategies', 'Promotional Campaigns', 'Vendor Management', 'Supply Chain', 'Quality Control', 'Sales Reports', 'Customer Analytics', 'A/B Testing', 'Conversion Optimization', 'Abandoned Cart Recovery', 'Loyalty Programs', 'Marketplace Management', 'Payment Processing', 'Fraud Prevention', 'Cross-selling Strategies', 'Seasonal Planning', 'Brand Guidelines'],
    color: '#8B5CF6'
  },
  'Research & Analysis': {
    icon: BarChart3,
    templates: ['Market Research', 'Data Analysis', 'Survey Design', 'Statistical Reports', 'Competitive Analysis', 'Trend Analysis', 'User Research', 'A/B Test Design', 'Focus Group Scripts', 'Interview Questions', 'Research Proposals', 'Data Collection', 'Report Writing', 'Presentation Design', 'Hypothesis Testing', 'Methodology Design', 'Literature Reviews', 'Case Studies', 'Benchmarking', 'Metrics Definition', 'Dashboard Creation', 'Insights Generation', 'Recommendation Reports', 'Research Ethics', 'Data Visualization'],
    color: '#06B6D4'
  },
  'Creative & Content': {
    icon: Lightbulb,
    templates: ['Blog Articles', 'Creative Writing', 'Storytelling', 'Brand Stories', 'Video Scripts', 'Podcast Content', 'Social Media Posts', 'Creative Briefs', 'Campaign Concepts', 'Visual Descriptions', 'Product Stories', 'User Testimonials', 'Case Study Narratives', 'Content Calendars', 'Editorial Guidelines', 'Style Guides', 'Brand Voice', 'Tone Guidelines', 'Content Templates', 'Headline Generators', 'Hook Creation', 'Call-to-Actions', 'Value Propositions', 'Benefit Statements', 'Feature Descriptions'],
    color: '#FF9FF3'
  }
};

// Subscription Tiers
const subscriptionTiers = [
  {
    name: 'Starter',
    price: '$0',
    period: 'Forever Free',
    description: 'Perfect for trying our platform',
    features: [
      '5 prompts per month',
      'Basic templates',
      'Standard AI assistance',
      'Community support',
      'Basic analytics'
    ],
    buttonText: 'Get Started Free',
    popular: false
  },
  {
    name: 'Professional',
    price: '$29',
    period: 'per month',
    description: 'For serious prompt engineers',
    features: [
      'Unlimited prompts',
      'All 150+ premium templates',
      'Advanced AI optimization',
      'Priority support',
      'Advanced analytics',
      'Export & sharing',
      'Custom categories',
      'Performance insights'
    ],
    buttonText: 'Start Pro Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    description: 'For teams and organizations',
    features: [
      'Everything in Professional',
      'Team collaboration',
      'Custom branding',
      'API access',
      'White-label solution',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced security',
      'Training sessions',
      'SLA guarantee'
    ],
    buttonText: 'Contact Sales',
    popular: false
  }
];

const PerfectPromptBuilder = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [savedPrompts, setSavedPrompts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setSavedPrompts([
      { id: 1, title: 'Marketing Campaign for AI Tool', category: 'Marketing & Sales', lastUsed: '2 hours ago', performance: 95 },
      { id: 2, title: 'Customer Support Response Template', category: 'Customer Service', lastUsed: '1 day ago', performance: 88 },
      { id: 3, title: 'Technical Documentation Guide', category: 'Technology & Development', lastUsed: '3 days ago', performance: 92 }
    ]);
  }, []);

  const handleOptimizePrompt = async () => {
    if (!userPrompt.trim()) return;
    
    setIsOptimizing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    
    const optimizations = [
      `Refined Version: ${userPrompt}\n\nKey Improvements:\nâ€¢ Enhanced clarity and specificity\nâ€¢ Added context frameworks\nâ€¢ Optimized for better AI responses\nâ€¢ Included performance metrics\nâ€¢ Added output format specifications`,
      `Enhanced Prompt:\n\n${userPrompt}\n\nAI Optimizations Applied:\nâœ“ Contextual framing added\nâœ“ Output format clarified\nâœ“ Specificity enhanced\nâœ“ Edge cases addressed\nâœ“ Performance keywords included\n\nExpected Performance Boost: +34%`,
      `Professional Optimization:\n\n"${userPrompt}"\n\nBecomes:\n\n[Enhanced professional version with specific parameters, clear objectives, detailed context, and optimized structure for maximum AI performance]\n\nConfidence Score: 96%`
    ];
    
    setOptimizedPrompt(optimizations[Math.floor(Math.random() * optimizations.length)]);
    setIsOptimizing(false);
    
    addNotification('Prompt optimized successfully! Performance boost: +32%', 'success');
  };

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleLogin = (email, password) => {
    setUser({ 
      email, 
      plan: 'Professional', 
      promptsUsed: 127, 
      promptsLimit: 'Unlimited',
      joinDate: 'August 2025'
    });
    setIsLoggedIn(true);
    setShowLogin(false);
    setCurrentView('dashboard');
    addNotification('Welcome back! Ready to create perfect prompts?', 'success');
  };

  const getDemoUser = (tier) => {
    const demos = {
      'Starter': { plan: 'Starter', promptsUsed: 3, promptsLimit: 5 },
      'Professional': { plan: 'Professional', promptsUsed: 127, promptsLimit: 'Unlimited' },
      'Enterprise': { plan: 'Enterprise', promptsUsed: 1847, promptsLimit: 'Unlimited' }
    };
    
    setUser({ 
      email: `demo@${tier.toLowerCase()}.com`, 
      ...demos[tier],
      joinDate: 'August 2025'
    });
    setIsLoggedIn(true);
    setCurrentView('dashboard');
    addNotification(`Exploring ${tier} features!`, 'info');
  };

  const LoginModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full transform transition-all">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to Perfect Prompt Builder</p>
        </div>
        
        <div className="space-y-4 mb-6">
          <input 
            type="email" 
            placeholder="Email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
          <input 
            type="password" 
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
        </div>
        
        <button 
          onClick={() => handleLogin('demo@user.com', 'password')}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all mb-4"
        >
          Sign In
        </button>
        
        <div className="text-center text-sm text-gray-600 mb-4">
          Don't have an account? <span className="text-yellow-600 cursor-pointer font-semibold">Sign up free</span>
        </div>
        
        <div className="border-t pt-4">
          <p className="text-center text-sm text-gray-600 mb-3">Try our demo tiers:</p>
          <div className="space-y-2">
            {['Starter', 'Professional', 'Enterprise'].map(tier => (
              <button 
                key={tier}
                onClick={() => getDemoUser(tier)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all"
              >
                Demo {tier} Features
              </button>
            ))}
          </div>
        </div>
        
        <button 
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div 
            key={notification.id}
            className={`px-6 py-3 rounded-lg shadow-lg transform transition-all ${
              notification.type === 'success' ? 'bg-green-500' :
              notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
            }`}
          >
            {notification.message}
          </div>
        ))}
      </div>

      <header className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Perfect Prompt Builder</h1>
            <p className="text-sm text-gray-400">by Smart Press Media</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-yellow-400 transition-colors">Features</a>
            <a href="#templates" className="hover:text-yellow-400 transition-colors">Templates</a>
            <a href="#pricing" className="hover:text-yellow-400 transition-colors">Pricing</a>
          </nav>
          <button 
            onClick={() => setShowLogin(true)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-6 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all"
          >
            Sign In
          </button>
        </div>
      </header>

      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-full text-yellow-400 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Prompt Engineering Platform
            </span>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-400 to-white bg-clip-text text-transparent">
            Create Perfect Prompts
            <br />
            <span className="text-yellow-400">Every Single Time</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your AI interactions with our advanced prompt optimization engine. 
            150+ professional templates, real-time AI assistance, and enterprise-grade analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Building Now
            </button>
            <button className="border-2 border-gray-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all">
              Watch Demo
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <Target className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">150+ Templates</h3>
              <p className="text-gray-400">Professional templates for every business category</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <Brain className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">AI Optimization</h3>
              <p className="text-gray-400">Real-time prompt enhancement and performance analysis</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <Trophy className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Enterprise Ready</h3>
              <p className="text-gray-400">Team collaboration, custom branding, and API access</p>
            </div>
          </div>
        </div>
      </section>

      <section id="templates" className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Business Categories</h2>
          <p className="text-xl text-gray-400">150+ professional templates across all industries</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Object.entries(businessCategories).map(([category, data]) => {
            const IconComponent = data.icon;
            return (
              <div key={category} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-400/50 transition-all group cursor-pointer">
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{ backgroundColor: data.color + '20', color: data.color }}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold">{category}</h3>
                </div>
                <p className="text-gray-400 mb-4">{data.templates.length} professional templates</p>
                <div className="flex flex-wrap gap-2">
                  {data.templates.slice(0, 3).map(template => (
                    <span key={template} className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
                      {template}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-semibold">
                    +{data.templates.length - 3} more
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="pricing" className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-400">Start free, upgrade when you're ready to scale</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subscriptionTiers.map(tier => (
            <div 
              key={tier.name}
              className={`relative p-8 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                tier.popular 
                  ? 'border-yellow-400 bg-gradient-to-b from-yellow-400/10 to-transparent' 
                  : 'border-gray-600 bg-gray-800/50'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 px-6 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold mb-2">
                  {tier.price}
                  <span className="text-lg text-gray-400 font-normal">/{tier.period.split(' ')[0]}</span>
                </div>
                <p className="text-gray-400">{tier.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map(feature => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => getDemoUser(tier.name)}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  tier.popular
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="container mx-auto px-6 py-12 border-t border-gray-800">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold">Perfect Prompt Builder</span>
          </div>
          <p className="text-gray-400 mb-4">Powered by Smart Press Media</p>
          <p className="text-sm text-gray-600">Â© 2025 Smart Press Media. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen" style={{ background: `linear-gradient(135deg, ${brandColors.dark} 0%, ${brandColors.charcoal} 50%, ${brandColors.dark} 100%)` }}>
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${brandColors.gold} 0%, #f9c74f 100%)` }}>
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Perfect Prompt Builder</h1>
              <p className="text-sm" style={{ color: brandColors.gold }}>Professional Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-lg transition-all ${currentView === 'dashboard' ? 'bg-yellow-400/20 text-yellow-400' : 'text-gray-300 hover:text-white'}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setCurrentView('templates')}
                className={`px-4 py-2 rounded-lg transition-all ${currentView === 'templates' ? 'bg-yellow-400/20 text-yellow-400' : 'text-gray-300 hover:text-white'}`}
              >
                Templates
              </button>
              <button 
                onClick={() => setCurrentView('builder')}
                className={`px-4 py-2 rounded-lg transition-all ${currentView === 'builder' ? 'bg-yellow-400/20 text-yellow-400' : 'text-gray-300 hover:text-white'}`}
              >
                AI Builder
              </button>
            </div>
            
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
              <div className="text-right">
                <p className="text-sm font-semibold text-white">{user?.plan || 'Professional'}</p>
                <p className="text-xs text-gray-400">{user?.promptsUsed || 127}/{user?.promptsLimit || 'Unlimited'}</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {currentView === 'dashboard' && (
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `${brandColors.gold}20`, color: brandColors.gold }}>
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-green-400 text-sm font-semibold">+23%</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">2,847</h3>
              <p className="text-gray-400">Prompts Created</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-green-400 text-sm font-semibold">+18%</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">94.2%</h3>
              <p className="text-gray-400">Success Rate</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-green-400 text-sm font-semibold">-34%</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">2.3s</h3>
              <p className="text-gray-400">Avg Response Time</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-green-400 text-sm font-semibold">+67%</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">$12.4K</h3>
              <p className="text-gray-400">Value Generated</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Rocket className="w-5 h-5 mr-2" style={{ color: brandColors.gold }} />
                Quick Start
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setCurrentView('builder')}
                  className="w-full p-4 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-lg border border-yellow-400/30 text-left hover:from-yellow-400/30 hover:to-yellow-600/30 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">Create New Prompt</h4>
                      <p className="text-sm text-gray-400">Start with AI assistance</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-yellow-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                
                <button 
                  onClick={() => setCurrentView('templates')}
                  className="w-full p-4 bg-gray-700/50 rounded-lg text-left hover:bg-gray-700 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">Browse Templates</h4>
                      <p className="text-sm text-gray-400">150+ professional templates</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-400" />
                Recent Prompts
              </h3>
              <div className="space-y-3">
                {savedPrompts.map(prompt => (
                  <div key={prompt.id} className="p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white text-sm">{prompt.title}</h4>
                      <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${brandColors.gold}20`, color: brandColors.gold }}>
                        {prompt.performance}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{prompt.category}</span>
                      <span className="text-xs text-gray-500">{prompt.lastUsed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentView === 'templates' && (
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Template Library</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {Object.entries(businessCategories).map(([category, data]) => {
                  const IconComponent = data.icon;
                  return (
                    <button 
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full p-3 rounded-lg text-left transition-all flex items-center ${
                        selectedCategory === category 
                          ? 'bg-yellow-400/20 border-yellow-400/30 border' 
                          : 'bg-gray-800/50 hover:bg-gray-700/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        selectedCategory === category ? 'text-yellow-400' : ''
                      }`} style={{ backgroundColor: data.color + '20', color: selectedCategory === category ? brandColors.gold : data.color }}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{category}</p>
                        <p className="text-xs text-gray-400">{data.templates.length} templates</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-3">
              {selectedCategory ? (
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">{selectedCategory} Templates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {businessCategories[selectedCategory].templates.map(template => (
                      <div 
                        key={template}
                        className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-yellow-400/50 transition-all cursor-pointer group"
                        onClick={() => {
                          setSelectedTemplate(template);
                          setCurrentView('builder');
                          addNotification(`Loading ${template} template...`, 'info');
                        }}
                      >
                        <h4 className="font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">{template}</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-400">4.{Math.floor(Math.random() * 4) + 6}/5</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Pro</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Select a Category</h3>
                  <p className="text-gray-400">Choose a business category to explore our professional templates</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {currentView === 'builder' && (
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">AI Prompt Builder</h2>
              <p className="text-gray-400">Create and optimize prompts with advanced AI assistance</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <Edit className="w-5 h-5 mr-2" style={{ color: brandColors.gold }} />
                    Your Prompt
                  </h3>
                  {selectedTemplate && (
                    <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: `${brandColors.gold}20`, color: brandColors.gold }}>
                      {selectedTemplate}
                    </span>
                  )}
                </div>
                
                <textarea 
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="Enter your prompt here, or select a template to get started..."
                  className="w-full h-64 p-4 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                />
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{userPrompt.length} characters</span>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-sm text-green-400">Optimal length</span>
                  </div>
                  
                  <button 
                    onClick={handleOptimizePrompt}
                    disabled={!userPrompt.trim() || isOptimizing}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-6 py-2 rounded-lg font-semibold text-white hover:from-yellow-500 hover:to-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isOptimizing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Optimizing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Optimize with AI
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-400" />
                  AI Optimized Result
                </h3>
                
                {optimizedPrompt ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                      <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono">
                        {optimizedPrompt}
                      </pre>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all">
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all">
                          <Bookmark className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all">
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm font-semibold" style={{ color: brandColors.gold }}>
                          96% Performance
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <Brain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2">AI Ready to Optimize</h4>
                    <p className="text-gray-400">Enter a prompt and click "Optimize with AI" to see the magic happen</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-blue-400" />
                AI Insights & Suggestions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold text-blue-400 mb-2">Clarity Score</h4>
                  <div className="text-2xl font-bold text-white">8.7/10</div>
                  <p className="text-xs text-gray-400 mt-1">Very clear instructions</p>
                </div>
                
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <h4 className="font-semibold text-green-400 mb-2">Specificity</h4>
                  <div className="text-2xl font-bold text-white">9.2/10</div>
                  <p className="text-xs text-gray-400 mt-1">Highly specific</p>
                </div>
                
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <h4 className="font-semibold text-purple-400 mb-2">AI Compatibility</h4>
                  <div className="text-2xl font-bold text-white">9.6/10</div>
                  <p className="text-xs text-gray-400 mt-1">Excellent format</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-white mb-3">Suggested Improvements:</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3 p-3 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: brandColors.gold }}></div>
                    <p className="text-sm text-gray-300">Add specific output format requirements for better structure</p>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-300">Include examples to guide AI behavior more effectively</p>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-300">Consider adding context about target audience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div>
        <HomePage />
        {showLogin && <LoginModal />}
      </div>
    );
  }

  return <Dashboard />;
};

export default PerfectPromptBuilder;
