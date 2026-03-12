import React from 'react';
import { Wallet, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useWallet } from '../services/walletService';

interface WalletBalanceProps {
  showDetails?: boolean;
  showStatus?: boolean;
  className?: string;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ 
  showDetails = false, 
  showStatus = true,
  className = ''
}) => {
  const { 
    balance, 
    formatCurrency, 
    getBalanceStatus, 
    getUtilizationPercentage,
    getMaxAddableAmount,
    isNearLimit
  } = useWallet();

  const status = getBalanceStatus();
  const utilizationPercentage = getUtilizationPercentage();
  const maxAddable = getMaxAddableAmount();

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            status.status === 'max' ? 'bg-red-100' :
            status.status === 'high' ? 'bg-orange-100' :
            status.status === 'normal' ? 'bg-green-100' :
            'bg-gray-100'
          }`}>
            <Wallet className={`w-6 h-6 ${
              status.status === 'max' ? 'text-red-600' :
              status.status === 'high' ? 'text-orange-600' :
              status.status === 'normal' ? 'text-green-600' :
              'text-gray-600'
            }`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Wallet Balance</h3>
            <p className={`text-sm ${status.color}`}>{status.message}</p>
          </div>
        </div>
        
        {isNearLimit(90) && (
          <div className="flex items-center space-x-2 text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-medium">Near Limit</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-bold text-gray-900">
            {formatCurrency(balance.balance)}
          </span>
          <span className="text-sm text-gray-500">
            of {formatCurrency(balance.maxBalance)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                utilizationPercentage >= 95 ? 'bg-red-600' :
                utilizationPercentage >= 75 ? 'bg-orange-600' :
                utilizationPercentage >= 50 ? 'bg-yellow-600' :
                'bg-green-600'
              }`}
              style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{utilizationPercentage.toFixed(1)}% used</span>
            <span>{formatCurrency(maxAddable)} available</span>
          </div>
        </div>

        {showDetails && (
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Current Balance</span>
              <span className="font-medium text-gray-900">{formatCurrency(balance.balance)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Maximum Balance</span>
              <span className="font-medium text-gray-900">{formatCurrency(balance.maxBalance)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Available to Add</span>
              <span className={`font-medium ${
                maxAddable === 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                {formatCurrency(maxAddable)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Last Updated</span>
              <span className="font-medium text-gray-900">
                {new Date(balance.lastUpdated).toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {showStatus && (
          <div className={`flex items-center space-x-2 p-3 rounded-lg ${
            status.status === 'max' ? 'bg-red-50 text-red-700' :
            status.status === 'high' ? 'bg-orange-50 text-orange-700' :
            status.status === 'normal' ? 'bg-green-50 text-green-700' :
            'bg-gray-50 text-gray-700'
          }`}>
            {status.status === 'max' && <AlertTriangle className="w-5 h-5" />}
            {status.status === 'high' && <TrendingUp className="w-5 h-5" />}
            {status.status === 'normal' && <CheckCircle className="w-5 h-5" />}
            <span className="text-sm font-medium">{status.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletBalance;
