import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', address: '', card: '' });

  const shipping = items.length > 0 ? 4.99 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (items.length === 0 && !placed) {
    return (
      <main className="max-w-5xl mx-auto p-6 text-center py-20">
        <p className="text-sm text-muted mb-4">Your cart is empty.</p>
        <Link to="/" className="text-accent text-sm">Go find something</Link>
      </main>
    );
  }

  if (placed) {
    return (
      <main className="max-w-md mx-auto p-6 text-center py-24">
        <h1 className="font-display text-2xl mb-3">Order placed 🎉</h1>
        <p className="text-sm text-muted mb-6">
          This is a demo checkout — no real payment was made.
        </p>
        <Link to="/" className="bg-ink text-white rounded-full px-6 py-3 text-sm">
          Continue shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="text-sm text-muted mb-6">
        ← Back
      </button>

      <h1 className="font-display text-2xl mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name" required value={form.name} onChange={handleChange}
            placeholder="Full name"
            className="border border-line rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <input
            name="email" type="email" required value={form.email} onChange={handleChange}
            placeholder="Email"
            className="border border-line rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <input
            name="address" required value={form.address} onChange={handleChange}
            placeholder="Shipping address"
            className="border border-line rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <input
            name="card" required value={form.card} onChange={handleChange}
            placeholder="Card number (demo — 4242 4242 4242 4242)"
            className="border border-line rounded-lg px-4 py-2.5 text-sm font-mono outline-none focus:border-accent"
          />

          <button type="submit" className="bg-ink text-white rounded-full py-3 text-sm mt-2 hover:bg-accent transition-colors">
            Place order · ${total.toFixed(2)}
          </button>
        </form>

        <aside className="bg-white border border-line rounded-2xl p-5 h-fit">
          <h2 className="font-display text-lg mb-4">Order summary</h2>
          <ul className="flex flex-col gap-2 mb-4">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span className="text-muted">{item.qty} × {item.title}</span>
                <span className="font-mono">${(item.qty * item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-line pt-3 flex flex-col gap-1 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span className="font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Shipping</span>
              <span className="font-mono">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium pt-2">
              <span>Total</span>
              <span className="font-mono">${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}