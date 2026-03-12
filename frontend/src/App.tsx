import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './components/NotificationSystem';
import { LocalizationProvider } from './contexts/LocalizationContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import './index.css';
import './styles/animations.css';
import './styles/dark-mode.css';

// Pages
import LocalizedLandingPage from './components/LocalizedLandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';
import LocalizedDashboardPage from './components/LocalizedDashboardPage';
import UserWalletPage from './components/UserWalletPage';
import UserProfilePage from './components/UserProfilePage';
import BuyNumberPage from './components/BuyNumberPage';
import BuyUSANumberPage from './components/BuyUSANumberPage';
import AllCountryNumberPage from './components/AllCountryNumberPage';
import FundWalletPage from './components/FundWalletPage';
import PaymentProofUpload from './components/PaymentProofUpload';
import UserChatPage from './components/UserChatPage';

// Admin Pages
import AdminLoginPage from './components/admin/AdminLoginPage';
import EnhancedAdminDashboard from './components/admin/EnhancedAdminDashboard';
import UserManagementPage from './components/admin/UserManagementPage';
import AllUsersPage from './components/admin/AllUsersPage';
import OrderManagementPage from './components/admin/OrderManagementPage';
import TransactionManagementPage from './components/admin/TransactionManagementPage';
import PaymentProofManagement from './components/admin/PaymentProofManagement';
import ServiceManagementPage from './components/admin/ServiceManagementPage';
import ReportsPage from './components/admin/ReportsPage';
import AdminSettingsPage from './components/admin/AdminSettingsPage';
import AdminProfilePage from './components/admin/AdminProfilePage';
import AdvancedSearchPage from './components/AdvancedSearchPage';
import PerformanceMonitor from './components/PerformanceMonitor';

function App() {
  return (
    <LocalizationProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LocalizedLandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            
            {/* Protected User Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <LocalizedDashboardPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/wallet" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UserWalletPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UserProfilePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/buy-number" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <BuyNumberPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/buy-usa-number" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <BuyUSANumberPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/all-countries" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AllCountryNumberPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/fund-wallet" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <FundWalletPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/payment-proof" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <PaymentProofUpload amount={0} gateway="paystack" onSubmit={() => {}} />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/search" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AdvancedSearchPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/chat" element={
              <ProtectedRoute>
                <UserChatPage />
              </ProtectedRoute>
            } />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute isAdmin={true}>
                <EnhancedAdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/users" element={
              <ProtectedRoute isAdmin={true}>
                <EnhancedAdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/all-users" element={
              <ProtectedRoute isAdmin={true}>
                <EnhancedAdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/orders" element={
              <ProtectedRoute isAdmin={true}>
                <EnhancedAdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/transactions" element={
              <ProtectedRoute isAdmin={true}>
                <EnhancedAdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/payment-proofs" element={
              <ProtectedRoute isAdmin={true}>
                <EnhancedAdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/services" element={
              <ProtectedRoute isAdmin={true}>
                <EnhancedAdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/reports" element={
              <ProtectedRoute isAdmin={true}>
                <EnhancedAdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/settings" element={
              <ProtectedRoute isAdmin={true}>
                <EnhancedAdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/profile" element={
              <ProtectedRoute isAdmin={true}>
                <EnhancedAdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/search" element={
              <ProtectedRoute isAdmin={true}>
                <EnhancedAdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <PerformanceMonitor />
      </NotificationProvider>
    </LocalizationProvider>
  );
}

export default App;
