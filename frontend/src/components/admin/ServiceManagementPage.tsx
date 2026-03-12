import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Save,
  X,
  Globe,
  Smartphone,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  BarChart3
} from 'lucide-react';
import { useNotify } from '../NotificationSystem';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  provider: string;
  country: string;
  price: number;
  currency: string;
  availability: 'available' | 'unavailable' | 'maintenance';
  features: string[];
  setupTime: string;
  validity: string;
  totalOrders: number;
  successRate: number;
  isActive: boolean;
  createdAt: string;
  lastUpdated: string;
}

const ServiceManagementPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const notify = useNotify();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'virtual-number',
    provider: '5sim',
    country: 'Nigeria',
    price: 0,
    currency: 'NGN',
    validity: '30',
    setupTime: '5',
    features: [''] as string[]
  });

  useEffect(() => {
    // Mock data - in production, fetch from API
    const mockServices: Service[] = [
      {
        id: 'SVC001',
        name: 'Nigeria Virtual Number',
        description: 'Premium Nigerian virtual number for SMS verification',
        category: 'virtual-number',
        provider: '5sim',
        country: 'Nigeria',
        price: 3500,
        currency: 'NGN',
        availability: 'available',
        features: ['SMS Receiving', 'Call Forwarding', 'Voicemail', 'Multi-device Support'],
        setupTime: '5 minutes',
        validity: '30 days',
        totalOrders: 245,
        successRate: 98.5,
        isActive: true,
        createdAt: '2024-01-01',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'SVC002',
        name: 'USA Virtual Number',
        description: 'Professional US virtual number for business use',
        category: 'virtual-number',
        provider: 'sms-activate',
        country: 'United States',
        price: 5000,
        currency: 'NGN',
        availability: 'available',
        features: ['SMS Receiving', 'Call Forwarding', 'Voicemail', 'Business Features'],
        setupTime: '10 minutes',
        validity: '30 days',
        totalOrders: 189,
        successRate: 97.2,
        isActive: true,
        createdAt: '2024-01-02',
        lastUpdated: '2024-01-14'
      },
      {
        id: 'SVC003',
        name: 'UK Virtual Number',
        description: 'UK virtual number with premium features',
        category: 'virtual-number',
        provider: '5sim',
        country: 'United Kingdom',
        price: 4500,
        currency: 'NGN',
        availability: 'maintenance',
        features: ['SMS Receiving', 'Call Forwarding', 'Voicemail'],
        setupTime: '15 minutes',
        validity: '30 days',
        totalOrders: 156,
        successRate: 96.8,
        isActive: false,
        createdAt: '2024-01-03',
        lastUpdated: '2024-01-13'
      }
    ];
    setServices(mockServices);
    setFilteredServices(mockServices);
  }, []);

  useEffect(() => {
    let filtered = services;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(service => service.category === categoryFilter);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(service => {
        if (statusFilter === 'active') return service.isActive;
        if (statusFilter === 'inactive') return !service.isActive;
        return service.availability === statusFilter;
      });
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, categoryFilter, statusFilter]);

  const handleSaveService = async () => {
    if (!formData.name || !formData.description || formData.price <= 0) {
      notify.error('Validation Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (editingService) {
        // Update existing service
        setServices(prev => prev.map(service =>
          service.id === editingService.id
            ? {
                ...service,
                ...formData,
                lastUpdated: new Date().toISOString().split('T')[0]
              }
            : service
        ));
        notify.success('Service Updated', 'Service has been updated successfully');
      } else {
        // Add new service
        const newService: Service = {
          id: `SVC${Date.now()}`,
          ...formData,
          availability: 'available',
          totalOrders: 0,
          successRate: 0,
          isActive: true,
          createdAt: new Date().toISOString().split('T')[0],
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        setServices(prev => [...prev, newService]);
        notify.success('Service Added', 'New service has been added successfully');
      }
      
      setShowModal(false);
      resetForm();
    } catch (error) {
      notify.error('Save Failed', 'Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setServices(prev => prev.filter(service => service.id !== serviceId));
      notify.success('Service Deleted', 'Service has been deleted successfully');
    } catch (error) {
      notify.error('Delete Failed', 'Failed to delete service');
    }
  };

  const handleToggleService = async (serviceId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setServices(prev => prev.map(service =>
        service.id === serviceId
          ? { ...service, isActive: !service.isActive }
          : service
      ));
      
      const service = services.find(s => s.id === serviceId);
      notify.success(
        'Service Status Changed',
        `Service is now ${service?.isActive ? 'inactive' : 'active'}`
      );
    } catch (error) {
      notify.error('Status Change Failed', 'Failed to change service status');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'virtual-number',
      provider: '5sim',
      country: 'Nigeria',
      price: 0,
      currency: 'NGN',
      validity: '30',
      setupTime: '5',
      features: ['']
    });
    setEditingService(null);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      category: service.category,
      provider: service.provider,
      country: service.country,
      price: service.price,
      currency: service.currency,
      validity: service.validity,
      setupTime: service.setupTime,
      features: service.features
    });
    setShowModal(true);
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const getAvailabilityBadge = (availability: string) => {
    const styles = {
      available: 'bg-green-100 text-green-800',
      unavailable: 'bg-red-100 text-red-800',
      maintenance: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[availability as keyof typeof styles]}`}>
        {availability.charAt(0).toUpperCase() + availability.slice(1)}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Service Management</h1>
            <p className="text-gray-600 mt-1">Manage virtual number services and pricing</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="virtual-number">Virtual Numbers</option>
            <option value="sms-service">SMS Services</option>
            <option value="verification">Verification</option>
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
            <option value="maintenance">Maintenance</option>
          </select>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {filteredServices.length} of {services.length} services
            </span>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-500">{service.country}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getAvailabilityBadge(service.availability)}
                <button
                  onClick={() => handleToggleService(service.id)}
                  className={`p-1 rounded ${
                    service.isActive ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {service.isActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{service.description}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Price</span>
                <span className="font-semibold text-gray-900">₦{service.price.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Setup Time</span>
                <span className="text-sm text-gray-900">{service.setupTime}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Validity</span>
                <span className="text-sm text-gray-900">{service.validity} days</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Success Rate</span>
                <span className="text-sm font-medium text-green-600">{service.successRate}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total Orders</span>
                <span className="text-sm font-medium text-blue-600">{service.totalOrders}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Provider: {service.provider}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditService(service)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                    placeholder="Enter service name..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                  >
                    <option value="virtual-number">Virtual Number</option>
                    <option value="sms-service">SMS Service</option>
                    <option value="verification">Verification</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                  placeholder="Enter service description..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                  <select
                    value={formData.provider}
                    onChange={(e) => setFormData(prev => ({ ...prev, provider: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                  >
                    <option value="5sim">5Sim</option>
                    <option value="sms-activate">SMS Activate</option>
                    <option value="twilio">Twilio</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                    placeholder="Country..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₦) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Setup Time (minutes)</label>
                  <input
                    type="text"
                    value={formData.setupTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, setupTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                    placeholder="5"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Validity (days)</label>
                  <input
                    type="text"
                    value={formData.validity}
                    onChange={(e) => setFormData(prev => ({ ...prev, validity: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                    placeholder="30"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Features</label>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-blue-600 hover:text-blue-900 text-sm"
                  >
                    + Add Feature
                  </button>
                </div>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                      placeholder="Enter feature..."
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveService}
                  disabled={loading}
                  className="flex items-center px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2"></div>
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {loading ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagementPage;
