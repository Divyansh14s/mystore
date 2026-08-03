import { useEffect, useState } from 'react';
import { fetchProducts } from './lib/api';

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
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title} — ${product.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;