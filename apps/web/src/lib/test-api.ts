import { strapiAPI } from './strapi';

// Test API client connection
export async function testStrapiConnection() {
  try {
    console.log('🔌 Testing Strapi API connection...');
    
    // Test basic connection
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api`);
    
    if (response.ok) {
      console.log('✅ Strapi API is accessible');
      return true;
    } else {
      console.log('❌ Strapi API returned error:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Failed to connect to Strapi API:', error);
    return false;
  }
}

// Test specific API methods
export async function testStrapiMethods() {
  try {
    console.log('🧪 Testing Strapi API methods...');
    
    // This will likely return 404 until we create content types
    // but it tests that our client is properly configured
    const pages = await strapiAPI.getPages({ pagination: { limit: 1 } });
    console.log('✅ Pages endpoint accessible:', pages);
    
    return true;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.log('✅ API client working (404 expected - no content types yet)');
      return true;
    }
    console.error('❌ API client error:', error.response?.data || error.message);
    return false;
  }
}
