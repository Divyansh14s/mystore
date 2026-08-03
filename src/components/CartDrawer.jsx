import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ open, onClose }) {
  const { items, setQty, removeFromCart, subtotal } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-ink/30" onClick={onClose} />

      <aside className="absolute right-0 top-0 h-full w-full max-w-sm bg-paper border-l border-line flex flex-col">
        <div className="flex items-center justify-between px-5 h-16 border-b border-line">
          <h2 className="font-display text-lg">Your cart</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-muted text-center mt-10">Cart is empty.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 pb-4 border-b border-line last:border-0">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-contain border border-line rounded-lg p-1.5" />
                  <div className="flex-1">
                    <p className="text-sm line-clamp-1">{item.title}</p>
                    <span className="font-mono text-sm">${item.price.toFixed(2)}</span>

                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => setQty(item.id, item.qty - 1)} className="w-6 h-6 border border-line rounded-full flex items-center justify-center">
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-mono w-4 text-center">{item.qty}</span>
                      <button onClick={() => setQty(item.id, item.qty + 1)} className="w-6 h-6 border border-line rounded-full flex items-center justify-center">
                        <Plus size={12} />
                      </button>
                      <button onClick={() => removeFromCart(item.id)} className="ml-auto text-muted hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line p-5">
            <div className="flex justify-between text-sm mb-3">
              <span>Subtotal</span>
              <span className="font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-ink text-white rounded-full py-3 text-sm hover:bg-accent transition-colors">
              Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}