import React, { useState } from 'react';
import { Wallet, Plus, Minus, AlertCircle, CheckCircle } from 'lucide-react';
import { useWallet } from '../services/walletService';

const UserWalletPage: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState<'add' | 'subtract'>('add');
  const { balance, updateBalance, canAddAmount, formatCurrency, getMaxAddableAmount } = useWallet();

  const handleUpdate = () => {
    const num = parseFloat(amount);
    if (!num || num <= 0) {
      return;
    }

    if (action === 'add') {
      if (!canAddAmount(num)) {
        return;
      }
    }

    const success = updateBalance(num, action, `${action} ₦${num.toLocaleString()}`);
    if (success) {
      setAmount('');
    }
  };

  const maxAddable = getMaxAddableAmount();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wallet</h2>
        
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Current Balance</p>
              <p className="text-3xl font-bold">{formatCurrency(balance.balance)}</p>
              <p className="text-xs opacity-75 mt-1">Max: {formatCurrency(balance.maxBalance)}</p>
              <p className="text-xs opacity-75 mt-1">Available to add: {formatCurrency(maxAddable)}</p>
            </div>
            <Wallet className="w-12 h-12 opacity-80" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setAction('add')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                action === 'add' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Add Funds
            </button>
            <button
              onClick={() => setAction('subtract')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                action === 'subtract' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              <Minus className="w-4 h-4 inline mr-2" />
              Withdraw
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            
            {action === 'add' && (
              <div className="text-sm text-gray-600">
                Maximum you can add: {formatCurrency(maxAddable)}
              </div>
            )}
          </div>

          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            {action === 'add' ? 'Add Funds' : 'Withdraw'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserWalletPage;
