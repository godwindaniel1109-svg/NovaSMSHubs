import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Filter, 
  Download, 
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
  Users,
  Settings,
  Zap,
  Globe
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  isActive: boolean;
  totalOrders: number;
  totalRevenue: number;
  createdAt: string;
  features: string[];
  icon: string;
}

const ServicesManagementPage: React.FC = () => {
  const [services] = useState<Service[]>([
    {
      id: '1',
      name: 'WhatsApp Number',
      category: 'Messaging',
      description: 'Virtual WhatsApp number for business messaging',
      price: 5000,
      isActive: true,
      totalOrders: 850,
      totalRevenue: 4250000,
      createdAt: '2024-01-15',
      features: ['Business API', 'Auto-reply', 'Multi-device', 'Verified Badge'],
      icon: '📱'
    },
    {
      id: '2',
      name: 'Facebook Number',
      category: 'Social Media',
      description: 'Virtual Facebook number for social media marketing',
      price: 3500,
      isActive: true,
      totalOrders: 620,
      totalRevenue: 2170000,
      createdAt: '2024-01-10',
      features: ['Page Integration', 'Messenger API', 'Auto-response', 'Analytics'],
      icon: '📘'
    },
    {
      id: '3',
      name: 'Instagram Number',
      category: 'Social Media',
      description: 'Virtual Instagram number for social media management',
      price: 4500,
      isActive: true,
      totalOrders: 480,
      totalRevenue: 2160000,
      createdAt: '2024-01-12',
      features: ['Direct Messages', 'Story Integration', 'Business Profile', 'Insights'],
      icon: '📷'
    },
    {
      id: '4',
      name: 'Twitter Number',
      category: 'Social Media',
      description: 'Virtual Twitter number for social media automation',
      price: 2500,
      isActive: true,
      totalOrders: 320,
      totalRevenue: 800000,
      createdAt: '2024-01-08',
      features: ['Tweet Automation', 'DM Management', 'API Access', 'Analytics'],
      icon: '🐦'
    },
    {
      id: '5',
      name: 'Telegram Number',
      category: 'Messaging',
      description: 'Virtual Telegram number for secure messaging',
      price: 6000,
      isActive: true,
      totalOrders: 151,
      totalRevenue: 906000,
      createdAt: '2024-01-20',
      features: ['Bot Integration', 'Channel Management', 'API Access', 'End-to-End Encryption'],
      icon: '✈️'
    },
    {
      id: '6',
      name: 'SMS Number',
      category: 'Communication',
      description: 'Virtual SMS number for bulk messaging',
      price: 2000,
      isActive: false,
      totalOrders: 0,
      totalRevenue: 0,
      createdAt: '2024-02-01',
      features: ['Bulk SMS', 'API Integration', 'Auto-forwarding', 'Delivery Reports'],
      icon: '💬'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const categories = ['all', 'Messaging', 'Social Media', 'Communication'];

  const getStatusColor = (isActive: boolean) => {
    return isActive 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getStatusIcon = (isActive: boolean) => {
    return isActive 
      ? <CheckCircle className="w-4 h-4 text-green-600" />
      : <XCircle className="w-4 h-4 text-red-600" />;
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' && service.isActive) || (statusFilter === 'inactive' && !service.isActive);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedServices.length === filteredServices.length) {
      setSelectedServices([]);
    } else {
      setSelectedServices(filteredServices.map(service => service.id));
    }
  };

  const handleSelectService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const totalServices = services.length;
  const activeServices = services.filter(service => service.isActive).length;
  const totalRevenue = services.reduce((sum, service) => sum + service.totalRevenue, 0);
  const totalOrders = services.reduce((sum, service) => sum + service.totalOrders, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600">Manage and configure all platform services</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500 rounded-full">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalServices}</p>
              <p className="text-sm text-gray-600">Total Services</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-500 rounded-full">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeServices}</p>
              <p className="text-sm text-gray-600">Active Services</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-500 rounded-full">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">₦{totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-500 rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalOrders.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search services by name, description, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedServices.length === filteredServices.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={() => handleSelectService(service.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{service.icon}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{service.name}</div>
                        <div className="text-xs text-gray-500">{service.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ₦{service.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(service.isActive)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.isActive)}`}>
                        {service.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {service.totalOrders.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ₦{service.totalRevenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">{service.createdAt}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Edit className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Settings className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Trash2 className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bulk Actions */}
        {selectedServices.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm">
                  Activate Selected
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm">
                  Deactivate Selected
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                  Edit Pricing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Service Categories Overview */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Categories Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.slice(1).map(category => {
            const categoryServices = services.filter(s => s.category === category);
            const activeCount = categoryServices.filter(s => s.isActive).length;
            const categoryRevenue = categoryServices.reduce((sum, s) => sum + s.totalRevenue, 0);
            
            return (
              <div key={category} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-gray-900 capitalize">{category}</div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Services:</span>
                    <span className="font-medium">{categoryServices.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Active:</span>
                    <span className="font-medium text-green-600">{activeCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-medium text-blue-600">₦{categoryRevenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesManagementPage;
