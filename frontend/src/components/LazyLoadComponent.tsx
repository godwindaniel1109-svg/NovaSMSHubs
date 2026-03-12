import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
}

const LazyLoadComponent: React.FC<LazyLoadProps> = ({ 
  children, 
  fallback, 
  delay = 200 
}) => {
  const [showFallback, setShowFallback] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const defaultFallback = (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-nova-primary" />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );

  return (
    <Suspense fallback={showFallback ? (fallback || defaultFallback) : <div />}>
      {children}
    </Suspense>
  );
};

export default LazyLoadComponent;
