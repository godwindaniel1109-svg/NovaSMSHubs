import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Calendar,
  DollarSign,
  MessageSquare,
  Send,
  X,
  Plus,
  UserPlus,
  Shield,
  Clock,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { useNotify } from './NotificationSystem';

interface PaymentProof {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  amount: number;
  gateway: string;
  transactionId: string;
  comment: string;
  proofFile: string;
  proofType: 'image' | 'pdf';
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewComment?: string;
  orderId: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'validator' | 'moderator' | 'super_admin';
  permissions: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin: string;
}

const PaymentProofManagement: React.FC = () => {
  const [proofs, setProofs] = useState<PaymentProof[]>([]);
  const [filteredProofs, setFilteredProofs] = useState<PaymentProof[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedProof, setSelectedProof] = useState<PaymentProof | null>(null);
  const [showProofModal, setShowProofModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject'>('approve');
  const [activeTab, setActiveTab] = useState<'proofs' | 'staff'>('proofs');
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    role: 'validator' as const,
    permissions: [] as string[]
  });
  const notify = useNotify();

  // Mock payment proofs data
  const mockProofs: PaymentProof[] = [
    {
      id: 'PROOF001',
      userId: 'USR001',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      userPhone: '+2347012345678',
      amount: 50000,
      gateway: 'Paystack',
      transactionId: 'PAY_123456789',
      comment: 'Payment for virtual number purchase',
      proofFile: '/uploads/proof1.jpg',
      proofType: 'image',
      status: 'pending',
      submittedAt: '2024-01-15T10:30:00Z',
      orderId: 'ORD001'
    },
    {
      id: 'PROOF002',
      userId: 'USR002',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      userPhone: '+2348087654321',
      amount: 25000,
      gateway: 'Bank Transfer',
      transactionId: 'BANK_987654321',
      comment: 'Wallet funding',
      proofFile: '/uploads/proof2.pdf',
      proofType: 'pdf',
      status: 'approved',
      submittedAt: '2024-01-14T15:45:00Z',
      reviewedAt: '2024-01-14T16:30:00Z',
      reviewedBy: 'admin@novasmshub.com',
      reviewComment: 'Payment verified and approved',
      orderId: 'ORD002'
    },
    {
      id: 'PROOF003',
      userId: 'USR003',
      userName: 'Mike Johnson',
      userEmail: 'mike@example.com',
      userPhone: '+2349011223344',
      amount: 75000,
      gateway: 'Paystack',
      transactionId: 'PAY_456789123',
      comment: 'Bulk purchase',
      proofFile: '/uploads/proof3.jpg',
      proofType: 'image',
      status: 'rejected',
      submittedAt: '2024-01-13T09:15:00Z',
      reviewedAt: '2024-01-13T10:00:00Z',
      reviewedBy: 'validator@novasmshub.com',
      reviewComment: 'Invalid transaction ID',
      orderId: 'ORD003'
    }
  ];

  // Mock admin users data
  const mockAdminUsers: AdminUser[] = [
    {
      id: 'ADMIN001',
      name: 'Super Admin',
      email: 'admin@novasmshub.com',
      role: 'super_admin',
      permissions: ['all'],
      status: 'active',
      createdAt: '2024-01-01T00:00:00Z',
      lastLogin: '2024-01-15T14:30:00Z'
    },
    {
      id: 'ADMIN002',
      name: 'John Validator',
      email: 'validator@novasmshub.com',
      role: 'validator',
      permissions: ['validate_payments', 'view_users'],
      status: 'active',
      createdAt: '2024-01-05T10:00:00Z',
      lastLogin: '2024-01-15T12:00:00Z'
    },
    {
      id: 'ADMIN003',
      name: 'Sarah Moderator',
      email: 'moderator@novasmshub.com',
      role: 'moderator',
      permissions: ['moderate_content', 'view_reports'],
      status: 'active',
      createdAt: '2024-01-08T15:30:00Z',
      lastLogin: '2024-01-15T11:45:00Z'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setProofs(mockProofs);
      setFilteredProofs(mockProofs);
      setAdminUsers(mockAdminUsers);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = proofs.filter(proof => {
      const matchesSearch = 
        proof.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proof.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proof.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proof.orderId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || proof.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    setFilteredProofs(filtered);
  }, [proofs, searchTerm, statusFilter]);

  const handleReviewProof = async () => {
    if (!selectedProof) return;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedProofs = proofs.map(proof => {
        if (proof.id === selectedProof.id) {
          return {
            ...proof,
            status: reviewAction,
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'current@admin.com',
            reviewComment: reviewComment
          };
        }
        return proof;
      });

      setProofs(updatedProofs);

      // If approved, update user balance (simulate)
      if (reviewAction === 'approve') {
        notify.success(
          'Payment Approved',
          `₦${selectedProof.amount.toLocaleString()} has been added to ${selectedProof.userName}'s wallet`
        );
      } else {
        notify.success('Payment Rejected', 'Payment proof has been rejected');
      }

      setShowReviewModal(false);
      setSelectedProof(null);
      setReviewComment('');
    } catch (error) {
      notify.error('Review Failed', 'Failed to review payment proof');
    }
  };

  const handleAddStaff = async () => {
    if (!newStaff.name || !newStaff.email) {
      notify.error('Missing Information', 'Please fill in all required fields');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const staff: AdminUser = {
        id: `ADMIN${Date.now()}`,
        name: newStaff.name,
        email: newStaff.email,
        role: newStaff.role,
        permissions: getRolePermissions(newStaff.role),
        status: 'active',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      setAdminUsers([...adminUsers, staff]);
      setShowAddStaffModal(false);
      setNewStaff({ name: '', email: '', role: 'validator', permissions: [] });
      
      notify.success('Staff Added', `${newStaff.name} has been added as ${newStaff.role}`);
    } catch (error) {
      notify.error('Add Failed', 'Failed to add staff member');
    }
  };

  const getRolePermissions = (role: string): string[] => {
    switch (role) {
      case 'super_admin':
        return ['all'];
      case 'admin':
        return ['manage_users', 'validate_payments', 'view_reports', 'manage_staff'];
      case 'validator':
        return ['validate_payments', 'view_users'];
      case 'moderator':
        return ['moderate_content', 'view_reports', 'manage_orders'];
      default:
        return [];
    }
  };

  const formatCurrency = (amount: number): string => {
    return `₦${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'text-purple-600 bg-purple-100';
      case 'admin': return 'text-blue-600 bg-blue-100';
      case 'validator': return 'text-green-600 bg-green-100';
      case 'moderator': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-nova-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddStaffModal(true)}
            className="flex items-center px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors"
          >
            <User className="w-5 h-5 mr-2" />
            Add Staff
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('proofs')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'proofs'
                ? 'border-nova-primary text-nova-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className="w-5 h-5 inline mr-2" />
            Payment Proofs ({proofs.filter(p => p.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('staff')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'staff'
                ? 'border-nova-primary text-nova-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <User className="w-5 h-5 inline mr-2" />
            Staff Management ({adminUsers.length})
          </button>
        </nav>
      </div>

      {/* Payment Proofs Tab */}
      {activeTab === 'proofs' && (
        <>
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by user, transaction ID, or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Payment Proofs Table */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gateway
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Proof
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
                  {filteredProofs.map((proof) => (
                    <tr key={proof.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{proof.userName}</div>
                          <div className="text-sm text-gray-500">{proof.userEmail}</div>
                          <div className="text-xs text-gray-400">{proof.userPhone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(proof.amount)}
                        </div>
                        <div className="text-xs text-gray-500">Order: {proof.orderId}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <CreditCard className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{proof.gateway}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-mono text-gray-900">{proof.transactionId}</div>
                        {proof.comment && (
                          <div className="text-xs text-gray-500 mt-1">{proof.comment}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedProof(proof);
                            setShowProofModal(true);
                          }}
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          {proof.proofType === 'image' ? (
                            <Image className="w-4 h-4 mr-1" />
                          ) : (
                            <FileText className="w-4 h-4 mr-1" />
                          )}
                          View Proof
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(proof.status)}`}>
                          {proof.status.charAt(0).toUpperCase() + proof.status.slice(1)}
                        </span>
                        {proof.reviewedBy && (
                          <div className="text-xs text-gray-500 mt-1">
                            by {proof.reviewedBy}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {proof.status === 'pending' && (
                            <>
                              <button
                                onClick={() => {
                                  setSelectedProof(proof);
                                  setReviewAction('approve');
                                  setShowReviewModal(true);
                                }}
                                className="text-green-600 hover:text-green-800"
                                title="Approve"
                              >
                                <CheckSquare className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedProof(proof);
                                  setReviewAction('reject');
                                  setShowReviewModal(true);
                                }}
                                className="text-red-600 hover:text-red-800"
                                title="Reject"
                              >
                                <XSquare className="w-5 h-5" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => {
                              setSelectedProof(proof);
                              setShowProofModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Staff Management Tab */}
      {activeTab === 'staff' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Staff Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adminUsers.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                        <div className="text-sm text-gray-500">{staff.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(staff.role)}`}>
                        {staff.role.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {staff.permissions.includes('all') ? 'All Permissions' : staff.permissions.join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        staff.status === 'active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                      }`}>
                        {staff.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(staff.lastLogin).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Proof View Modal */}
      {showProofModal && selectedProof && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Payment Proof Details</h3>
              <button
                onClick={() => setShowProofModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">User Information</h4>
                <div className="space-y-2">
                  <div><span className="text-sm text-gray-500">Name:</span> {selectedProof.userName}</div>
                  <div><span className="text-sm text-gray-500">Email:</span> {selectedProof.userEmail}</div>
                  <div><span className="text-sm text-gray-500">Phone:</span> {selectedProof.userPhone}</div>
                  <div><span className="text-sm text-gray-500">Order ID:</span> {selectedProof.orderId}</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Payment Information</h4>
                <div className="space-y-2">
                  <div><span className="text-sm text-gray-500">Amount:</span> {formatCurrency(selectedProof.amount)}</div>
                  <div><span className="text-sm text-gray-500">Gateway:</span> {selectedProof.gateway}</div>
                  <div><span className="text-sm text-gray-500">Transaction ID:</span> {selectedProof.transactionId}</div>
                  <div><span className="text-sm text-gray-500">Submitted:</span> {new Date(selectedProof.submittedAt).toLocaleString()}</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-2">Comment</h4>
              <p className="text-sm text-gray-600">{selectedProof.comment}</p>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-2">Payment Proof</h4>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                {selectedProof.proofType === 'image' ? (
                  <div className="text-center">
                    <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Image preview would be displayed here</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">PDF document would be displayed here</p>
                  </div>
                )}
              </div>
            </div>
            
            {selectedProof.reviewComment && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Review Comment</h4>
                <p className="text-sm text-gray-600">{selectedProof.reviewComment}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedProof && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {reviewAction === 'approve' ? 'Approve Payment' : 'Reject Payment'}
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">
                  <div>User: {selectedProof.userName}</div>
                  <div>Amount: {formatCurrency(selectedProof.amount)}</div>
                  <div>Transaction ID: {selectedProof.transactionId}</div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Comment
              </label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Add a comment for this review..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                rows={3}
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleReviewProof}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  reviewAction === 'approve'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {reviewAction === 'approve' ? 'Approve Payment' : 'Reject Payment'}
              </button>
              <button
                onClick={() => setShowReviewModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Staff Member</h3>
              <button
                onClick={() => setShowAddStaffModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                  placeholder="Enter staff name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                  placeholder="Enter staff email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({...newStaff, role: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
                >
                  <option value="validator">Validator</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Role Permissions:</p>
                <p className="text-xs text-gray-600">
                  {getRolePermissions(newStaff.role).includes('all') 
                    ? 'Full system access'
                    : getRolePermissions(newStaff.role).join(', ')
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={handleAddStaff}
                className="flex-1 px-4 py-2 bg-nova-primary text-black rounded-lg hover:bg-nova-secondary transition-colors"
              >
                Add Staff
              </button>
              <button
                onClick={() => setShowAddStaffModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentProofManagement;
