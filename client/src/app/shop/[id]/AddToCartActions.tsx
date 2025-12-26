"use client";

import { useCartStore } from "@/store/useCartStore"; //
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus } from "lucide-react";
import { toast } from "sonner"; //
import { useState, useEffect } from "react";

export default function AddToCartActions({ product }: { product: any }) {
  const addToCart = useCartStore((state) => state.addToCart); //
  const items = useCartStore((state) => state.items); //
  
  // Find the current product's quantity in the cart
  const cartItem = items.find((i) => i.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // State for the "pop" animation
  const [isAnimate, setIsAnimate] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || "/p1.png",
      quantity: 1
    });

    // Trigger the animation
    setIsAnimate(true);
    toast.success(`${product.title} added to cart!`);
  };

  // Reset animation state after it finishes
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
          {/* Numerical count animation badge */}
          {quantity > 0 && (
            <span 
              className={`absolute -top-3 -right-3 bg-[#D97742] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#2F334F] transition-all duration-300 ${
                isAnimate ? "scale-125 animate-bounce" : "scale-100"
              }`}
            >
              {quantity}
            </span>
          )}
        </div>
        <span>{quantity > 0 ? "Add More" : "Add to Cart"}</span>
      </Button>

      <Button 
        variant="outline" 
        className="flex-1 h-14 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/5 text-lg font-bold rounded-2xl transition-all"
      >
        Buy Now
      </Button>
    </div>
  );
}