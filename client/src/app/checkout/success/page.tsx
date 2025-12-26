"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[3rem] border border-[#E5DCCA] shadow-xl text-center space-y-6 animate-in zoom-in duration-500">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-bold text-[#4A3526]">Order Placed!</h1>
          <p className="text-[#8C7B70]">Your handmade treasure is being prepared by the artisan.</p>
        </div>

        <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E5DCCA] flex items-center gap-4 text-left">
          <Package className="w-6 h-6 text-[#D4AF37]" />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#8C7B70]">Estimated Delivery</p>
            <p className="text-sm font-bold text-[#4A3526]">7-10 Business Days</p>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <Link href="/shop">
            <Button className="w-full h-12 bg-[#2F334F] hover:bg-[#1E2135] text-white font-bold rounded-xl gap-2">
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <p className="text-xs text-[#8C7B70]">A confirmation email has been sent to your inbox.</p>
        </div>
      </div>
    </div>
  );
}