import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Download, 
  Search,
  Filter,
  AlertTriangle,
  User,
  Calendar,
  CreditCard
} from 'lucide-react';
import { useNotify } from '../NotificationSystem';

interface PaymentProof {
  id: string;
  orderId: string;
  userId: string;
  userName: string;
  amount: number;
  gateway: string;
  transactionId: string;
  comment: string;
  proofFile: string;
  proofUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewComment?: string;
}

const PaymentProofManagement: React.FC = () => {
  const [proofs, setProofs] = useState<PaymentProof[]>([]);
  const [filteredProofs, setFilteredProofs] = useState<PaymentProof[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedProof, setSelectedProof] = useState<PaymentProof | null>(null);
  const [showProofModal, setShowProofModal] = useState(false);
  const notify = useNotify();

  // Mock data - in production, this would come from API
  useEffect(() => {
    const mockProofs: PaymentProof[] = [
      {
        id: '1',
        orderId: 'ORD-1640995200000',
        userId: 'user123',
        userName: 'John Doe',
        amount: 5000,
        gateway: 'manual',
        transactionId: 'TXN-1640995200001',
        comment: 'Bank transfer made for wallet funding',
        proofFile: 'payment_screenshot.jpg',
        proofUrl: '/api/proofs/payment_screenshot.jpg',
        status: 'pending',
        submittedAt: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        orderId: 'ORD-1640995100000',
        userId: 'user456',
        userName: 'Jane Smith',
        amount: 10000,
        gateway: 'paystack',
        transactionId: 'TXN-1640995100002',
        comment: 'Paystack payment for order',
        proofFile: 'paystack_receipt.png',
        proofUrl: '/api/proofs/paystack_receipt.png',
        status: 'approved',
        submittedAt: '2024-01-14T15:45:00Z',
        reviewedAt: '2024-01-14T16:30:00Z',
        reviewedBy: 'Admin User',
        reviewComment: 'Payment verified and approved'
      },
      {
        id: '3',
        orderId: 'ORD-1640995000000',
        userId: 'user789',
        userName: 'Mike Johnson',
        amount: 2500,
        gateway: 'manual',
        transactionId: 'TXN-1640995000003',
        comment: 'Transfer from mobile banking',
        proofFile: 'mobile_receipt.jpg',
        proofUrl: '/api/proofs/mobile_receipt.jpg',
        status: 'rejected',
        submittedAt: '2024-01-13T09:20:00Z',
        reviewedAt: '2024-01-13T10:15:00Z',
        reviewedBy: 'Admin User',
        reviewComment: 'Receipt unclear - transaction ID not visible'
      }
    ];

    setProofs(mockProofs);
    setFilteredProofs(mockProofs);
    setLoading(false);
  }, []);

  // Filter proofs based on search and status
  useEffect(() => {
    let filtered = proofs;

    if (searchTerm) {
      filtered = filtered.filter(proof =>
        proof.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proof.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proof.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(proof => proof.status === statusFilter);
    }

    setFilteredProofs(filtered);
  }, [proofs, searchTerm, statusFilter]);

  const handleApprove = async (proofId: string) => {
    try {
      // API call to approve proof
      notify.success('Proof Approved', 'Payment proof has been approved and wallet funded');
      
      // Update local state
      setProofs(prev => prev.map(proof =>
        proof.id === proofId
          ? { ...proof, status: 'approved', reviewedAt: new Date().toISOString(), reviewedBy: 'Current Admin' }
          : proof
      ));
    } catch (error) {
      notify.error('Approval Failed', 'Failed to approve payment proof');
    }
  };

  const handleReject = async (proofId: string, reason: string) => {
    try {
      // API call to reject proof
      notify.success('Proof Rejected', 'Payment proof has been rejected with reason');
      
      // Update local state
      setProofs(prev => prev.map(proof =>
        proof.id === proofId
          ? { ...proof, status: 'rejected', reviewedAt: new Date().toISOString(), reviewedBy: 'Current Admin', reviewComment: reason }
          : proof
      ));
    } catch (error) {
      notify.error('Rejection Failed', 'Failed to reject payment proof');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nova-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Proof Management</h1>
        <p className="text-gray-600">Review and verify user payment proofs</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {proofs.filter(p => p.status === 'pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {proofs.filter(p => p.status === 'approved').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {proofs.filter(p => p.status === 'rejected').length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-nova-primary">
                {proofs.length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-nova-primary" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Order ID, Transaction ID, or User..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nova-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Proofs Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
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
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProofs.map((proof) => (
                <tr key={proof.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{proof.userName}</div>
                        <div className="text-xs text-gray-500">{proof.userId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">{proof.orderId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₦{proof.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 capitalize">{proof.gateway}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">{proof.transactionId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(proof.status)}`}>
                      {getStatusIcon(proof.status)}
                      <span className="ml-1">{proof.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                        {formatDate(proof.submittedAt)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedProof(proof);
                          setShowProofModal(true);
                        }}
                        className="text-nova-primary hover:text-nova-secondary"
                        title="View Proof"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {proof.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(proof.id)}
                            className="text-green-600 hover:text-green-700"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => {
                              const reason = prompt('Enter rejection reason:');
                              if (reason) {
                                handleReject(proof.id, reason);
                              }
                            }}
                            className="text-red-600 hover:text-red-700"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Proof Modal */}
      {showProofModal && selectedProof && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Payment Proof Details</h3>
                <button
                  onClick={() => setShowProofModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">User</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedProof.userName}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Order ID</label>
                    <p className="mt-1 text-sm font-mono text-gray-900">{selectedProof.orderId}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <p className="mt-1 text-sm font-medium text-gray-900">₦{selectedProof.amount.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gateway</label>
                    <p className="mt-1 text-sm text-gray-900 capitalize">{selectedProof.gateway}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                    <p className="mt-1 text-sm font-mono text-gray-900">{selectedProof.transactionId}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Comment</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedProof.comment}</p>
                  </div>
                  
                  {selectedProof.reviewComment && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Review Comment</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedProof.reviewComment}</p>
                    </div>
                  )}
                </div>
                
                {/* Proof Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Proof</label>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={selectedProof.proofUrl}
                      alt="Payment proof"
                      className="w-full h-auto max-h-96 object-contain"
                    />
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    <button
                      onClick={() => window.open(selectedProof.proofUrl, '_blank')}
                      className="flex-1 px-4 py-2 bg-nova-primary text-black font-medium rounded-md hover:bg-nova-secondary transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                    
                    {selectedProof.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            handleApprove(selectedProof.id);
                            setShowProofModal(false);
                          }}
                          className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        
                        <button
                          onClick={() => {
                            const reason = prompt('Enter rejection reason:');
                            if (reason) {
                              handleReject(selectedProof.id, reason);
                              setShowProofModal(false);
                            }
                          }}
                          className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
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

export default PaymentProofManagement;
