import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Globe, Zap, CheckCircle, Users, DollarSign, MessageCircle, Facebook, Instagram, Twitter, Menu, X, Star, ArrowRight, Lock, Headphones, TrendingUp, Award, ChevronRight, Sparkles, BarChart3, Clock, ShieldCheck, MapPin, CreditCard, Calendar } from 'lucide-react';
import Logo from './Logo';
import { useLocalization } from '../contexts/LocalizationContext';

const LocalizedLandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { country, config, formatCurrency, formatDate, formatTime } = useLocalization();

  // Localized hero content
  const getLocalizedContent = () => {
    return {
      hero: {
        title: config.content.welcome,
        subtitle: config.content.tagline,
        description: 'Protect your online identity with premium virtual phone numbers. Fast, reliable, and secure SMS verification for all your favorite platforms.',
        features: [
          { icon: CheckCircle, text: 'Instant Delivery' },
          { icon: DollarSign, text: `From ${formatCurrency(500)}` },
          { icon: Headphones, text: config.features.supportHours }
        ]
      },
      stats: [
        { number: '50,000+', label: 'Users Worldwide' },
        { number: '500+', label: 'Countries Covered' },
        { number: '99.9%', label: 'Uptime' },
        { number: '24/7', label: 'Support' }
      ],
      quickActions: [
        {
          title: config.content.buyNumber,
          description: `Get numbers from ${config.features.popularCountries.join(', ')}`,
          icon: Globe,
          route: '/buy-number',
          color: 'from-nova-primary to-nova-secondary'
        },
        {
          title: 'Buy USA Number',
          description: 'Specialized USA numbers with fast delivery',
          icon: Shield,
          route: '/buy-usa-number',
          color: 'from-blue-500 to-blue-600'
        },
        {
          title: config.content.support,
          description: 'Chat with our support team',
          icon: MessageCircle,
          route: '/chat',
          color: 'from-purple-500 to-purple-600'
        }
      ]
    };
  };

  const localizedContent = getLocalizedContent();

  // Apply country-specific theme
  const getCountryTheme = () => {
    return {
      primary: config.theme.primary,
      secondary: config.theme.secondary,
      accent: config.theme.accent
    };
  };

  const theme = getCountryTheme();

  // Get localized payment methods
  const getLocalizedPaymentMethods = () => {
    return config.features.localPaymentMethods.map((method, index) => ({
      name: method,
      icon: index === 0 ? CreditCard : index === 1 ? DollarSign : Lock,
      popular: index === 0
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Country-specific animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: `${theme.primary}20` }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ backgroundColor: `${theme.secondary}20` }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Country indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-200 flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-900">{config.name}</span>
          <span className="text-xs text-gray-500">({country})</span>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-40 border-b border-gray-100/50 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Logo size="small" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-nova-primary to-nova-secondary bg-clip-text text-transparent">
                NovaSMSHub
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="flex items-center space-x-2 text-gray-700 hover:text-nova-primary transition-all duration-200 hover:scale-105">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">Features</span>
              </a>
              <a href="#pricing" className="flex items-center space-x-2 text-gray-700 hover:text-nova-primary transition-all duration-200 hover:scale-105">
                <DollarSign className="w-4 h-4" />
                <span className="font-medium">Pricing</span>
              </a>
              <a href="#testimonials" className="flex items-center space-x-2 text-gray-700 hover:text-nova-primary transition-all duration-200 hover:scale-105">
                <Users className="w-4 h-4" />
                <span className="font-medium">Testimonials</span>
              </a>
              <Link to="/login" className="flex items-center space-x-2 text-gray-700 hover:text-nova-primary transition-all duration-200 hover:scale-105">
                <Shield className="w-4 h-4" />
                <span className="font-medium">Login</span>
              </Link>
              <button 
                className="group bg-gradient-to-r from-nova-primary to-nova-secondary text-black px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                }}
              >
                <Link to="/register" className="text-inherit no-underline flex items-center space-x-2">
                  <span>Get Started</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <a href="#features" className="flex items-center space-x-2 text-gray-700 hover:text-nova-primary transition-colors py-2">
                <Sparkles className="w-4 h-4" />
                <span>Features</span>
              </a>
              <a href="#pricing" className="flex items-center space-x-2 text-gray-700 hover:text-nova-primary transition-colors py-2">
                <DollarSign className="w-4 h-4" />
                <span>Pricing</span>
              </a>
              <a href="#testimonials" className="flex items-center space-x-2 text-gray-700 hover:text-nova-primary transition-colors py-2">
                <Users className="w-4 h-4" />
                <span>Testimonials</span>
              </a>
              <Link to="/login" className="flex items-center space-x-2 text-gray-700 hover:text-nova-primary transition-colors py-2">
                <Shield className="w-4 h-4" />
                <span>Login</span>
              </Link>
              <Link to="/register" className="block text-center bg-nova-primary text-black px-6 py-2 rounded-full font-semibold hover:bg-nova-secondary transition-colors mt-4">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-nova-primary/5 via-white to-nova-secondary/5"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-nova-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-nova-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center bg-gradient-to-r from-nova-primary/20 to-nova-secondary/20 text-nova-primary px-6 py-3 rounded-full text-sm font-semibold backdrop-blur-sm border border-nova-primary/30 animate-fade-in">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="bg-gradient-to-r from-nova-primary to-nova-secondary bg-clip-text text-transparent">
                  Trusted by 50,000+ users worldwide
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-slide-in-right">
                <span className="text-gray-900">{localizedContent.hero.title}</span>
                <br />
                <span className="bg-gradient-to-r from-nova-primary via-nova-secondary to-nova-accent bg-clip-text text-transparent animate-pulse">
                  {localizedContent.hero.subtitle}
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in delay-200">
                {localizedContent.hero.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in delay-300">
                <button 
                  className="group bg-gradient-to-r text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                  }}
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                  <Link to="/dashboard" className="text-inherit no-underline flex items-center justify-center relative z-10">
                    <span>{config.content.buyNumber}</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </button>
                <button className="group border-2 border-nova-primary text-nova-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-nova-primary hover:text-black transition-all duration-300 relative overflow-hidden">
                  <span className="absolute inset-0 bg-nova-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <Link to="/register" className="text-inherit no-underline flex items-center justify-center relative z-10">
                    <span>Get Started Free</span>
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-600 animate-fade-in delay-400">
                {localizedContent.hero.features.map((feature, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-gradient-to-br from-nova-primary/10 to-nova-secondary/10 p-8 rounded-3xl">
                <div className="grid grid-cols-2 gap-4">
                  {localizedContent.stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Localized Payment Methods */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Methods Available in {config.name}</h2>
            <p className="text-lg text-gray-600">Choose from our secure and convenient payment options</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getLocalizedPaymentMethods().map((method, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-nova-primary/10 rounded-xl flex items-center justify-center">
                    <method.icon className="w-6 h-6 text-nova-primary" />
                  </div>
                  {method.popular && (
                    <span className="bg-nova-primary text-black text-xs px-2 py-1 rounded-full font-semibold">
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{method.name}</h3>
                <p className="text-sm text-gray-600">Secure and instant processing</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {localizedContent.quickActions.map((action, index) => (
              <Link 
                key={index}
                to={action.route}
                className={`group bg-gradient-to-r ${action.color} text-black rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl">{action.title}</h3>
                  <action.icon className="w-8 h-8 text-black/70" />
                </div>
                <p className="text-sm opacity-80 mb-4">{action.description}</p>
                <div className="flex items-center font-medium">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalizedLandingPage;
