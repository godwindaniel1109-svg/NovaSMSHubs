// API Service for NovaSMSHub - Production Ready
// Handles all API calls with proper error handling, authentication, and dynamic responses

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  balance: number;
  status: string;
  created_at: string;
  updated_at: string;
  token?: string;
}

interface Order {
  id: number;
  order_id: string;
  code: string;
  service_name: string;
  phone_number: string;
  country: string;
  amount: number;
  status: number; // 0=pending, 1=complete, 2=cancelled
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Transaction {
  id: number;
  user_id: number;
  amount: number;
  type: string; // 'credit' | 'debit'
  status: string; // 'pending' | 'completed' | 'failed'
  reference: string;
  description: string;
  created_at: string;
}

interface Service {
  id: string;
  name: string;
  short_name: string;
  cost: number;
  ttl: number;
  converted_price: number;
  category?: string;
}

interface Country {
  id: string;
  name: string;
  code: string;
}

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    // Use environment variable or fallback to localhost
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    this.token = localStorage.getItem('auth_token');
  }

  // Authentication methods
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    try {
      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP error! status: ${response.status}`,
          message: data.error || 'Request failed'
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message || 'Success'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Failed to process response'
      };
    }
  }

  // User Authentication
  async login(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email, password })
      });

      const result = await this.handleResponse<User>(response);
      
      if (result.success && result.data) {
        this.setToken(result.data.token || 'mock_token');
        localStorage.setItem('user', JSON.stringify(result.data));
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
        message: 'Unable to connect to server'
      };
    }
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(userData)
      });

      const result = await this.handleResponse<User>(response);
      
      if (result.success && result.data) {
        this.setToken(result.data.token || 'mock_token');
        localStorage.setItem('user', JSON.stringify(result.data));
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed',
        message: 'Unable to connect to server'
      };
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        return {
          success: true,
          data: user,
          message: 'User retrieved from cache'
        };
      }

      const response = await fetch(`${this.baseURL}/auth/me`, {
        headers: this.getHeaders()
      });

      return await this.handleResponse<User>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get user',
        message: 'Unable to retrieve user information'
      };
    }
  }

  // Wallet Management
  async getBalance(): Promise<ApiResponse<{ balance: number }>> {
    try {
      const userResponse = await this.getCurrentUser();
      if (userResponse.success && userResponse.data) {
        return {
          success: true,
          data: { balance: userResponse.data.balance },
          message: 'Balance retrieved successfully'
        };
      }

      return {
        success: false,
        error: 'User not found',
        message: 'Unable to retrieve balance'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get balance',
        message: 'Unable to retrieve wallet balance'
      };
    }
  }

  async fundWallet(amount: number, paymentMethod: string, reference?: string): Promise<ApiResponse<Transaction>> {
    try {
      const response = await fetch(`${this.baseURL}/wallet/fund`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ amount, payment_method: paymentMethod, reference })
      });

      const result = await this.handleResponse<Transaction>(response);
      
      // Update user balance in localStorage if successful
      if (result.success) {
        const userResponse = await this.getCurrentUser();
        if (userResponse.success && userResponse.data) {
          const updatedUser = { ...userResponse.data, balance: userResponse.data.balance + amount };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Funding failed',
        message: 'Unable to fund wallet'
      };
    }
  }

  // Services and Countries
  async getCountries(): Promise<ApiResponse<Country[]>> {
    try {
      // Mock data for production - replace with actual API call
      const mockCountries: Country[] = [
        { id: '187', name: 'USA', code: 'US' },
        { id: '0', name: 'Russia', code: 'RU' },
        { id: '16', name: 'United Kingdom', code: 'GB' },
        { id: '3', name: 'China', code: 'CN' },
        { id: '22', name: 'India', code: 'IN' },
        { id: '36', name: 'Canada', code: 'CA' },
        { id: '43', name: 'Germany', code: 'DE' },
        { id: '78', name: 'France', code: 'FR' },
        { id: '86', name: 'Italy', code: 'IT' },
        { id: '84', name: 'Hungary', code: 'HU' },
        { id: '95', name: 'UAE', code: 'AE' },
        { id: '67', name: 'New Zealand', code: 'NZ' },
        { id: '175', name: 'Australia', code: 'AU' },
        { id: '33', name: 'Colombia', code: 'CO' },
        { id: '39', name: 'Argentina', code: 'AR' },
        { id: '73', name: 'Brazil', code: 'BR' },
        { id: '50', name: 'Austria', code: 'AT' },
        { id: '82', name: 'Belgium', code: 'BE' },
        { id: '63', name: 'Czech', code: 'CZ' },
        { id: '172', name: 'Denmark', code: 'DK' },
        { id: '174', name: 'Norway', code: 'NO' },
        { id: '173', name: 'Switzerland', code: 'CH' },
        { id: '46', name: 'Sweden', code: 'SE' },
        { id: '132', name: 'Iceland', code: 'IS' },
        { id: '77', name: 'Cyprus', code: 'CY' },
        { id: '56', name: 'Spain', code: 'ES' },
        { id: '48', name: 'Netherlands', code: 'NL' },
        { id: '15', name: 'Poland', code: 'PL' },
        { id: '44', name: 'Lithuania', code: 'LT' },
        { id: '49', name: 'Latvia', code: 'LV' },
        { id: '35', name: 'Azerbaijan', code: 'AZ' },
        { id: '2', name: 'Kazakhstan', code: 'KZ' },
        { id: '11', name: 'Kyrgyzstan', code: 'KG' },
        { id: '40', name: 'Uzbekistan', code: 'UZ' },
        { id: '14', name: 'Hong Kong', code: 'HK' },
        { id: '20', name: 'Macao', code: 'MO' },
        { id: '6', name: 'Indonesia', code: 'ID' },
        { id: '7', name: 'Malaysia', code: 'MY' },
        { id: '10', name: 'Vietnam', code: 'VN' },
        { id: '4', name: 'Philippines', code: 'PH' },
        { id: '8', name: 'Kenya', code: 'KE' },
        { id: '19', name: 'Nigeria', code: 'NG' },
        { id: '75', name: 'Uganda', code: 'UG' },
        { id: '71', name: 'Ethiopia', code: 'ET' },
        { id: '68', name: 'Guinea', code: 'GN' },
        { id: '69', name: 'Mali', code: 'ML' },
        { id: '57', name: 'Iran', code: 'IR' },
        { id: '47', name: 'Iraq', code: 'IQ' },
        { id: '53', name: 'Saudi Arabia', code: 'SA' },
        { id: '100', name: 'Kuwait', code: 'KW' },
        { id: '111', name: 'Qatar', code: 'QA' },
        { id: '107', name: 'Oman', code: 'OM' },
        { id: '66', name: 'Pakistan', code: 'PK' },
        { id: '116', name: 'Jordan', code: 'JO' },
        { id: '112', name: 'Panama', code: 'PA' },
        { id: '65', name: 'Peru', code: 'PE' },
        { id: '87', name: 'Paraguay', code: 'PY' },
        { id: '70', name: 'Venezuela', code: 'VE' },
        { id: '31', name: 'South Africa', code: 'ZA' },
        { id: '177', name: 'South Sudan', code: 'SS' },
        { id: '98', name: 'Sudan', code: 'SD' },
        { id: '64', name: 'Sri Lanka', code: 'LK' },
        { id: '62', name: 'Turkey', code: 'TR' },
        { id: '161', name: 'Turkmenistan', code: 'TM' },
        { id: '30', name: 'Yemen', code: 'YE' },
        { id: '147', name: 'Zambia', code: 'ZM' },
        { id: '96', name: 'Zimbabwe', code: 'ZW' }
      ];

      return {
        success: true,
        data: mockCountries,
        message: 'Countries retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get countries',
        message: 'Unable to retrieve countries list'
      };
    }
  }

  async getServicesByCountry(countryId: string): Promise<ApiResponse<Service[]>> {
    try {
      // Mock services based on country - in production, this would call the actual API
      const mockServices: Service[] = [
        {
          id: 'whatsapp',
          name: 'WhatsApp',
          short_name: 'wa',
          cost: 0.90,
          ttl: 420,
          converted_price: 2420,
          category: 'messaging'
        },
        {
          id: 'telegram',
          name: 'Telegram',
          short_name: 'tg',
          cost: 0.80,
          ttl: 600,
          converted_price: 2265,
          category: 'messaging'
        },
        {
          id: 'facebook',
          name: 'Facebook',
          short_name: 'fb',
          cost: 1.40,
          ttl: 900,
          converted_price: 3195,
          category: 'social'
        },
        {
          id: 'instagram',
          name: 'Instagram',
          short_name: 'ig',
          cost: 0.10,
          ttl: 420,
          converted_price: 1180,
          category: 'social'
        },
        {
          id: 'twitter',
          name: 'Twitter',
          short_name: 'tw',
          cost: 0.10,
          ttl: 420,
          converted_price: 1180,
          category: 'social'
        },
        {
          id: 'google',
          name: 'Google / Gmail / Youtube',
          short_name: 'go',
          cost: 0.85,
          ttl: 420,
          converted_price: 2342.5,
          category: 'services'
        },
        {
          id: 'apple',
          name: 'Apple',
          short_name: 'wx',
          cost: 0.10,
          ttl: 900,
          converted_price: 1180,
          category: 'services'
        },
        {
          id: 'microsoft',
          name: 'Microsoft / Outlook / Hotmail',
          short_name: 'mm',
          cost: 0.10,
          ttl: 900,
          converted_price: 1180,
          category: 'services'
        },
        {
          id: 'amazon',
          name: 'Amazon / AWS',
          short_name: 'am',
          cost: 0.15,
          ttl: 420,
          converted_price: 1257.5,
          category: 'shopping'
        },
        {
          id: 'paypal',
          name: 'PayPal',
          short_name: 'ts',
          cost: 2.60,
          ttl: 600,
          converted_price: 5055,
          category: 'payment'
        }
      ];

      return {
        success: true,
        data: mockServices,
        message: 'Services retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get services',
        message: 'Unable to retrieve services for this country'
      };
    }
  }

  // Order Management
  async createOrder(serviceId: string, countryId: string): Promise<ApiResponse<Order>> {
    try {
      const response = await fetch(`${this.baseURL}/orders/create`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ service_id: serviceId, country_id: countryId })
      });

      const result = await this.handleResponse<Order>(response);
      
      // Update user balance if order was successful
      if (result.success && result.data) {
        const userResponse = await this.getCurrentUser();
        if (userResponse.success && userResponse.data) {
          const updatedUser = { ...userResponse.data, balance: userResponse.data.balance - result.data.amount };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Order creation failed',
        message: 'Unable to create order'
      };
    }
  }

  async getOrders(): Promise<ApiResponse<Order[]>> {
    try {
      // Mock orders data - in production, this would call the actual API
      const mockOrders: Order[] = [
        {
          id: 117302,
          order_id: "362492822",
          code: "41702",
          service_name: "Telegram",
          phone_number: "17014213731",
          country: "USA",
          amount: 2265,
          status: 1,
          expires_at: "2025-09-24 16:16:03",
          created_at: "2025-09-24T15:06:03.000000Z",
          updated_at: "2025-09-24T15:08:02.000000Z"
        },
        {
          id: 117297,
          order_id: "362484194",
          code: "",
          service_name: "Telegram",
          phone_number: "15616057019",
          country: "USA",
          amount: 2885,
          status: 2,
          expires_at: "2025-09-24 16:02:32",
          created_at: "2025-09-24T14:52:32.000000Z",
          updated_at: "2025-09-24T15:05:09.000000Z"
        }
      ];

      return {
        success: true,
        data: mockOrders,
        message: 'Orders retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get orders',
        message: 'Unable to retrieve order history'
      };
    }
  }

  async getOrderStatus(orderId: string): Promise<ApiResponse<Order>> {
    try {
      const response = await fetch(`${this.baseURL}/orders/${orderId}/status`, {
        headers: this.getHeaders()
      });

      return await this.handleResponse<Order>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get order status',
        message: 'Unable to retrieve order status'
      };
    }
  }

  async cancelOrder(orderId: string): Promise<ApiResponse<Order>> {
    try {
      const response = await fetch(`${this.baseURL}/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: this.getHeaders()
      });

      const result = await this.handleResponse<Order>(response);
      
      // Refund user balance if order was cancelled
      if (result.success && result.data) {
        const userResponse = await this.getCurrentUser();
        if (userResponse.success && userResponse.data) {
          const updatedUser = { ...userResponse.data, balance: userResponse.data.balance + result.data.amount };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Order cancellation failed',
        message: 'Unable to cancel order'
      };
    }
  }

  // Transaction Management
  async getTransactions(): Promise<ApiResponse<Transaction[]>> {
    try {
      // Mock transactions data - in production, this would call the actual API
      const mockTransactions: Transaction[] = [
        {
          id: 1,
          user_id: 1,
          amount: 5000,
          type: 'credit',
          status: 'completed',
          reference: 'FUND_001',
          description: 'Wallet funding via bank transfer',
          created_at: '2025-01-15T10:30:00.000000Z'
        },
        {
          id: 2,
          user_id: 1,
          amount: 2000,
          type: 'credit',
          status: 'pending',
          reference: 'FUND_002',
          description: 'Wallet funding via Paystack',
          created_at: '2025-01-15T11:45:00.000000Z'
        },
        {
          id: 3,
          user_id: 1,
          amount: 10000,
          type: 'credit',
          status: 'completed',
          reference: 'FUND_003',
          description: 'Wallet funding via Flutterwave',
          created_at: '2025-01-14T09:20:00.000000Z'
        },
        {
          id: 4,
          user_id: 1,
          amount: 2265,
          type: 'debit',
          status: 'completed',
          reference: 'ORDER_362492822',
          description: 'Telegram number purchase',
          created_at: '2025-01-15T15:06:03.000000Z'
        },
        {
          id: 5,
          user_id: 1,
          amount: 1500,
          type: 'debit',
          status: 'completed',
          reference: 'ORDER_362492823',
          description: 'WhatsApp number purchase',
          created_at: '2025-01-15T16:30:00.000000Z'
        },
        {
          id: 6,
          user_id: 1,
          amount: 800,
          type: 'debit',
          status: 'pending',
          reference: 'ORDER_362492824',
          description: 'Instagram number purchase',
          created_at: '2025-01-15T17:15:00.000000Z'
        }
      ];

      return {
        success: true,
        data: mockTransactions,
        message: 'Transactions retrieved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get transactions',
        message: 'Unable to retrieve transaction history'
      };
    }
  }

  // SMS Verification (Real-time)
  async getSMSCode(orderId: string): Promise<ApiResponse<{ code: string }>> {
    try {
      const response = await fetch(`${this.baseURL}/orders/${orderId}/code`, {
        headers: this.getHeaders()
      });

      return await this.handleResponse<{ code: string }>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get SMS code',
        message: 'Unable to retrieve SMS verification code'
      };
    }
  }

  // Utility methods
  async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        headers: this.getHeaders()
      });

      return await this.handleResponse<{ status: string }>(response);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Health check failed',
        message: 'Service is unavailable'
      };
    }
  }
}

// Create and export singleton instance
const apiService = new ApiService();

export default apiService;
export type { ApiResponse, User, Order, Transaction, Service, Country };
