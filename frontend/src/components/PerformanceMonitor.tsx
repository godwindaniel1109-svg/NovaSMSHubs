import React, { useState, useEffect } from 'react';
import { Activity, Clock, Zap, AlertTriangle } from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  apiResponseTime: number;
  errorCount: number;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    apiResponseTime: 0,
    errorCount: 0
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    // Monitor page load performance
    const measurePageLoad = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        setMetrics(prev => ({
          ...prev,
          loadTime: navigation.loadEventEnd - navigation.loadEventStart
        }));
      }
    };

    // Monitor memory usage (if available)
    const measureMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: Math.round(memory.usedJSHeapSize / 1048576) // Convert to MB
        }));
      }
    };

    // Monitor API response times
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const start = performance.now();
      try {
        const response = await originalFetch(...args);
        const end = performance.now();
        setMetrics(prev => ({
          ...prev,
          apiResponseTime: Math.round(end - start)
        }));
        return response;
      } catch (error) {
        setMetrics(prev => ({
          ...prev,
          errorCount: prev.errorCount + 1
        }));
        throw error;
      }
    };

    // Initial measurements
    measurePageLoad();
    measureMemoryUsage();

    // Set up monitoring interval
    const interval = setInterval(() => {
      measureMemoryUsage();
    }, 5000);

    return () => {
      clearInterval(interval);
      window.fetch = originalFetch;
    };
  }, []);

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
    setIsVisible(!isVisible);
  };

  const getPerformanceGrade = (loadTime: number) => {
    if (loadTime < 1000) return { grade: 'A', color: 'text-green-600' };
    if (loadTime < 2000) return { grade: 'B', color: 'text-yellow-600' };
    if (loadTime < 3000) return { grade: 'C', color: 'text-orange-600' };
    return { grade: 'D', color: 'text-red-600' };
  };

  const grade = getPerformanceGrade(metrics.loadTime);

  if (!isVisible) {
    return (
      <button
        onClick={toggleMonitoring}
        className="fixed bottom-4 right-4 bg-nova-primary text-black p-3 rounded-full shadow-lg hover:bg-nova-secondary transition-colors z-50"
        title="Toggle Performance Monitor"
      >
        <Activity className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 z-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-nova-primary" />
          <h3 className="font-semibold text-gray-900">Performance Monitor</h3>
        </div>
        <button
          onClick={toggleMonitoring}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>

      <div className="space-y-3">
        {/* Overall Grade */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Overall Grade</span>
            <span className={`text-lg font-bold ${grade.color}`}>{grade.grade}</span>
          </div>
        </div>

        {/* Load Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Load Time</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {metrics.loadTime}ms
          </span>
        </div>

        {/* Memory Usage */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Memory</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {metrics.memoryUsage}MB
          </span>
        </div>

        {/* API Response Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">API Response</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {metrics.apiResponseTime}ms
          </span>
        </div>

        {/* Error Count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Errors</span>
          </div>
          <span className={`text-sm font-medium ${
            metrics.errorCount > 0 ? 'text-red-600' : 'text-green-600'
          }`}>
            {metrics.errorCount}
          </span>
        </div>
      </div>

      {/* Monitoring Status */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Monitoring</span>
          <div className={`w-2 h-2 rounded-full ${
            isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
          }`} />
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
