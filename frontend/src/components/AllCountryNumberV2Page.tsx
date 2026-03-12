import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, CheckCircle, Loader, RefreshCw, X, Clock, Phone, DollarSign, Globe } from 'lucide-react';

interface Country {
  id: string;
  name: string;
}

interface Service {
  name: string;
  short_name: string;
  cost: number;
  ttl: number;
  converted_price: number;
}

interface Order {
  id: number;
  order_id: string;
  code: string;
  service_name: string;
  phone_number: string;
  amount: number;
  status: number; // 1=complete, 2=cancelled, 0=pending
  expires_at: string;
  created_at: string;
}

const AllCountryNumberV2Page: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Countries data - extracted from your HTML
  const countries: Country[] = [
    { id: '74', name: 'Afghanistan' },
    { id: '155', name: 'Albania' },
    { id: '58', name: 'Algeria' },
    { id: '76', name: 'Angola' },
    { id: '181', name: 'Anguilla' },
    { id: '169', name: 'Antigua and Barbuda' },
    { id: '39', name: 'Argentina' },
    { id: '148', name: 'Armenia' },
    { id: '179', name: 'Aruba' },
    { id: '175', name: 'Australia' },
    { id: '50', name: 'Austria' },
    { id: '35', name: 'Azerbaijan' },
    { id: '122', name: 'Bahamas' },
    { id: '145', name: 'Bahrain' },
    { id: '60', name: 'Bangladesh' },
    { id: '118', name: 'Barbados' },
    { id: '51', name: 'Belarus' },
    { id: '82', name: 'Belgium' },
    { id: '124', name: 'Belize' },
    { id: '120', name: 'Benin' },
    { id: '158', name: 'Bhutan' },
    { id: '92', name: 'Bolivia' },
    { id: '108', name: 'Bosnia' },
    { id: '123', name: 'Botswana' },
    { id: '73', name: 'Brazil' },
    { id: '121', name: 'Brunei' },
    { id: '83', name: 'Bulgaria' },
    { id: '152', name: 'Burkina Faso' },
    { id: '119', name: 'Burundi' },
    { id: '24', name: 'Cambodia' },
    { id: '41', name: 'Cameroon' },
    { id: '36', name: 'Canada' },
    { id: '186', name: 'Cape Verde' },
    { id: '170', name: 'Cayman Islands' },
    { id: '125', name: 'Central African Republic' },
    { id: '42', name: 'Chad' },
    { id: '151', name: 'Chile' },
    { id: '3', name: 'China' },
    { id: '33', name: 'Colombia' },
    { id: '133', name: 'Comoros' },
    { id: '150', name: 'Congo' },
    { id: '93', name: 'Costa Rica' },
    { id: '45', name: 'Croatia' },
    { id: '113', name: 'Cuba' },
    { id: '77', name: 'Cyprus' },
    { id: '63', name: 'Czech' },
    { id: '18', name: 'DR Congo' },
    { id: '172', name: 'Denmark' },
    { id: '168', name: 'Djibouti' },
    { id: '126', name: 'Dominica' },
    { id: '109', name: 'Dominican Republic' },
    { id: '105', name: 'Ecuador' },
    { id: '21', name: 'Egypt' },
    { id: '167', name: 'Equatorial Guinea' },
    { id: '176', name: 'Eritrea' },
    { id: '34', name: 'Estonia' },
    { id: '71', name: 'Ethiopia' },
    { id: '189', name: 'Fiji' },
    { id: '163', name: 'Finland' },
    { id: '78', name: 'France' },
    { id: '162', name: 'French Guiana' },
    { id: '154', name: 'Gabon' },
    { id: '28', name: 'Gambia' },
    { id: '128', name: 'Georgia' },
    { id: '43', name: 'Germany' },
    { id: '38', name: 'Ghana' },
    { id: '201', name: 'Gibraltar' },
    { id: '129', name: 'Greece' },
    { id: '127', name: 'Grenada' },
    { id: '160', name: 'Guadeloupe' },
    { id: '94', name: 'Guatemala' },
    { id: '68', name: 'Guinea' },
    { id: '130', name: 'Guinea-Bissau' },
    { id: '131', name: 'Guyana' },
    { id: '26', name: 'Haiti' },
    { id: '88', name: 'Honduras' },
    { id: '14', name: 'Hong Kong' },
    { id: '84', name: 'Hungary' },
    { id: '132', name: 'Iceland' },
    { id: '22', name: 'India' },
    { id: '6', name: 'Indonesia' },
    { id: '57', name: 'Iran' },
    { id: '47', name: 'Iraq' },
    { id: '23', name: 'Ireland' },
    { id: '13', name: 'Israel' },
    { id: '86', name: 'Italy' },
    { id: '27', name: 'Ivory Coast' },
    { id: '103', name: 'Jamaica' },
    { id: '182', name: 'Japan' },
    { id: '116', name: 'Jordan' },
    { id: '2', name: 'Kazakhstan' },
    { id: '8', name: 'Kenya' },
    { id: '203', name: 'Kosovo' },
    { id: '100', name: 'Kuwait' },
    { id: '11', name: 'Kyrgyzstan' },
    { id: '25', name: 'Laos' },
    { id: '49', name: 'Latvia' },
    { id: '153', name: 'Lebanon' },
    { id: '136', name: 'Lesotho' },
    { id: '135', name: 'Liberia' },
    { id: '102', name: 'Libya' },
    { id: '44', name: 'Lithuania' },
    { id: '165', name: 'Luxembourg' },
    { id: '20', name: 'Macao' },
    { id: '17', name: 'Madagascar' },
    { id: '137', name: 'Malawi' },
    { id: '7', name: 'Malaysia' },
    { id: '159', name: 'Maldives' },
    { id: '69', name: 'Mali' },
    { id: '199', name: 'Malta' },
    { id: '114', name: 'Mauritania' },
    { id: '157', name: 'Mauritius' },
    { id: '54', name: 'Mexico' },
    { id: '85', name: 'Moldova' },
    { id: '144', name: 'Monaco' },
    { id: '72', name: 'Mongolia' },
    { id: '171', name: 'Montenegro' },
    { id: '180', name: 'Montserrat' },
    { id: '37', name: 'Morocco' },
    { id: '80', name: 'Mozambique' },
    { id: '5', name: 'Myanmar' },
    { id: '138', name: 'Namibia' },
    { id: '81', name: 'Nepal' },
    { id: '48', name: 'Netherlands' },
    { id: '185', name: 'New Caledonia' },
    { id: '67', name: 'New Zealand' },
    { id: '90', name: 'Nicaragua' },
    { id: '139', name: 'Niger' },
    { id: '19', name: 'Nigeria' },
    { id: '204', name: 'Niue' },
    { id: '183', name: 'North Macedonia' },
    { id: '174', name: 'Norway' },
    { id: '107', name: 'Oman' },
    { id: '66', name: 'Pakistan' },
    { id: '188', name: 'Palestine' },
    { id: '112', name: 'Panama' },
    { id: '79', name: 'Papua' },
    { id: '87', name: 'Paraguay' },
    { id: '65', name: 'Peru' },
    { id: '4', name: 'Philippines' },
    { id: '15', name: 'Poland' },
    { id: '117', name: 'Portugal' },
    { id: '97', name: 'Puerto Rico' },
    { id: '111', name: 'Qatar' },
    { id: '146', name: 'Reunion' },
    { id: '32', name: 'Romania' },
    { id: '0', name: 'Russia' },
    { id: '140', name: 'Rwanda' },
    { id: '134', name: 'Saint Kitts and Nevis' },
    { id: '164', name: 'Saint Lucia' },
    { id: '166', name: 'Saint Vincent and the Grenadines' },
    { id: '101', name: 'Salvador' },
    { id: '198', name: 'Samoa' },
    { id: '178', name: 'Sao Tome and Principe' },
    { id: '53', name: 'Saudi Arabia' },
    { id: '61', name: 'Senegal' },
    { id: '29', name: 'Serbia' },
    { id: '184', name: 'Seychelles' },
    { id: '115', name: 'Sierra Leone' },
    { id: '196', name: 'Singapore' },
    { id: '141', name: 'Slovakia' },
    { id: '59', name: 'Slovenia' },
    { id: '149', name: 'Somalia' },
    { id: '31', name: 'South Africa' },
    { id: '177', name: 'South Sudan' },
    { id: '56', name: 'Spain' },
    { id: '64', name: 'Sri Lanka' },
    { id: '98', name: 'Sudan' },
    { id: '142', name: 'Suriname' },
    { id: '106', name: 'Swaziland' },
    { id: '46', name: 'Sweden' },
    { id: '173', name: 'Switzerland' },
    { id: '110', name: 'Syria' },
    { id: '55', name: 'Taiwan' },
    { id: '143', name: 'Tajikistan' },
    { id: '9', name: 'Tanzania' },
    { id: '52', name: 'Thailand' },
    { id: '91', name: 'Timor-Leste' },
    { id: '99', name: 'Togo' },
    { id: '104', name: 'Trinidad and Tobago' },
    { id: '89', name: 'Tunisia' },
    { id: '62', name: 'Turkey' },
    { id: '161', name: 'Turkmenistan' },
    { id: '95', name: 'UAE' },
    { id: '187', name: 'USA' },
    { id: '75', name: 'Uganda' },
    { id: '1', name: 'Ukraine' },
    { id: '16', name: 'United Kingdom' },
    { id: '156', name: 'Uruguay' },
    { id: '40', name: 'Uzbekistan' },
    { id: '70', name: 'Venezuela' },
    { id: '10', name: 'Vietnam' },
    { id: '30', name: 'Yemen' },
    { id: '147', name: 'Zambia' },
    { id: '96', name: 'Zimbabwe' }
  ];

  // Mock API functions - replace with real API calls later
  const fetchServicesByCountry = async (countryId: string) => {
    setIsLoadingServices(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock services data
      const mockServices: Service[] = [
        {
          name: 'WhatsApp',
          short_name: 'wa',
          cost: 0.90,
          ttl: 420,
          converted_price: 2420
        },
        {
          name: 'Telegram',
          short_name: 'tg',
          cost: 0.80,
          ttl: 600,
          converted_price: 2265
        },
        {
          name: 'Facebook',
          short_name: 'fb',
          cost: 1.40,
          ttl: 900,
          converted_price: 3195
        },
        {
          name: 'Instagram',
          short_name: 'ig',
          cost: 0.10,
          ttl: 420,
          converted_price: 1180
        },
        {
          name: 'Twitter',
          short_name: 'tw',
          cost: 0.10,
          ttl: 420,
          converted_price: 1180
        }
      ];
      
      setServices(mockServices);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setIsLoadingServices(false);
    }
  };

  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock orders data
      const mockOrders: Order[] = [];
      setOrders(mockOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handlePurchase = async () => {
    if (!selectedCountry) {
      setErrorMessage('Please select a country first');
      return;
    }

    if (!selectedService) {
      setErrorMessage('Please select a service');
      return;
    }

    setIsPurchasing(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success response
      setSuccessMessage('Order processed successfully');
      setSelectedCountry('');
      setSelectedService('');
      setServices([]);
      
      // Refresh orders after successful purchase
      await fetchOrders();
    } catch (error) {
      setErrorMessage('Could not purchase number now, try again');
    } finally {
      setIsPurchasing(false);
    }
  };

  const formatTimeRemaining = (expiresAt: string, status: number) => {
    if (status === 1) return '0:00';
    if (status === 2 || status > 2) return 'Expired';
    
    const now = new Date().getTime();
    const expires = new Date(expiresAt).getTime();
    const distance = expires - now;

    if (distance < 0) return 'Expired';

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0:
        return 'bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full';
      case 1:
        return 'bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full';
      case 2:
        return 'bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full';
      default:
        return 'bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full';
    }
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return 'pending';
      case 1:
        return 'complete';
      case 2:
        return 'cancelled';
      default:
        return 'unknown';
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchServicesByCountry(selectedCountry);
    } else {
      setServices([]);
    }
  }, [selectedCountry]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/images/logo_dark.png" className="h-8 mr-3" alt="logo" />
              <h1 className="text-xl font-bold text-gray-900">NovaSMSHub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/fund-wallet" className="text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white font-medium rounded-md text-sm px-4 py-2">
                Fund Your Wallet
              </a>
              <a href="/fund-wallet" className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-md text-sm px-4 py-2">
                Wallet Balance: ₦0
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 pt-20">
          <ul className="space-y-2 font-medium p-4">
            <li>
              <a href="/dashboard" className="flex items-center p-2 text-blue-600 rounded-lg hover:bg-gray-100 group">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/buy-number" className="flex items-center p-2 text-blue-600 rounded-lg hover:bg-gray-100 group">
                <Phone className="w-5 h-5 text-blue-600" />
                <span className="ml-3">Buy Number</span>
              </a>
            </li>
            <li>
              <a href="/buy-usa-number" className="flex items-center p-2 text-blue-600 rounded-lg hover:bg-gray-100 group">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="ml-3">Buy USA Number</span>
              </a>
            </li>
            <li>
              <a href="/buy-global-number-v2" className="flex items-center p-2 text-blue-600 rounded-lg bg-gray-100 group">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="ml-3">All Country Number V2</span>
              </a>
            </li>
            <li>
              <a href="/order-history" className="flex items-center p-2 text-blue-600 rounded-lg hover:bg-gray-100 group">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                <span className="ml-3">My Orders</span>
                <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">23</span>
              </a>
            </li>
            <li>
              <a href="/transaction-history" className="flex items-center p-2 text-blue-600 rounded-lg hover:bg-gray-100 group">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span className="ml-3">My Transactions</span>
                <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">13</span>
              </a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-4">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="bg-white rounded-lg p-4 mb-4">
              <h2 className="font-bold text-xl text-gray-900">Buy All Country Number V2</h2>
            </div>

            {/* Purchase Form */}
            <div className="bg-white rounded-lg p-4 mb-4">
              {/* Success/Error Messages */}
              {successMessage && (
                <div className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="font-medium">{successMessage}</span>
                  <button 
                    onClick={() => setSuccessMessage('')}
                    className="ml-auto bg-green-50 text-green-500 rounded-lg p-1 hover:bg-green-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {errorMessage && (
                <div className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span className="font-medium">{errorMessage}</span>
                  <button 
                    onClick={() => setErrorMessage('')}
                    className="ml-auto bg-red-50 text-red-500 rounded-lg p-1 hover:bg-red-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Country Selection */}
              <div className="mb-2">
                <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">
                  Select Country
                </label>
                <select
                  id="country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="block w-full p-2 mb-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50"
                >
                  <option value="">Choose a country</option>
                  {countries.map(country => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Selection */}
              <div className="mb-2">
                <label htmlFor="service" className="block mb-2 text-sm font-medium text-gray-900">
                  Select Service
                </label>
                <select
                  id="service"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  disabled={!selectedCountry || isLoadingServices}
                  className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50"
                >
                  <option value="">
                    {selectedCountry ? 'Choose a service' : 'Select a country first'}
                  </option>
                  {services.map((service, index) => (
                    <option key={index} value={`${service.name}-${service.short_name}-${service.cost}-${service.ttl}`}>
                      {service.name} - ₦{Math.round(service.converted_price).toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Purchase Button */}
              <div>
                <button
                  onClick={handlePurchase}
                  disabled={!selectedCountry || !selectedService || isPurchasing}
                  className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-md text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPurchasing ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Order History</h3>
              
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 bg-gray-50">PHONE NUMBER</th>
                      <th className="px-6 py-3">CODE</th>
                      <th className="px-6 py-3">SERVICE</th>
                      <th className="px-6 py-3 bg-gray-50">TIMER</th>
                      <th className="px-6 py-3 bg-gray-50">ID</th>
                      <th className="px-6 py-3">DATE</th>
                      <th className="px-6 py-3">PRICE</th>
                      <th className="px-6 py-3 bg-gray-50">STATUS</th>
                      <th className="px-6 py-3 bg-gray-50">AC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingOrders ? (
                      <tr>
                        <td colSpan={9} className="text-center py-8">
                          <Loader className="w-6 h-6 mx-auto animate-spin" />
                          <p className="mt-2 text-gray-500">Loading orders...</p>
                        </td>
                      </tr>
                    ) : orders.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center py-8 text-gray-500">
                          No Order Available
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-200">
                          <td className="px-6 py-4 bg-gray-50">+{order.phone_number}</td>
                          <td className="px-6 py-4">{order.code || '---'}</td>
                          <td className="px-6 py-4">{order.service_name}</td>
                          <td className="px-6 py-4">
                            <div className="countdown-timer" data-expires-at={order.expires_at} data-status={order.status}>
                              {formatTimeRemaining(order.expires_at, order.status)}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                            {order.order_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(order.created_at).toLocaleString()}
                          </td>
                          <td className="px-6 py-4">₦{order.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 bg-gray-50">
                            <span className={getStatusBadge(order.status)}>
                              {getStatusText(order.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={order.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {order.status === 1 ? '✓' : 'X'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Timer initialization script equivalent */}
      <script dangerouslySetInnerHTML={{
        __html: `
          setInterval(() => {
            const timers = document.querySelectorAll('.countdown-timer');
            timers.forEach(timer => {
              const expiresAt = new Date(timer.dataset.expiresAt).getTime();
              const status = parseInt(timer.dataset.status);
              
              if (status === 1) {
                timer.textContent = '0:00';
                return;
              }
              if (status > 1) {
                timer.textContent = 'Expired';
                return;
              }
              
              const interval = setInterval(() => {
                const now = new Date().getTime();
                const distance = expiresAt - now;
                
                if (distance < 0) {
                  clearInterval(interval);
                  timer.textContent = 'Expired';
                  return;
                }
                
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                const formattedMinutes = minutes.toString().padStart(2, '0');
                const formattedSeconds = seconds.toString().padStart(2, '0');
                
                timer.textContent = formattedMinutes + ':' + formattedSeconds;
              }, 1000);
            });
          }, 1000);
        `
      }} />
    </div>
  );
};

export default AllCountryNumberV2Page;
