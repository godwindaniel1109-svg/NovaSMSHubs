import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Globe, Zap, CheckCircle, Users, DollarSign, MessageCircle, Facebook, Instagram, Twitter, Menu, X, Star, ArrowRight, Lock, Headphones, TrendingUp, Award, ChevronRight, Sparkles, BarChart3, Clock, ShieldCheck } from 'lucide-react';
import Logo from './Logo';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-nova-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-nova-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100/50 shadow-sm">
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
              <button className="bg-gradient-to-r from-nova-primary to-nova-secondary text-black px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
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
              <a href="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-nova-primary transition-colors py-2">
                <Shield className="w-4 h-4" />
                <span>Buy Number</span>
              </a>
              <button className="bg-nova-primary text-black px-6 py-2 rounded-full font-semibold hover:bg-nova-secondary transition-colors mt-2 w-full">
                Sign Up
              </button>
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
                <span className="bg-gradient-to-r from-nova-primary to-nova-secondary bg-clip-text text-transparent">Trusted by 50,000+ users worldwide</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-slide-in-right">
                <span className="text-gray-900">Verify more for</span>
                <br />
                <span className="bg-gradient-to-r from-nova-primary via-nova-secondary to-nova-accent bg-clip-text text-transparent animate-pulse">
                  less with NovaSMSHub
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in delay-200">
                Protect your online identity with premium virtual phone numbers. Fast, reliable, and secure SMS verification for all your favorite platforms.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in delay-300">
                <button className="group bg-gradient-to-r from-nova-primary to-nova-secondary text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                  <Link to="/dashboard" className="text-inherit no-underline flex items-center justify-center relative z-10">
                    <span>Buy Number</span>
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
                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium">Instant Delivery</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-nova-primary/10 rounded-full flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                    <DollarSign className="w-4 h-4 text-nova-primary" />
                  </div>
                  <span className="font-medium">From ₦500</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-nova-primary mr-1" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-gradient-to-br from-nova-primary/10 to-nova-secondary/10 p-8 rounded-3xl">
                <img 
                  src="/images/looking%20sms.png" 
                  alt="SMS Verification" 
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold">Live Verification</span>
                  </div>
                </div>
                <div className="absolute top-4 -left-4 bg-nova-primary text-black px-4 py-2 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-bold">Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive SMS Verification
              <span className="block bg-gradient-to-r from-nova-primary to-nova-secondary bg-clip-text text-transparent">
                Services for Every Need
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From social media to business platforms, we've got you covered with reliable SMS verification solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-nova-primary/5 to-nova-secondary/5 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-nova-primary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Social Media Verification</h3>
              <p className="text-gray-600 mb-4">Verify WhatsApp, Instagram, Facebook, Twitter, and all major social platforms instantly.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-nova-primary mr-2" />WhatsApp</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-nova-primary mr-2" />Instagram</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-nova-primary mr-2" />Facebook</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-nova-primary mr-2" />Twitter/X</li>
              </ul>
            </div>

            <div className="group bg-gradient-to-br from-nova-secondary/5 to-nova-primary/5 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-nova-secondary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Business Services</h3>
              <p className="text-gray-600 mb-4">Professional verification for business platforms and services worldwide.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-nova-secondary mr-2" />Google Voice</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-nova-secondary mr-2" />PayPal</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-nova-secondary mr-2" />Banking Apps</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-nova-secondary mr-2" />E-commerce</li>
              </ul>
            </div>

            <div className="group bg-gradient-to-br from-nova-accent/5 to-nova-primary/5 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-nova-accent w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy Protection</h3>
              <p className="text-gray-600 mb-4">Keep your personal number private while enjoying all online services.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-nova-accent mr-2" />Anonymous Verification</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-nova-accent mr-2" />No Data Tracking</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-nova-accent mr-2" />Secure Platform</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-nova-accent mr-2" />GDPR Compliant</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Transparent Pricing
              <span className="block bg-gradient-to-r from-nova-primary to-nova-secondary bg-clip-text text-transparent">
                No Hidden Fees
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Start with just ₦500. Our prices never fluctuate, even during high demand!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <div className="text-4xl font-bold text-nova-primary mb-2">₦500<span className="text-lg text-gray-600">/number</span></div>
                <p className="text-gray-600">Perfect for occasional use</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-nova-primary mr-3 mt-0.5 flex-shrink-0" /><span>1-5 verifications</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-nova-primary mr-3 mt-0.5 flex-shrink-0" /><span>Basic support</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-nova-primary mr-3 mt-0.5 flex-shrink-0" /><span>50+ countries</span></li>
              </ul>
              <button className="w-full bg-nova-primary text-black py-3 rounded-full font-semibold hover:bg-nova-secondary transition-colors">
                <Link to="/register" className="text-inherit no-underline">Get Started</Link>
              </button>
            </div>

            <div className="bg-gradient-to-br from-nova-primary to-nova-secondary p-8 rounded-2xl shadow-xl transform scale-105">
              <div className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-semibold inline-block mb-4">Most Popular</div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                <div className="text-4xl font-bold text-white mb-2">₦350<span className="text-lg text-white/80">/number</span></div>
                <p className="text-white/90">Best value for regular users</p>
              </div>
              <ul className="space-y-3 mb-8 text-white">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" /><span>6-50 verifications</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" /><span>Priority support</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" /><span>100+ countries</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" /><span>API access</span></li>
              </ul>
              <button className="w-full bg-white text-nova-primary py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                <Link to="/register" className="text-inherit no-underline">Choose Plan</Link>
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-nova-secondary mb-2">₦250<span className="text-lg text-gray-600">/number</span></div>
                <p className="text-gray-600">For high-volume needs</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-nova-secondary mr-3 mt-0.5 flex-shrink-0" /><span>50+ verifications</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-nova-secondary mr-3 mt-0.5 flex-shrink-0" /><span>24/7 dedicated support</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-nova-secondary mr-3 mt-0.5 flex-shrink-0" /><span>150+ countries</span></li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-nova-secondary mr-3 mt-0.5 flex-shrink-0" /><span>Custom API</span></li>
              </ul>
              <button className="w-full bg-nova-secondary text-black py-3 rounded-full font-semibold hover:bg-nova-primary transition-colors">
                <Link to="/register" className="text-inherit no-underline">Contact Sales</Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-nova-primary/5 to-nova-secondary/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Our Users Say
              <span className="block bg-gradient-to-r from-nova-primary to-nova-secondary bg-clip-text text-transparent">
                Trusted by Thousands
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who trust NovaSMSHub for their verification needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"NovaSMSHub has been a game-changer for my online business. Fast, reliable, and affordable verification services."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-nova-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                  JD
                </div>
                <div>
                  <div className="font-semibold text-gray-900">John Doe</div>
                  <div className="text-sm text-gray-600">Business Owner</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"I love how I can protect my privacy while still accessing all online services. The numbers work perfectly every time!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-nova-secondary rounded-full flex items-center justify-center text-white font-bold mr-4">
                  SM
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Miller</div>
                  <div className="text-sm text-gray-600">Digital Marketer</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"The best SMS verification service I've used. Great prices, instant delivery, and excellent customer support."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-nova-accent rounded-full flex items-center justify-center text-white font-bold mr-4">
                  MJ
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Michael Johnson</div>
                  <div className="text-sm text-gray-600">Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              By the Numbers
              <span className="block bg-gradient-to-r from-nova-primary to-nova-secondary bg-clip-text text-transparent">
                Our Impact in Numbers
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-nova-primary mb-2">50K+</div>
              <div className="text-gray-600 font-medium">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-nova-secondary mb-2">150+</div>
              <div className="text-gray-600 font-medium">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-nova-accent mb-2">1M+</div>
              <div className="text-gray-600 font-medium">Verifications</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-nova-success mb-2">99.9%</div>
              <div className="text-gray-600 font-medium">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-nova-primary/10 to-nova-secondary/10">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <img 
                  src="/images/neil.jpg" 
                  alt="Trust Element" 
                  className="w-full h-64 lg:h-96 object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <Award className="w-8 h-8 text-nova-primary" />
                    <div>
                      <div className="font-bold text-gray-900">Trusted Platform</div>
                      <div className="text-sm text-gray-600">Since 2020</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center bg-nova-primary/10 text-nova-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <TrendingUp className="w-4 h-4 mr-2" />
                Industry Leader
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Trusted by over <span className="bg-gradient-to-r from-nova-primary to-nova-secondary bg-clip-text text-transparent">50,000 clients</span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-8">
                Our numbers start at 2 cents each, and our prices never fluctuate, even during high demand! We provide the most reliable SMS verification service in the market.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-nova-primary w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Get A Number For As Low As ₦500</h4>
                    <p className="text-gray-600">Affordable pricing for everyone, with no hidden fees.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-nova-secondary w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">100% Secure & Private</h4>
                    <p className="text-gray-600">Your data is protected with enterprise-grade security.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-nova-accent w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Headphones className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">24/7 Customer Support</h4>
                    <p className="text-gray-600">We're here to help you anytime, anywhere.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-nova-navy text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white/10 backdrop-blur-sm p-12 rounded-3xl border border-white/20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Get started for free</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
              Join thousands of users who trust NovaSMSHub for secure and reliable SMS verification. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-white text-nova-navy px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                <Link to="/register" className="text-inherit no-underline">Start for Free</Link>
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-nova-navy transition-all">
                <Link to="/dashboard" className="text-inherit no-underline">View Numbers</Link>
              </button>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-white/80">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>No setup fee</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Logo size="small" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-nova-primary to-nova-secondary bg-clip-text text-transparent">
                  NovaSMSHub
                </h3>
              </div>
              <p className="text-gray-400 mb-6">
                We are trusted by over 50,000+ clients. Join them now and grow your business with secure SMS verification.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-nova-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-nova-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-nova-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://t.me/Primesmshub" className="text-gray-400 hover:text-nova-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/login" className="text-gray-400 hover:text-nova-primary transition-colors">Login</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-nova-primary transition-colors">Register</Link></li>
                <li><Link to="/dashboard" className="text-gray-400 hover:text-nova-primary transition-colors">Buy Number</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-nova-primary transition-colors">API Docs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-nova-primary transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-nova-primary transition-colors">Social Media Verification</a></li>
                <li><a href="#" className="text-gray-400 hover:text-nova-primary transition-colors">Business Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-nova-primary transition-colors">Privacy Protection</a></li>
                <li><a href="#" className="text-gray-400 hover:text-nova-primary transition-colors">API Integration</a></li>
                <li><a href="#" className="text-gray-400 hover:text-nova-primary transition-colors">Bulk Orders</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://t.me/Primesmshub" className="flex items-center space-x-2 text-gray-400 hover:text-nova-primary transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>Telegram Support</span>
                  </a>
                </li>
                <li><a href="#" className="text-gray-400 hover:text-nova-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-nova-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-nova-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 NovaSMSHub. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-nova-primary transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-nova-primary transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-nova-primary transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
