import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, Clock, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useOrderTracking } from '../hooks/useApi';
import { useNotify } from './NotificationSystem';

interface OrderTrackingProps {
  orderId: string;
  onStatusChange?: (status: string) => void;
}

interface OrderStatus {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  message: string;
  timestamp: string;
  smsCode?: string;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId, onStatusChange }) => {
  const [orderHistory, setOrderHistory] = useState<OrderStatus[]>([]);
  const [isTracking, setIsTracking] = useState(true);
  const { order, loading, error, trackOrder } = useOrderTracking(orderId);
  const notify = useNotify();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-gray-500" />;
      case 'processing':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'failed':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'cancelled':
        return 'bg-gray-50 border-gray-200 text-gray-800';
      case 'processing':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const handleStatusUpdate = useCallback((statusData: any) => {
    const newStatus: OrderStatus = {
      id: Date.now().toString(),
      status: statusData.status,
      message: statusData.message,
      timestamp: new Date().toISOString(),
      smsCode: statusData.smsCode
    };

    setOrderHistory(prev => [...prev, newStatus]);

    // Notify user of status change
    switch (statusData.status) {
      case 'completed':
        notify.success('Order Completed!', statusData.message);
        if (statusData.smsCode) {
          notify.info('SMS Code Received', `Your verification code is: ${statusData.smsCode}`);
        }
        break;
      case 'failed':
        notify.error('Order Failed', statusData.message);
        break;
      case 'processing':
        notify.info('Order Processing', statusData.message);
        break;
    }

    // Call parent callback
    if (onStatusChange) {
      onStatusChange(statusData.status);
    }

    // Stop tracking if order is completed, failed, or cancelled
    if (['completed', 'failed', 'cancelled'].includes(statusData.status)) {
      setIsTracking(false);
    }
  }, [notify, onStatusChange]);

  useEffect(() => {
    if (orderId && isTracking) {
      // Start tracking the order
      trackOrder(orderId, handleStatusUpdate);

      // Add initial status
      setOrderHistory([{
        id: 'initial',
        status: 'pending',
        message: 'Order placed successfully. Waiting for processing...',
        timestamp: new Date().toISOString()
      }]);

      return () => {
        // Cleanup tracking on unmount
        setIsTracking(false);
      };
    }
  }, [orderId, isTracking, trackOrder]);

  const handleManualRefresh = () => {
    if (orderId) {
      // Trigger manual status check
      trackOrder();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (!orderId) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <span className="text-yellow-800">No order ID provided for tracking</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Order Tracking</h3>
        <div className="flex items-center space-x-2">
          {isTracking && (
            <div className="flex items-center space-x-1 text-sm text-blue-600">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Live Tracking</span>
            </div>
          )}
          <button
            onClick={handleManualRefresh}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh Status"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {orderHistory.map((status, index) => (
          <div
            key={status.id}
            className={`relative flex items-start space-x-3 p-4 rounded-lg border ${getStatusColor(
              status.status
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getStatusIcon(status.status)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium capitalize">
                  {status.status}
                </h4>
                <span className="text-xs opacity-75">
                  {formatTime(status.timestamp)}
                </span>
              </div>
              
              <p className="text-sm mt-1 opacity-90">
                {status.message}
              </p>
              
              {status.smsCode && (
                <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">SMS Code:</span>
                    <span className="text-lg font-bold text-blue-600 font-mono">
                      {status.smsCode}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(status.smsCode!);
                      notify.success('Copied!', 'SMS code copied to clipboard');
                    }}
                    className="mt-2 w-full text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                  >
                    Copy Code
                  </button>
                </div>
              )}
            </div>

            {/* Timeline connector */}
            {index < orderHistory.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-300" />
            )}
          </div>
        ))}

        {orderHistory.length === 0 && (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Waiting for order status updates...</p>
          </div>
        )}
      </div>

      {/* Order Actions */}
      {orderHistory.length > 0 && !['completed', 'failed', 'cancelled'].includes(
        orderHistory[orderHistory.length - 1]?.status || ''
      ) && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsTracking(!isTracking)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                isTracking
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-green-50 text-green-600 hover:bg-green-100'
              }`}
            >
              {isTracking ? 'Pause Tracking' : 'Resume Tracking'}
            </button>
            
            <button
              onClick={handleManualRefresh}
              className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium transition-colors"
            >
              Check Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
