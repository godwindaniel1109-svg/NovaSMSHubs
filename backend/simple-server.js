const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'NovaSMSHub API is running',
    timestamp: new Date().toISOString()
  });
});

// Mock admin data
app.get('/api/admin/stats', (req, res) => {
  res.json({
    totalUsers: 1247,
    activeUsers: 892,
    totalOrders: 3456,
    activeServices: 12,
    pendingDeposits: 23,
    totalRevenue: 2456789,
    totalTransactions: 5678,
    newUsers: 45,
    monthlyRevenue: 234567,
    pendingTransactions: 12,
    failedTransactions: 3,
    systemUptime: '99.9%',
    serverLoad: 45,
    growthRate: 12.5,
    conversionRate: 68.4,
    avgOrderValue: 710
  });
});

// Mock users endpoint
app.get('/api/admin/users', (req, res) => {
  res.json([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      registeredAt: '2024-01-10T10:00:00Z',
      lastLogin: '2024-01-15T14:30:00Z',
      totalOrders: 45,
      totalSpent: 125000
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'active',
      registeredAt: '2024-01-08T15:30:00Z',
      lastLogin: '2024-01-15T09:15:00Z',
      totalOrders: 32,
      totalSpent: 89000
    }
  ]);
});

// Mock orders endpoint
app.get('/api/admin/orders', (req, res) => {
  res.json([
    {
      id: 'ORD-001',
      userId: '1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      service: 'USA Virtual Number',
      amount: 5000,
      status: 'completed',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T14:30:00Z',
      smsCode: '123456',
      phoneNumber: '+1-555-0123'
    },
    {
      id: 'ORD-002',
      userId: '2',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      service: 'UK Virtual Number',
      amount: 3500,
      status: 'pending',
      createdAt: '2024-01-15T09:15:00Z',
      updatedAt: '2024-01-15T09:15:00Z'
    }
  ]);
});

// Payment proof validation endpoints
app.post('/api/payment-proof/submit', (req, res) => {
  const { userId, amount, gateway, transactionId, comment, proofFile } = req.body;
  
  // Validate required fields
  if (!userId || !amount || !gateway || !transactionId) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields' 
    });
  }

  // Generate unique proof ID
  const proofId = `PROOF${Date.now()}`;
  
  // In production, save to database
  const paymentProof = {
    id: proofId,
    userId,
    amount,
    gateway,
    transactionId,
    comment,
    proofFile,
    status: 'pending',
    submittedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    message: 'Payment proof submitted successfully',
    data: paymentProof
  });
});

app.get('/api/payment-proofs', (req, res) => {
  const { status, search } = req.query;
  
  // Mock payment proofs data
  let proofs = [
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
      status: 'approved',
      submittedAt: '2024-01-14T15:45:00Z',
      reviewedAt: '2024-01-14T16:30:00Z',
      reviewedBy: 'admin@novasmshub.com',
      reviewComment: 'Payment verified and approved',
      orderId: 'ORD002'
    }
  ];

  // Filter by status
  if (status && status !== 'all') {
    proofs = proofs.filter(proof => proof.status === status);
  }

  // Filter by search
  if (search) {
    proofs = proofs.filter(proof => 
      proof.userName.toLowerCase().includes(search.toLowerCase()) ||
      proof.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      proof.transactionId.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json({
    success: true,
    data: proofs
  });
});

app.post('/api/payment-proof/:id/review', (req, res) => {
  const { id } = req.params;
  const { action, comment, reviewedBy } = req.body;
  
  if (!action || !['approve', 'reject'].includes(action)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid action' 
    });
  }

  // In production, update database and user balance if approved
  const updatedProof = {
    id,
    status: action,
    reviewedAt: new Date().toISOString(),
    reviewedBy,
    reviewComment: comment
  };

  // If approved, simulate wallet update
  if (action === 'approve') {
    // In production, update user's wallet balance
    console.log(`User wallet updated for proof ${id}`);
  }

  res.json({
    success: true,
    message: `Payment proof ${action}d successfully`,
    data: updatedProof
  });
});

// Staff management endpoints
app.get('/api/admin/staff', (req, res) => {
  // Mock staff data
  const staff = [
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

  res.json({
    success: true,
    data: staff
  });
});

app.post('/api/admin/staff', (req, res) => {
  const { name, email, role } = req.body;
  
  // Validate required fields
  if (!name || !email || !role) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required fields' 
    });
  }

  // Get role permissions
  const getRolePermissions = (role) => {
    switch (role) {
      case 'super_admin': return ['all'];
      case 'admin': return ['manage_users', 'validate_payments', 'view_reports', 'manage_staff'];
      case 'validator': return ['validate_payments', 'view_users'];
      case 'moderator': return ['moderate_content', 'view_reports', 'manage_orders'];
      default: return [];
    }
  };

  // Create new staff member
  const newStaff = {
    id: `ADMIN${Date.now()}`,
    name,
    email,
    role,
    permissions: getRolePermissions(role),
    status: 'active',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  };

  res.json({
    success: true,
    message: 'Staff member added successfully',
    data: newStaff
  });
});

// User balance update endpoint
app.post('/api/wallet/update', (req, res) => {
  const { userId, amount, action } = req.body;
  
  // Validate amount
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid amount' 
    });
  }

  // Simulate current balance (in production, get from database)
  const currentBalance = 50000; // Example current balance
  let newBalance = currentBalance;

  // Calculate new balance based on action
  if (action === 'add') {
    newBalance = currentBalance + parseFloat(amount);
    // Check maximum balance limit
    if (newBalance > 100000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Maximum balance exceeded. Wallet balance cannot exceed ₦100,000' 
      });
    }
  } else if (action === 'subtract') {
    newBalance = Math.max(0, currentBalance - parseFloat(amount));
  } else if (action === 'set') {
    if (parseFloat(amount) > 100000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Maximum balance exceeded. Wallet balance cannot exceed ₦100,000' 
      });
    }
    newBalance = parseFloat(amount);
  }

  res.json({
    success: true,
    message: 'Wallet updated successfully',
    data: {
      previousBalance: currentBalance,
      newBalance: newBalance,
      amount: parseFloat(amount),
      action: action
    }
  });
});

// User balance check endpoint
app.get('/api/wallet/balance/:userId', (req, res) => {
  const { userId } = req.params;
  
  // Simulate user balance (in production, get from database)
  const balance = 999900; // Example: ₦999,900
  
  res.json({
    success: true,
    data: {
      userId: userId,
      balance: balance,
      maxBalance: 100000,
      currency: 'NGN'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 NovaSMSHub API Server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
  console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
  console.log(`💰 Wallet API: http://localhost:${PORT}/api/wallet`);
});
