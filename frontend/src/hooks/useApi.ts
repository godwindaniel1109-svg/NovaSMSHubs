import { useState, useEffect, useCallback } from 'react';
import apiService, { ApiResponse } from '../services/apiService';
import type { User, Order, Transaction, Service, Country } from '../services/apiService';

// Generic API hook for loading states and error handling
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.error || response.message || 'Request failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Authentication hook
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.login(email, password);
      
      if (response.success && response.data) {
        setUser(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.error || response.message || 'Login failed');
        return { success: false, error: response.error || response.message };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.register(userData);
      
      if (response.success && response.data) {
        setUser(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.error || response.message || 'Registration failed');
        return { success: false, error: response.error || response.message };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    apiService.clearToken();
    setUser(null);
    setError(null);
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.getCurrentUser();
      
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { user, loading, error, login, register, logout, checkAuth };
}

// Wallet hook
export function useWallet() {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBalance = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getBalance();
      
      if (response.success && response.data) {
        setBalance(response.data.balance);
      } else {
        setError(response.error || response.message || 'Failed to get balance');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get balance');
    } finally {
      setLoading(false);
    }
  }, []);

  const fundWallet = useCallback(async (amount: number, paymentMethod: string, reference?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.fundWallet(amount, paymentMethod, reference);
      
      if (response.success) {
        // Update balance after successful funding
        await getBalance();
        return { success: true, data: response.data };
      } else {
        setError(response.error || response.message || 'Funding failed');
        return { success: false, error: response.error || response.message };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Funding failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [getBalance]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return { balance, loading, error, getBalance, fundWallet };
}

// Orders hook
export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getOrders();
      
      if (response.success && response.data) {
        setOrders(response.data);
      } else {
        setError(response.error || response.message || 'Failed to get orders');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get orders');
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (serviceId: string, countryId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.createOrder(serviceId, countryId);
      
      if (response.success && response.data) {
        // Refresh orders after creating new one
        await getOrders();
        return { success: true, data: response.data };
      } else {
        setError(response.error || response.message || 'Failed to create order');
        return { success: false, error: response.error || response.message };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create order';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [getOrders]);

  const cancelOrder = useCallback(async (orderId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.cancelOrder(orderId);
      
      if (response.success) {
        // Refresh orders after cancellation
        await getOrders();
        return { success: true, data: response.data };
      } else {
        setError(response.error || response.message || 'Failed to cancel order');
        return { success: false, error: response.error || response.message };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel order';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [getOrders]);

  const getOrderStatus = useCallback(async (orderId: string) => {
    try {
      const response = await apiService.getOrderStatus(orderId);
      return response;
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to get order status',
        message: 'Unable to retrieve order status'
      };
    }
  }, []);

  const getSMSCode = useCallback(async (orderId: string) => {
    try {
      const response = await apiService.getSMSCode(orderId);
      return response;
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to get SMS code',
        message: 'Unable to retrieve SMS verification code'
      };
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return { orders, loading, error, getOrders, createOrder, cancelOrder, getOrderStatus, getSMSCode };
}

// Transactions hook
export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getTransactions();
      
      if (response.success && response.data) {
        setTransactions(response.data);
      } else {
        setError(response.error || response.message || 'Failed to get transactions');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get transactions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return { transactions, loading, error, getTransactions };
}

// Services hook
export function useServices() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCountries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getCountries();
      
      if (response.success && response.data) {
        setCountries(response.data);
      } else {
        setError(response.error || response.message || 'Failed to get countries');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get countries');
    } finally {
      setLoading(false);
    }
  }, []);

  const getServicesByCountry = useCallback(async (countryId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getServicesByCountry(countryId);
      
      if (response.success && response.data) {
        setServices(response.data);
      } else {
        setError(response.error || response.message || 'Failed to get services');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get services');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  return { countries, services, loading, error, getCountries, getServicesByCountry };
}

// Real-time order tracking hook
export function useOrderTracking(orderId: string | null) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trackOrder = useCallback(async () => {
    if (!orderId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getOrderStatus(orderId);
      
      if (response.success && response.data) {
        setOrder(response.data);
      } else {
        setError(response.error || response.message || 'Failed to track order');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track order');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) {
      trackOrder();
      // Set up polling for real-time updates
      const interval = setInterval(trackOrder, 5000); // Poll every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [orderId, trackOrder]);

  return { order, loading, error, trackOrder };
}

// Health check hook
export function useHealthCheck() {
  const [isHealthy, setIsHealthy] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.healthCheck();
      
      setIsHealthy(response.success);
      if (!response.success) {
        setError(response.error || response.message || 'Service unavailable');
      }
    } catch (err) {
      setIsHealthy(false);
      setError(err instanceof Error ? err.message : 'Health check failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
    // Set up periodic health checks
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, [checkHealth]);

  return { isHealthy, loading, error, checkHealth };
}
