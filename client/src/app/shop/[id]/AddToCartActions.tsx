"use client";

import { useCartStore } from "@/store/useCartStore"; //
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation"; // For navigation
import { useState, useEffect } from "react";

// Matches the type expected in your page.tsx
interface ProductProps {
  product: {
    id: string;
    title: string;
    price: number;
    images: string[];
  };
}

export default function AddToCartActions({ product }: ProductProps) {
  const { addToCart, clearCart, setIsOpen, items } = useCartStore(); //
  const router = useRouter();
  
  const cartItem = items.find((i) => i.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const [isAnimate, setIsAnimate] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || "/p1.png",
      quantity: 1
    });
    setIsAnimate(true);
  };

  // Direct "Buy Now" logic
  const handleBuyNow = () => {
    // 1. Clear current cart to focus only on this item
    clearCart(); 
    // 2. Add this specific item
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || "/p1.png",
      quantity: 1
    });
    // 3. Close drawer and go to checkout
    setIsOpen(false); 
    router.push("/checkout"); 
  };

  useEffect(() => {
    if (isAnimate) {
      const timer = setTimeout(() => setIsAnimate(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimate]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-10">
      <Button 
        onClick={handleAddToCart}
        className={`flex-1 h-14 bg-[#2F334F] hover:bg-[#1E2135] text-white text-lg font-bold rounded-2xl shadow-lg gap-3 transition-all active:scale-95 ${
          isAnimate ? "scale-105" : "scale-100"
        }`}
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5" />
          {quantity > 0 && (
            <span key={quantity} className="absolute -top-3 -right-3 bg-[#D97742] text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#2F334F] animate-in zoom-in duration-300">
              {quantity}
            </span>
          )}
        </div>
        <span>{quantity > 0 ? "Add More" : "Add to Cart"}</span>
      </Button>

      <Button 
        onClick={handleBuyNow} // Activates Buy Now
        variant="outline" 
        className="flex-1 h-14 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/5 text-lg font-bold rounded-2xl transition-all active:scale-95"
      >
        Buy Now
      </Button>
    </div>
  );
}