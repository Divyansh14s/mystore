import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../lib/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, search]);

  return (
    <main className="max-w-5xl mx-auto p-6">
      {status === 'loading' && <p>Loading products...</p>}
      {status === 'error' && <p>Something went wrong.</p>}

      {status === 'ready' && (
        <>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
            className="w-full max-w-sm border border-line rounded-full px-4 py-2 text-sm mb-4 outline-none focus:border-accent"
          />

          <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
            <button
              onClick={() => setActiveCategory('all')}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs border capitalize ${
                activeCategory === 'all' ? 'bg-ink text-white border-ink' : 'border-line'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs border capitalize ${
                  activeCategory === cat ? 'bg-ink text-white border-ink' : 'border-line'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}