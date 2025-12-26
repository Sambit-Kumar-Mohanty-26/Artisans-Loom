"use client";

import { useCartStore } from "@/store/useCartStore"; //
import { X, Minus, Plus, ShoppingBag, Trash2, Eraser } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner"; // For a clear confirmation message

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!mounted) return null;

  const handleClearCart = () => {
    // Optional: Add a confirmation check
    if (confirm("Are you sure you want to clear all items from your Loom?")) {
      clearCart(); //
      toast.info("Cart cleared successfully");
    }
  };

  return (
    <>
      {/* OVERLAY */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* DRAWER */}
      <aside className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#FDFBF7] z-[101] shadow-2xl transition-transform duration-500 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          
          {/* HEADER */}
          <div className="p-6 border-b border-[#E5DCCA] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl font-serif font-bold text-[#4A3526]">Your Loom</h2>
              <span className="text-sm text-[#8C7B70]">({items.length})</span>
            </div>
            
            <div className="flex items-center gap-2">
              {/* CLEAR CART BUTTON: Only shows if there are items */}
              {items.length > 0 && (
                <button 
                  onClick={handleClearCart}
                  className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-red-50 transition-colors mr-2"
                >
                  <Eraser className="w-3.5 h-3.5" /> Clear All
                </button>
              )}
              
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-[#FDFBF7] rounded-full transition-colors">
                <X className="w-6 h-6 text-[#4A3526]" />
              </button>
            </div>
          </div>

          {/* ITEMS LIST */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-[#FDFBF7] rounded-full flex items-center justify-center border-2 border-dashed border-[#E5DCCA]">
                  <ShoppingBag className="w-8 h-8 text-[#E5DCCA]" />
                </div>
                <p className="text-[#8C7B70] font-medium text-lg">Your loom is empty</p>
                <Button onClick={() => setIsOpen(false)} variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all">Start Shopping</Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 group animate-in slide-in-from-right-4 duration-300">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#E5DCCA] flex-shrink-0 shadow-sm">
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-[#4A3526] text-sm line-clamp-1">{item.title}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-[#8C7B70] hover:text-red-500 transition-colors p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[#D97742] font-bold mt-1">₹{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-[#E5DCCA] rounded-lg bg-white overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 hover:bg-[#FDFBF7] hover:text-[#D4AF37] transition-colors border-r border-[#E5DCCA]"><Minus className="w-3 h-3" /></button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 hover:bg-[#FDFBF7] hover:text-[#D4AF37] transition-colors border-l border-[#E5DCCA]"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E5DCCA] bg-white space-y-4 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
              <div className="flex justify-between items-center text-[#4A3526]">
                <span className="text-[#8C7B70] font-medium">Subtotal</span>
                <span className="text-2xl font-serif font-bold">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="space-y-3">
                <Button className="w-full h-14 bg-[#2F334F] hover:bg-[#1E2135] text-white text-lg font-bold rounded-xl shadow-lg transition-all active:scale-95">
                  Checkout Now
                </Button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-sm font-medium text-[#8C7B70] hover:text-[#4A3526] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}