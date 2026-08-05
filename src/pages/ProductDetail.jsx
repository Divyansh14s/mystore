import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProduct } from '../lib/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const { addToCart } = useCart();

  useEffect(() => {
    setStatus('loading');
    fetchProduct(id)
      .then((data) => {
        setProduct(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [id]);

  if (status === 'loading') return <p className="p-6">Loading...</p>;
  if (status === 'error' || !product) return <p className="p-6">Product not found.</p>;

  return (
    <main className="max-w-5xl mx-auto p-6">
      <Link to="/" className="text-sm text-muted mb-6 inline-block">← Back to shop</Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="aspect-square bg-white border border-line rounded-2xl flex items-center justify-center p-10">
          <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
        </div>

        <div>
          <span className="text-xs uppercase text-accent">{product.category}</span>
          <h1 className="font-display text-2xl my-3">{product.title}</h1>
          <p className="text-sm text-muted mb-6">{product.description}</p>
          <span className="font-mono text-2xl block mb-6">${product.price.toFixed(2)}</span>

          <button
            onClick={() => {
                addToCart(product);
                toast.success('Added to cart');
            }}
            className="bg-ink text-white rounded-full px-6 py-3 text-sm hover:bg-accent transition-colors"
            >
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}