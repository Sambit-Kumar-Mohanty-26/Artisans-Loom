"use client";

import UniversalBackButton from "@/components/ui/BackButton";

export default function BackButton() {
  return (
    <UniversalBackButton 
      position="top-left" 
      customClass="w-16 h-16"
      fallbackUrl="/shop"
    />
  );
}