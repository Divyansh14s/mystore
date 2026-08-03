import { useEffect, useState } from 'react';
import { fetchProducts } from './lib/api';
import ProductCard from './components/ProductCard';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';

function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="max-w-5xl mx-auto p-6">
        {status === 'loading' && <p>Loading products...</p>}
        {status === 'error' && <p>Something went wrong.</p>}

        {status === 'ready' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;