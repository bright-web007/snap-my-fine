#!/usr/bin/env node

// Set environment variables for production mode
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  public: args.includes('--public'),
  detailed: args.includes('--detailed'),
  live: args.includes('--live'),
  ready: args.includes('--ready')
};

async function makeHealthRequest(endpoint) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const url = `${baseUrl}/api/health${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'SnapMyFine-Health-Check/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    
    // Exit with appropriate code based on health status
    if (data.status === 'Healthy' || data.overall === 'Healthy') {
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.error('Health check failed:', error.message);
    process.exit(1);
  }
}

async function main() {
  try {
    if (options.public) {
      console.log('Running public health check...');
      await makeHealthRequest('');
    } else if (options.detailed) {
      console.log('Running detailed health check...');
      await makeHealthRequest('/detailed');
    } else if (options.live) {
      console.log('Running liveness health check...');
      await makeHealthRequest('/live');
    } else if (options.ready) {
      console.log('Running readiness health check...');
      await makeHealthRequest('/ready');
    } else {
      console.log('Running public health check (default)...');
      await makeHealthRequest('');
    }
  } catch (error) {
    console.error('Health check command failed:', error.message);
    process.exit(1);
  }
}

main();