import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, Activity, Search, ShieldCheck } from 'lucide-react';

const App = () => {
  const [products, setProducts] = useState([]);
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [loading, setLoading] = useState(true);

  // Use relative path so CloudFront can proxy requests
  const BACKEND_URL = window.location.origin;

  useEffect(() => {
    // Check Backend Health
    fetch(`${BACKEND_URL}/health`)
      .then(res => res.json())
      .then(data => setBackendStatus(data.status === 'UP' ? 'Connected' : 'Disconnected'))
      .catch(() => setBackendStatus('Disconnected'));

    // Fetch Products
    fetch(`${BACKEND_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        // Fallback dummy data if backend is not reachable
        setProducts([
          { id: 1, name: 'Premium Laptop', price: 1299.99, category: 'Electronics' },
          { id: 2, name: 'Wireless Headphones', price: 199.99, category: 'Audio' },
          { id: 3, name: 'Smart Watch', price: 249.99, category: 'Wearables' }
        ]);
      });
  }, [BACKEND_URL]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navigation */}
      <nav className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-8 w-8" />
              <span className="text-2xl font-bold tracking-tight">ShopEasy</span>
            </div>
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300 h-5 w-5" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full bg-indigo-500 text-white placeholder-indigo-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm font-medium bg-indigo-700 px-3 py-1 rounded-full">
                <Activity className={`h-4 w-4 ${backendStatus === 'Connected' ? 'text-green-400' : 'text-red-400'}`} />
                <span>Backend: {backendStatus}</span>
              </div>
              <ShieldCheck className="h-6 w-6 cursor-pointer hover:text-indigo-200 transition" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Modern DevOps, <span className="text-indigo-600">Seamless Shopping.</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Deployed with Jenkins, Docker, and AWS CloudFront.
          </p>
        </div>
      </header>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <Package className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group">
                <div className="h-48 bg-gray-200 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                  <Package className="h-16 w-16 text-gray-400 group-hover:text-indigo-300" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{product.category}</span>
                  <h3 className="mt-2 text-xl font-bold text-gray-900">{product.name}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-gray-900">${product.price}</span>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-medium">ShopEasy Production Environment - v1.0.0</p>
          <p className="mt-2 text-xs">Infrastructure managed via AWS S3 & CloudFront CDN</p>
          <div className="mt-6 flex justify-center gap-4">
             <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">A</div>
             <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">D</div>
             <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">J</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;