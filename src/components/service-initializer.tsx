// service-initializer.tsx
// Updated: Now just monitors status since initialization happens via instrumentation.ts
'use client';

import { useEffect, useState } from 'react';

interface ConsumerStatus {
  isConnected: boolean;
  isConsuming: boolean;
  messagesProcessed: number;
  errors: string[];
}

export default function ServiceInitializer() {
  const [status, setStatus] = useState<ConsumerStatus | null>(null);
  const [, setInitialized] = useState(false);
  const [, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const maxRetries = 3;

    const checkStatus = async () => {
      try {
        const response = await fetch('/api/kafka/consumer/status');
        const result = await response.json();
        
        if (!mounted) return;

        if (result.success && result.status) {
          setStatus(result.status);
          setInitialized(result.initialized || result.status.isConsuming);
          
          if (result.status.isConsuming) {
            console.log('✅ Kafka consumer is running');
            setChecking(false);
          } else if (result.status.isConnected) {
            console.log('⏳ Kafka consumer connected but not yet consuming...');
            // Retry after a delay
            if (retryCount < maxRetries) {
              retryCount++;
              setTimeout(checkStatus, 2000);
            } else {
              console.log('⚠️ Consumer connected but not consuming after retries');
              setChecking(false);
            }
          } else {
            console.log('📡 Kafka consumer not yet connected, waiting...');
            // Retry after a delay
            if (retryCount < maxRetries) {
              retryCount++;
              setTimeout(checkStatus, 3000);
            } else {
              // Try to start the consumer manually
              console.log('🔧 Attempting to start consumer manually...');
              await startConsumer();
              setChecking(false);
            }
          }
        }
      } catch (error) {
        console.error('Error checking consumer status:', error);
        if (retryCount < maxRetries && mounted) {
          retryCount++;
          setTimeout(checkStatus, 3000);
        } else {
          setChecking(false);
        }
      }
    };

    const startConsumer = async () => {
      try {
        console.log('🚀 Starting Kafka consumer via API...');
        const response = await fetch('/api/kafka/consumer/status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'start' }),
        });
        
        const result = await response.json();
        
        if (result.success) {
          console.log('✅ Consumer start initiated:', result.message);
          // Check status again after a delay
          setTimeout(checkStatus, 2000);
        } else {
          console.warn('⚠️ Could not start consumer:', result.message || result.error);
        }
      } catch (error) {
        console.error('Error starting consumer:', error);
      }
    };

    // Initial check after a short delay to let the server initialize
    const initialDelay = setTimeout(checkStatus, 1000);

    return () => {
      mounted = false;
      clearTimeout(initialDelay);
    };
  }, []);

  // This component doesn't render anything visible
  // You could optionally return a status indicator for debugging
  if (process.env.NODE_ENV === 'development' && status) {
    return (
      <div style={{ 
        position: 'fixed', 
        bottom: 10, 
        right: 10, 
        fontSize: 10, 
        background: status.isConsuming ? '#10b981' : status.isConnected ? '#f59e0b' : '#ef4444',
        color: 'white',
        padding: '4px 8px',
        borderRadius: 4,
        zIndex: 9999,
        opacity: 0.8
      }}>
        Kafka: {status.isConsuming ? '✓ Running' : status.isConnected ? '⏳ Connected' : '✗ Disconnected'}
        {status.messagesProcessed > 0 && ` (${status.messagesProcessed})`}
      </div>
    );
  }

  return null;
}
