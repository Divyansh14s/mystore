import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onCartOpen }) {
  const { count } = useCart();

  return (
    <header className="sticky top-0 bg-paper border-b border-line">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-display text-xl">mystore</span>

        <button
          onClick={onCartOpen}
          className="relative flex items-center gap-2 px-3 py-2 rounded-full border border-line hover:border-ink transition-colors"
        >
          <ShoppingBag size={18} />
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}