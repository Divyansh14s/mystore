import { useEffect, useState } from 'react';
import { fetchProducts } from './lib/api';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink p-8">
      <h1 className="font-display text-2xl mb-6">mystore</h1>

      {status === 'loading' && <p>Loading products...</p>}
      {status === 'error' && <p>Something went wrong.</p>}

      {status === 'ready' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;