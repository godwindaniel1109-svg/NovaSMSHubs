import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLoginPage from './components/AdminLoginPage';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import SummaryDashboardPage from './components/SummaryDashboardPage';
import AdminDashboardPage from './components/admin/AdminDashboardPage';
import EnhancedAdminDashboard from './components/EnhancedAdminDashboard';
import AdminDashboard from './components/AIPoweredAdminDashboard';
import UserManagementPage from './components/UserManagementPage';
import OrdersManagementPage from './components/OrdersManagementPage';
import ServicesManagementPage from './components/ServicesManagementPage';
import TransactionManagementPage from './components/TransactionManagementPage';
import AdminChatPage from './components/AdminChatPage';
import AdminAnalyticsPage from './components/AdminAnalyticsPage';
import AdminPowerControl from './components/AdminPowerControl';
import AIValidatorControl from './components/AIValidatorControl';
import AINotificationSystem from './components/AINotificationSystem';
import NotificationPage from './components/NotificationPage';
import AnnouncementManagementPage from './components/admin/AnnouncementManagementPage';
import AdminSettingsPage from './components/AdminSettingsPage';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import './App.css';
import './styles/animations.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AdminLoginPage />} />
          <Route path="/login" element={<AdminLoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminProtectedRoute>
                <AdminDashboardLayout>
                  <AdminDashboard />
                </AdminDashboardLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <AdminProtectedRoute>
                <AdminDashboardLayout>
                  <UserManagementPage />
                </AdminDashboardLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/orders" 
            element={
              <AdminProtectedRoute>
                <AdminDashboardLayout>
                  <OrdersManagementPage />
                </AdminDashboardLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/services" 
            element={
              <AdminProtectedRoute>
                <AdminDashboardLayout>
                  <ServicesManagementPage />
                </AdminDashboardLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/transactions" 
            element={
              <AdminProtectedRoute>
                <AdminDashboardLayout>
                  <TransactionManagementPage />
                </AdminDashboardLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/analytics" 
            element={
              <AdminProtectedRoute>
                <AdminDashboardLayout>
                  <AdminAnalyticsPage />
                </AdminDashboardLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/chat" 
            element={
              <AdminProtectedRoute>
                <AdminDashboardLayout>
                  <AdminChatPage />
                </AdminDashboardLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/power-control" 
            element={
              <AdminProtectedRoute>
                <AdminDashboardLayout>
                  <AdminPowerControl />
                </AdminDashboardLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/ai-validator" 
            element={
              <AdminProtectedRoute>
                <AdminDashboardLayout>
                  <AIValidatorControl />
                </AdminDashboardLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/ai-notifications" 
            element={
              <AdminProtectedRoute>
                <AdminDashboardLayout>
                  <AINotificationSystem />
                </AdminDashboardLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/notifications" 
            element={
              <AdminProtectedRoute>
                <AdminDashboardLayout>
                  <NotificationPage />
                </AdminDashboardLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/announcements" 
            element={
              <AdminProtectedRoute>
                <AdminDashboardLayout>
                  <AnnouncementManagementPage />
                </AdminDashboardLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/statistics" 
            element={
              <AdminProtectedRoute>
                <AdminDashboardLayout>
                  <AdminDashboardPage />
                </AdminDashboardLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/profile" 
            element={
              <AdminProtectedRoute>
                <AdminDashboardLayout>
                  <AdminSettingsPage />
                </AdminDashboardLayout>
              </AdminProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <AdminProtectedRoute>
                <AdminDashboardLayout>
                  <AdminSettingsPage />
                </AdminDashboardLayout>
              </AdminProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
