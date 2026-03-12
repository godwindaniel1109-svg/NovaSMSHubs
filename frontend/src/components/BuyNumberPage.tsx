import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowRight, 
  AlertCircle, 
  CheckCircle, 
  Loader, 
  Clock, 
  Phone, 
  Globe, 
  CreditCard,
  RefreshCw,
  Eye,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useNotify } from './NotificationSystem';
import apiService from '../services/apiService';

interface Country {
  code: string;
  name: string;
  mobileCode: string;
}

interface Service {
  id: string;
  name: string;
  price: number;
  phone: string;
  available: boolean;
  code: string;
  country: string;
}

interface Order {
  phoneNumber: string;
  code: string;
  service: string;
  timer: string;
  id: string;
  date: string;
  price: string;
  status: string;
  ac: string;
}

const BuyNumberPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('187'); // Default to USA
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'services' | 'orders'>('services');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const notify = useNotify();

  // Load data from API
  useEffect(() => {
    loadCountries();
    loadServices();
    loadOrders();
  }, []);

  const loadCountries = async () => {
    const result = await apiService.getCountries();
    if (result.success && result.data) {
      setCountries(result.data);
    }
  };

  const loadServices = async () => {
    const result = await apiService.getServicesByCountry(selectedCountry);
    if (result.success && result.data) {
      setServices(result.data);
    }
  };

  const loadOrders = async () => {
    const result = await apiService.getOrders();
    if (result.success && result.data) {
      setOrders(result.data);
    }
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    await Promise.all([loadServices(), loadOrders()]);
    setIsRefreshing(false);
    notify.success('Refreshed', 'Data has been refreshed');
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setError(null);
  };

  const handlePurchase = async () => {
    if (!selectedService) {
      setError('Please select a service');
      return;
    }

    const service = services.find(s => s.id === selectedService);
    if (!service) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await apiService.createOrder(selectedService, selectedCountry);
      
      if (result.success) {
        setSuccess(`Order placed successfully! Your order ID is: ${result.data?.order_id}`);
        setSelectedService('');
        setActiveTab('orders');
        
        // Refresh orders to show the new order
        await loadOrders();
        
        notify.success('Order Placed', `Your order ${result.data?.order_id} has been created successfully`);
      } else {
        setError(result.error || 'Failed to place order. Please try again.');
        notify.error('Order Failed', result.error || 'Unable to place your order. Please try again.');
      }
    } catch (err) {
      setError('Failed to place order. Please try again.');
      notify.error('Order Failed', 'Unable to place your order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number): string => {
    return `₦${amount.toLocaleString()}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    notify.success('Copied', 'Text copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buy Virtual Numbers</h1>
          <p className="text-gray-600">Get virtual numbers for SMS verification</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('services')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'services'
                    ? 'border-nova-primary text-nova-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Phone className="w-5 h-5 inline mr-2" />
                Available Services
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'orders'
                    ? 'border-nova-primary text-nova-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Clock className="w-5 h-5 inline mr-2" />
                Order History ({orders.length})
              </button>
              <button
                onClick={refreshData}
                disabled={isRefreshing}
                className="py-2 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 flex items-center"
              >
                <RefreshCw className={`w-4 h-4 inline mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </nav>
          </div>
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            {/* Country Selector */}
            <div className="mb-6 bg-white rounded-lg shadow-md border border-gray-200 p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Country</label>
              <select 
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  loadServices(); // Reload services for new country
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nova-primary focus:border-transparent"
              >
                {countries.map(country => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service: any) => (
                <div
                  key={service.id}
                  className={`bg-white rounded-lg shadow-md border-2 p-6 cursor-pointer transition-all ${
                    selectedService === service.id
                      ? 'border-nova-primary shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-nova-primary/10 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-nova-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-500">{service.short_name?.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">₦{service.converted_price?.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">per number</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <p>TTL: {service.ttl} seconds</p>
                      <p>Category: {service.category}</p>
                    </div>
                    <div className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Available
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Order Available</h3>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        PHONE NUMBER
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CODE
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SERVICE
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TIMER
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        DATE
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        PRICE
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        STATUS
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        AC
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order: any, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center space-x-2">
                            <span>{order.phone_number}</span>
                            <button
                              onClick={() => copyToClipboard(order.phone_number)}
                              className="text-nova-primary hover:text-nova-secondary"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.code || 'Pending'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.service_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.expires_at ? new Date(order.expires_at).toLocaleTimeString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.order_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₦{order.amount?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 0 ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 1 ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.status === 0 ? 'Pending' : order.status === 1 ? 'Complete' : 'Cancelled'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                          {order.status === 1 ? '✓' : '--'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Purchase Button */}
        {activeTab === 'services' && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-700">{success}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Complete Purchase</h3>
                  <p className="text-gray-600">
                    {selectedService 
                      ? `Selected: ${services.find((s: any) => s.id === selectedService)?.name} - ₦${services.find((s: any) => s.id === selectedService)?.converted_price?.toLocaleString() || 0}`
                      : 'Please select a service to continue'
                    }
                  </p>
                </div>
                
                <button
                  onClick={handlePurchase}
                  disabled={!selectedService || isLoading}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                    !selectedService || isLoading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-nova-primary text-black hover:bg-nova-secondary'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Purchase Number
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyNumberPage;
