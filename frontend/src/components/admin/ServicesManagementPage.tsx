import React, { useState, useEffect } from 'react';
import {
  Package,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Globe,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Settings,
  Users,
  Calendar
} from 'lucide-react';
import { useNotify } from '../NotificationSystem';

interface Service {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  price: number;
  currency: string;
  description: string;
  features: string[];
  status: 'active' | 'inactive' | 'maintenance';
  totalOrders: number;
  revenue: number;
  createdAt: string;
  updatedAt: string;
  icon?: string;
}

const ServicesManagementPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const notify = useNotify();

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchTerm, countryFilter, statusFilter]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      // Mock API call - in production, this would fetch from backend
      const mockServices: Service[] = [
        {
          id: '1',
          name: 'USA Virtual Number',
          country: 'United States',
          countryCode: 'US',
          price: 5000,
          currency: 'NGN',
          description: 'Get a virtual US phone number for SMS verification',
          features: ['SMS Receiving', 'Call Forwarding', 'Voicemail', 'Auto-Reply'],
          status: 'active',
          totalOrders: 156,
          revenue: 780000,
          createdAt: '2024-01-10T10:00:00Z',
          updatedAt: '2024-01-15T14:30:00Z',
          icon: '🇺🇸'
        },
        {
          id: '2',
          name: 'UK Virtual Number',
          country: 'United Kingdom',
          countryCode: 'GB',
          price: 3500,
          currency: 'NGN',
          description: 'Virtual UK number for SMS and voice services',
          features: ['SMS Receiving', 'Call Forwarding', 'Voicemail'],
          status: 'active',
          totalOrders: 89,
          revenue: 311500,
          createdAt: '2024-01-08T15:30:00Z',
          updatedAt: '2024-01-14T09:15:00Z',
          icon: '🇬🇧'
        },
        {
          id: '3',
          name: 'Canada Virtual Number',
          country: 'Canada',
          countryCode: 'CA',
          price: 4000,
          currency: 'NGN',
          description: 'Canadian virtual number with full features',
          features: ['SMS Receiving', 'Call Forwarding', 'Voicemail', 'Local Number'],
          status: 'active',
          totalOrders: 67,
          revenue: 268000,
          createdAt: '2024-01-05T12:00:00Z',
          updatedAt: '2024-01-13T16:45:00Z',
          icon: '🇨🇦'
        },
        {
          id: '4',
          name: 'Germany Virtual Number',
          country: 'Germany',
          countryCode: 'DE',
          price: 6000,
          currency: 'NGN',
          description: 'German virtual number for European services',
          features: ['SMS Receiving', 'Call Forwarding', 'Voicemail'],
          status: 'maintenance',
          totalOrders: 34,
          revenue: 204000,
          createdAt: '2024-01-03T09:00:00Z',
          updatedAt: '2024-01-15T11:20:00Z',
          icon: '🇩🇪'
        },
        {
          id: '5',
          name: 'France Virtual Number',
          country: 'France',
          countryCode: 'FR',
          price: 5500,
          currency: 'NGN',
          description: 'French virtual number with premium features',
          features: ['SMS Receiving', 'Call Forwarding', 'Voicemail', 'API Access'],
          status: 'active',
          totalOrders: 45,
          revenue: 247500,
          createdAt: '2024-01-12T14:20:00Z',
          updatedAt: '2024-01-16T10:30:00Z',
          icon: '🇫🇷'
        }
      ];

      setServices(mockServices);
      setTotalPages(Math.ceil(mockServices.length / 10));
    } catch (error) {
      notify.error('Error', 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (countryFilter !== 'all') {
      filtered = filtered.filter(service => service.countryCode === countryFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(service => service.status === statusFilter);
    }

    setFilteredServices(filtered);
  };

  const handleServiceAction = async (action: string, serviceId: string) => {
    try {
      switch (action) {
        case 'activate':
          setServices(prev => prev.map(service =>
            service.id === serviceId ? { ...service, status: 'active' } : service
          ));
          notify.success('Service Activated', 'Service has been activated successfully');
          break;
        case 'deactivate':
          setServices(prev => prev.map(service =>
            service.id === serviceId ? { ...service, status: 'inactive' } : service
          ));
          notify.success('Service Deactivated', 'Service has been deactivated successfully');
          break;
        case 'maintenance':
          setServices(prev => prev.map(service =>
            service.id === serviceId ? { ...service, status: 'maintenance' } : service
          ));
          notify.success('Service in Maintenance', 'Service has been set to maintenance mode');
          break;
        case 'delete':
          if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
            setServices(prev => prev.filter(service => service.id !== serviceId));
            notify.success('Service Deleted', 'Service has been deleted successfully');
          }
          break;
      }
    } catch (error) {
      notify.error('Action Failed', 'Failed to perform service action');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'maintenance':
        return <Clock className="w-4 h-4" />;
      case 'inactive':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nova-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600">Manage all virtual number services</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-nova-primary text-black font-medium rounded-lg hover:bg-nova-secondary transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </button>
          <button
            onClick={fetchServices}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Services</p>
              <p className="text-2xl font-bold text-gray-900">{services.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Services</p>
              <p className="text-2xl font-bold text-green-600">
                {services.filter(s => s.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ₦{services.reduce((sum, s) => sum + s.revenue, 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Price</p>
              <p className="text-2xl font-bold text-blue-600">
                ₦{Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length).toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search services by name, country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
            >
              <option value="all">All Countries</option>
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedServices.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-800">
              {selectedServices.length} services selected
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  selectedServices.forEach(id => handleServiceAction('activate', id));
                  setSelectedServices([]);
                }}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
              >
                Activate Selected
              </button>
              <button
                onClick={() => {
                  selectedServices.forEach(id => handleServiceAction('deactivate', id));
                  setSelectedServices([]);
                }}
                className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors"
              >
                Deactivate Selected
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete ${selectedServices.length} services?`)) {
                    selectedServices.forEach(id => handleServiceAction('delete', id));
                    setSelectedServices([]);
                  }
                }}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
              >
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Services Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedServices.length === filteredServices.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedServices(filteredServices.map(s => s.id));
                      } else {
                        setSelectedServices([]);
                      }
                    }}
                    className="rounded border-gray-300 text-nova-primary focus:ring-nova-primary"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedServices([...selectedServices, service.id]);
                        } else {
                          setSelectedServices(selectedServices.filter(id => id !== service.id));
                        }
                      }}
                      className="rounded border-gray-300 text-nova-primary focus:ring-nova-primary"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{service.icon}</div>
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">{service.name}</div>
                        <div className="text-gray-500">{service.countryCode}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{service.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₦{service.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{service.totalOrders}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₦{service.revenue.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(service.status)}`}>
                      {getStatusIcon(service.status)}
                      <span className="ml-1">{service.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedService(service);
                          setShowEditModal(true);
                        }}
                        className="text-nova-primary hover:text-nova-secondary"
                        title="Edit Service"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedService(service);
                          setShowEditModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                        title="Service Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {service.status === 'active' && (
                        <button
                          onClick={() => handleServiceAction('deactivate', service.id)}
                          className="text-yellow-600 hover:text-yellow-700"
                          title="Deactivate Service"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                      
                      {service.status === 'inactive' && (
                        <button
                          onClick={() => handleServiceAction('activate', service.id)}
                          className="text-green-600 hover:text-green-700"
                          title="Activate Service"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleServiceAction('delete', service.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white px-6 py-4 border-t border-gray-200">
        <div className="text-sm text-gray-700">
          Showing {filteredServices.length} of {services.length} services
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Service Details Modal */}
      {showEditModal && selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Service Details</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Service Name</label>
                    <div className="mt-1 text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{selectedService.icon}</span>
                        <span className="font-medium">{selectedService.name}</span>
                      </div>
                      <div className="text-gray-500">{selectedService.countryCode}</div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedService.country}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <p className="mt-1 text-lg font-bold text-gray-900">
                      ₦{selectedService.price.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(selectedService.status)}`}>
                      {getStatusIcon(selectedService.status)}
                      <span className="ml-2">{selectedService.status}</span>
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedService.description}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Features</label>
                    <div className="mt-1 space-y-2">
                      {selectedService.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-900">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Statistics</label>
                    <div className="mt-1 space-y-2 text-sm text-gray-900">
                      <div className="flex justify-between">
                        <span>Total Orders:</span>
                        <span className="font-medium">{selectedService.totalOrders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Revenue:</span>
                        <span className="font-medium">₦{selectedService.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Created</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedService.createdAt).toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedService.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesManagementPage;
