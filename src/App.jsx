import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import { Toaster } from 'react-hot-toast';

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#15171F',
            color: '#F7F7F4',
            fontSize: '13px',
            borderRadius: '999px',
            padding: '10px 16px',
          },
        }}
      />
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;