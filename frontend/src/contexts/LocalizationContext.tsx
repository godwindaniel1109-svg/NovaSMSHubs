import React, { createContext, useContext, useState, useEffect } from 'react';

// Country configurations with localized content and themes
const countryConfigs = {
  US: {
    name: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    language: 'en',
    theme: {
      primary: '#3B82F6',
      secondary: '#10B981',
      accent: '#F59E0B'
    },
    content: {
      welcome: 'Welcome to NovaSMSHub',
      tagline: 'Verify more for less with NovaSMSHub',
      buyNumber: 'Buy Number',
      wallet: 'Wallet',
      support: 'Support'
    },
    features: {
      popularCountries: ['USA', 'UK', 'Canada', 'Australia'],
      localPaymentMethods: ['Credit Card', 'PayPal', 'Bank Transfer'],
      supportHours: '24/7 Support',
      timezone: 'EST'
    }
  },
  NG: {
    name: 'Nigeria',
    currency: 'NGN',
    currencySymbol: '₦',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    language: 'en',
    theme: {
      primary: '#059669',
      secondary: '#DC2626',
      accent: '#F59E0B'
    },
    content: {
      welcome: 'Welcome to NovaSMSHub',
      tagline: 'Verify more for less with NovaSMSHub',
      buyNumber: 'Buy Number',
      wallet: 'Wallet',
      support: 'Support'
    },
    features: {
      popularCountries: ['Nigeria', 'USA', 'UK', 'Ghana'],
      localPaymentMethods: ['Paystack', 'Flutterwave', 'Bank Transfer'],
      supportHours: '24/7 Support',
      timezone: 'WAT'
    }
  },
  UK: {
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    language: 'en',
    theme: {
      primary: '#6366F1',
      secondary: '#10B981',
      accent: '#F59E0B'
    },
    content: {
      welcome: 'Welcome to NovaSMSHub',
      tagline: 'Verify more for less with NovaSMSHub',
      buyNumber: 'Buy Number',
      wallet: 'Wallet',
      support: 'Support'
    },
    features: {
      popularCountries: ['UK', 'USA', 'Germany', 'France'],
      localPaymentMethods: ['Credit Card', 'PayPal', 'Bank Transfer'],
      supportHours: '9 AM - 6 PM GMT',
      timezone: 'GMT'
    }
  },
  IN: {
    name: 'India',
    currency: 'INR',
    currencySymbol: '₹',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    language: 'en',
    theme: {
      primary: '#E11D48',
      secondary: '#059669',
      accent: '#F59E0B'
    },
    content: {
      welcome: 'Welcome to NovaSMSHub',
      tagline: 'Verify more for less with NovaSMSHub',
      buyNumber: 'Buy Number',
      wallet: 'Wallet',
      support: 'Support'
    },
    features: {
      popularCountries: ['India', 'USA', 'UK', 'Australia'],
      localPaymentMethods: ['UPI', 'Credit Card', 'PayTM', 'Bank Transfer'],
      supportHours: '10 AM - 8 PM IST',
      timezone: 'IST'
    }
  },
  BR: {
    name: 'Brazil',
    currency: 'BRL',
    currencySymbol: 'R$',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    language: 'pt',
    theme: {
      primary: '#059669',
      secondary: '#DC2626',
      accent: '#F59E0B'
    },
    content: {
      welcome: 'Bem-vindo ao NovaSMSHub',
      tagline: 'Verifique mais por menos com NovaSMSHub',
      buyNumber: 'Comprar Número',
      wallet: 'Carteira',
      support: 'Suporte'
    },
    features: {
      popularCountries: ['Brazil', 'USA', 'Argentina', 'Mexico'],
      localPaymentMethods: ['Credit Card', 'PIX', 'Bank Transfer'],
      supportHours: '24/7 Suporte',
      timezone: 'BRT'
    }
  },
  CN: {
    name: 'China',
    currency: 'CNY',
    currencySymbol: '¥',
    dateFormat: 'YYYY/MM/DD',
    timeFormat: '24h',
    language: 'zh',
    theme: {
      primary: '#DC2626',
      secondary: '#059669',
      accent: '#F59E0B'
    },
    content: {
      welcome: '欢迎来到 NovaSMSHub',
      tagline: '用 NovaSMSHub 以更低的价格验证更多',
      buyNumber: '购买号码',
      wallet: '钱包',
      support: '支持'
    },
    features: {
      popularCountries: ['China', 'USA', 'Japan', 'Singapore'],
      localPaymentMethods: ['Alipay', 'WeChat Pay', 'Bank Transfer'],
      supportHours: '24/7 支持',
      timezone: 'CST'
    }
  }
};

interface LocalizationContextType {
  country: string;
  config: typeof countryConfigs.US;
  setCountry: (country: string) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
  formatTime: (date: Date) => string;
  detectCountry: () => Promise<string>;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [country, setCountry] = useState<string>('US');
  const [config, setConfig] = useState(countryConfigs.US);

  useEffect(() => {
    // Detect user's country on mount
    detectCountry().then(detectedCountry => {
      if (countryConfigs[detectedCountry as keyof typeof countryConfigs]) {
        setCountry(detectedCountry);
        setConfig(countryConfigs[detectedCountry as keyof typeof countryConfigs]);
      }
    });
  }, []);

  useEffect(() => {
    // Update config when country changes
    if (countryConfigs[country as keyof typeof countryConfigs]) {
      setConfig(countryConfigs[country as keyof typeof countryConfigs]);
    }
  }, [country]);

  const detectCountry = async (): Promise<string> => {
    try {
      // Method 1: Try IP geolocation API
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return data.country_code || 'US';
    } catch (error) {
      try {
        // Method 2: Fallback to another API
        const response = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=your_api_key');
        const data = await response.json();
        return data.country_code || 'US';
      } catch (error) {
        // Method 3: Use browser locale
        const locale = navigator.language || 'en-US';
        const localeCountry = locale.split('-')[1]?.toUpperCase();
        return countryConfigs[localeCountry as keyof typeof countryConfigs] ? localeCountry : 'US';
      }
    }
  };

  const formatCurrency = (amount: number): string => {
    return `${config.currencySymbol}${amount.toLocaleString()}`;
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    switch (config.dateFormat) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'YYYY/MM/DD':
        return `${year}/${month}/${day}`;
      default:
        return `${day}/${month}/${year}`;
    }
  };

  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    let period = '';
    
    if (config.timeFormat === '12h') {
      period = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12 || 12;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}${period}`;
  };

  const value: LocalizationContextType = {
    country,
    config,
    setCountry,
    formatCurrency,
    formatDate,
    formatTime,
    detectCountry
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export default countryConfigs;
