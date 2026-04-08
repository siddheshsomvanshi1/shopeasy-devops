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
        // Map backend data and add dummy images if not present
        const enhancedData = data.map((product, index) => ({
          ...product,
          image: product.image || `https://images.unsplash.com/photo-${[
            '1496181133206-80ce9b88a853', // Laptop
            '1505740420928-5e560c06d30e', // Headphones
            '1523275335684-37898b6baf30', // Watch
            '1583394838336-acd977736f90', // Camera
            '1491553895911-0055eca6402d', // Shoes
            '1542291026-7eec264c27ff'  // Sneakers
          ][index % 6]}?auto=format&fit=crop&w=800&q=80`
        }));
        setProducts(enhancedData);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        // Fallback dummy data if backend is not reachable
        setProducts([
          { 
            id: 1, 
            name: 'EliteBook Pro Laptop', 
            price: 95000, 
            category: 'Computing',
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'
          },
          { 
            id: 2, 
            name: 'Studio Wireless Headphones', 
            price: 12500, 
            category: 'Audio',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
          },
          { 
            id: 3, 
            name: 'Vanguard Smart Watch', 
            price: 18900, 
            category: 'Wearables',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
          }
        ]);
      });
  }, [BACKEND_URL]);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2 rounded-xl">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">SHOPEASY<span className="text-emerald-600">.</span></span>
            </div>
            
            <div className="hidden md:block flex-1 max-w-lg mx-12">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-emerald-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search our collection..." 
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                <div className={`h-2 w-2 rounded-full ${backendStatus === 'Connected' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                <span>System: {backendStatus}</span>
              </div>
              <div className="flex items-center gap-5">
                <ShieldCheck className="h-6 w-6 text-slate-400 cursor-pointer hover:text-slate-900 transition" />
                <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                  Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-6 border border-emerald-100">
            <Activity className="h-3 w-3" />
            ENTERPRISE GRADE DEPLOYMENT
          </div>
          <h1 className="text-5xl font-black text-slate-900 sm:text-7xl tracking-tight mb-6">
            Refined Style. <br/>
            <span className="text-emerald-600">Digital Precision.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed">
            Experience the future of commerce powered by AWS CloudFront and Automated CI/CD. 
            Formal, reliable, and exceptionally fast.
          </p>
        </div>
      </header>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm tracking-widest uppercase mb-2">
              <Package className="h-4 w-4" />
              Our Collection
            </div>
            <h2 className="text-3xl font-black text-slate-900">Featured Products</h2>
          </div>
          <div className="text-sm font-medium text-slate-400">Showing {products.length} results</div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-12 h-12 border-4 border-slate-100 border-t-emerald-600 rounded-full animate-spin"></div>
            <p className="text-slate-400 font-medium animate-pulse">Syncing with AWS Origin...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map(product => (
              <div key={product.id} className="group relative bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
                <div className="aspect-[4/5] overflow-hidden bg-slate-100 relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md text-slate-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">
                      {product.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                    Premium quality and professional craftsmanship for the modern era.
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Price</span>
                      <span className="text-2xl font-black text-slate-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <button className="bg-slate-900 text-white h-12 px-8 rounded-2xl font-bold hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-slate-900 p-2 rounded-xl">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter">SHOPEASY<span className="text-emerald-600">.</span></span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                A production-grade demonstration of modern cloud architecture and automated delivery.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Infrastructure</h4>
              <ul className="text-slate-500 text-sm space-y-2">
                <li>AWS CloudFront CDN</li>
                <li>Amazon S3 Storage</li>
                <li>EC2 Backend Clusters</li>
                <li>Jenkins Automation</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Monitoring</h4>
              <ul className="text-slate-500 text-sm space-y-2">
                <li>CloudWatch Metrics</li>
                <li>SNS Notifications</li>
                <li>Performance Logs</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
              © 2026 ShopEasy Enterprise. All rights reserved.
            </p>
            <div className="flex gap-3">
               {['A', 'W', 'S'].map(char => (
                 <div key={char} className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 border border-slate-100">
                   {char}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;