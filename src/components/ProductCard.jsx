import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-line rounded-2xl overflow-hidden flex flex-col">
      <div className="aspect-square bg-[#FBFBF9] flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-sm line-clamp-2 min-h-[2.5rem]">{product.title}</h3>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-mono text-base">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="px-3 py-1.5 rounded-full bg-ink text-white text-xs hover:bg-accent transition-colors"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}