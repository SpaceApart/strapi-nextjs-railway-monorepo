'use client';

import { useEffect, useState } from 'react';
import { strapiAPI } from '@/lib/strapi';

export default function ApiStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [message, setMessage] = useState('Checking API connection...');

  useEffect(() => {
    async function checkConnection() {
      try {
        // Simple test - just check if Strapi is reachable
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api`);
        
        if (response.status === 404) {
          // 404 is expected when no content types exist yet
          setStatus('connected');
          setMessage('✅ Strapi API connected (ready for content types)');
        } else if (response.ok) {
          setStatus('connected');
          setMessage('✅ Strapi API connected and ready');
        } else {
          setStatus('error');
          setMessage(`❌ API error: ${response.status}`);
        }
      } catch (error) {
        setStatus('error');
        setMessage('❌ Cannot connect to Strapi API');
        console.error('API connection error:', error);
      }
    }

    checkConnection();
  }, []);

  const statusColors = {
    checking: 'text-yellow-600',
    connected: 'text-green-600',
    error: 'text-red-600',
  };

  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
      <p className={`text-sm font-mono ${statusColors[status]}`}>
        {message}
      </p>
    </div>
  );
}
