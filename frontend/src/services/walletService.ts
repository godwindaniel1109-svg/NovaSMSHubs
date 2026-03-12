import React, { useState, useEffect } from 'react';
import { useNotify } from '../components/NotificationSystem';

export interface WalletBalance {
  balance: number;
  maxBalance: number;
  currency: string;
  lastUpdated: string;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: string;
  previousBalance: number;
  newBalance: number;
  status: 'pending' | 'completed' | 'failed';
}

export interface WalletValidationResult {
  isValid: boolean;
  newBalance: number;
  amount: number;
  action: 'add' | 'subtract' | 'set';
  message?: string;
  error?: string;
}

class WalletService {
  private static instance: WalletService;
  private balance: number = 0;
  private maxBalance: number = 100000;
  private currency: string = 'NGN';
  private transactions: WalletTransaction[] = [];
  private listeners: ((balance: WalletBalance) => void)[] = [];

  private constructor() {
    this.initializeFromStorage();
  }

  static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService();
    }
    return WalletService.instance;
  }

  private initializeFromStorage(): void {
    try {
      const stored = localStorage.getItem('walletBalance');
      if (stored) {
        const data = JSON.parse(stored);
        this.balance = Math.min(data.balance || 0, this.maxBalance);
      }
    } catch (error) {
      console.error('Failed to initialize wallet from storage:', error);
      this.balance = 0;
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('walletBalance', JSON.stringify({
        balance: this.balance,
        maxBalance: this.maxBalance,
        currency: this.currency,
        lastUpdated: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Failed to save wallet to storage:', error);
    }
  }

  private notifyListeners(): void {
    const walletData: WalletBalance = {
      balance: this.balance,
      maxBalance: this.maxBalance,
      currency: this.currency,
      lastUpdated: new Date().toISOString()
    };
    this.listeners.forEach(listener => listener(walletData));
  }

  private addTransaction(transaction: Omit<WalletTransaction, 'id'>): void {
    const newTransaction: WalletTransaction = {
      ...transaction,
      id: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    };
    this.transactions.unshift(newTransaction);
    
    // Keep only last 100 transactions
    if (this.transactions.length > 100) {
      this.transactions = this.transactions.slice(0, 100);
    }
  }

  // Public methods
  public getBalance(): WalletBalance {
    return {
      balance: this.balance,
      maxBalance: this.maxBalance,
      currency: this.currency,
      lastUpdated: new Date().toISOString()
    };
  }

  public validateTransaction(amount: number, action: 'add' | 'subtract' | 'set'): WalletValidationResult {
    if (isNaN(amount) || amount < 0) {
      return {
        isValid: false,
        newBalance: this.balance,
        amount: 0,
        action,
        error: 'Invalid amount'
      };
    }

    let newBalance = this.balance;

    switch (action) {
      case 'add':
        newBalance = this.balance + amount;
        if (newBalance > this.maxBalance) {
          const excess = newBalance - this.maxBalance;
          return {
            isValid: false,
            newBalance: this.balance,
            amount,
            action,
            error: `Cannot add ₦${amount.toLocaleString()}. Maximum balance is ₦${this.maxBalance.toLocaleString()}. Excess: ₦${excess.toLocaleString()}`
          };
        }
        break;
      case 'subtract':
        newBalance = Math.max(0, this.balance - amount);
        break;
      case 'set':
        if (amount > this.maxBalance) {
          const excess = amount - this.maxBalance;
          return {
            isValid: false,
            newBalance: this.balance,
            amount,
            action,
            error: `Cannot set balance to ₦${amount.toLocaleString()}. Maximum balance is ₦${this.maxBalance.toLocaleString()}. Excess: ₦${excess.toLocaleString()}`
          };
        }
        newBalance = amount;
        break;
    }

    return {
      isValid: true,
      newBalance,
      amount,
      action,
      message: `Transaction valid. New balance will be ₦${newBalance.toLocaleString()}`
    };
  }

  public updateBalance(amount: number, action: 'add' | 'subtract' | 'set', description: string = ''): boolean {
    const validation = this.validateTransaction(amount, action);
    
    if (!validation.isValid) {
      return false;
    }

    const previousBalance = this.balance;
    this.balance = validation.newBalance;

    // Add transaction record
    this.addTransaction({
      type: action === 'subtract' ? 'debit' : 'credit',
      amount,
      description: description || `${action} ₦${amount.toLocaleString()}`,
      timestamp: new Date().toISOString(),
      previousBalance,
      newBalance: this.balance,
      status: 'completed'
    });

    this.saveToStorage();
    this.notifyListeners();
    
    return true;
  }

  public canAddAmount(amount: number): boolean {
    return this.balance + amount <= this.maxBalance;
  }

  public getMaxAddableAmount(): number {
    return this.maxBalance - this.balance;
  }

  public getAvailableBalance(): number {
    return this.balance;
  }

  public getUtilizationPercentage(): number {
    return (this.balance / this.maxBalance) * 100;
  }

  public isNearLimit(threshold: number = 90): boolean {
    return this.getUtilizationPercentage() >= threshold;
  }

  public getTransactions(limit?: number): WalletTransaction[] {
    return limit ? this.transactions.slice(0, limit) : [...this.transactions];
  }

  public subscribe(listener: (balance: WalletBalance) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  public reset(): void {
    this.balance = 0;
    this.transactions = [];
    this.saveToStorage();
    this.notifyListeners();
  }

  // Utility methods
  public formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  public getBalanceStatus(): {
    status: 'low' | 'normal' | 'high' | 'max';
    color: string;
    message: string;
  } {
    const percentage = this.getUtilizationPercentage();
    
    if (percentage === 0) {
      return { status: 'low', color: 'text-gray-600', message: 'Empty wallet' };
    } else if (percentage < 25) {
      return { status: 'low', color: 'text-blue-600', message: 'Low balance' };
    } else if (percentage < 75) {
      return { status: 'normal', color: 'text-green-600', message: 'Healthy balance' };
    } else if (percentage < 95) {
      return { status: 'high', color: 'text-yellow-600', message: 'High balance' };
    } else if (percentage < 100) {
      return { status: 'high', color: 'text-orange-600', message: 'Near limit' };
    } else {
      return { status: 'max', color: 'text-red-600', message: 'Maximum balance' };
    }
  }
}

export const walletService = WalletService.getInstance();

// React Hook for wallet
export const useWallet = () => {
  const [balance, setBalance] = useState<WalletBalance>(walletService.getBalance());
  const notify = useNotify();

  useEffect(() => {
    const unsubscribe = walletService.subscribe(setBalance);
    return unsubscribe;
  }, []);

  const updateBalance = (amount: number, action: 'add' | 'subtract' | 'set', description?: string) => {
    const validation = walletService.validateTransaction(amount, action);
    
    if (!validation.isValid) {
      notify.error('Transaction Failed', validation.error || 'Invalid transaction');
      return false;
    }

    const success = walletService.updateBalance(amount, action, description);
    
    if (success) {
      notify.success(
        'Transaction Successful',
        `Balance updated to ${walletService.formatCurrency(validation.newBalance)}`
      );
    }
    
    return success;
  };

  const canAddAmount = (amount: number): boolean => {
    if (!walletService.canAddAmount(amount)) {
      const excess = amount - walletService.getMaxAddableAmount();
      notify.error(
        'Maximum Balance Exceeded',
        `Cannot add ₦${amount.toLocaleString()}. Maximum balance is ₦${walletService.getBalance().maxBalance.toLocaleString()}. Excess: ₦${excess.toLocaleString()}`
      );
      return false;
    }
    return true;
  };

  return {
    balance,
    updateBalance,
    canAddAmount,
    formatCurrency: walletService.formatCurrency.bind(walletService),
    getBalanceStatus: walletService.getBalanceStatus.bind(walletService),
    getMaxAddableAmount: walletService.getMaxAddableAmount.bind(walletService),
    getUtilizationPercentage: walletService.getUtilizationPercentage.bind(walletService),
    isNearLimit: walletService.isNearLimit.bind(walletService),
    getTransactions: walletService.getTransactions.bind(walletService)
  };
};
