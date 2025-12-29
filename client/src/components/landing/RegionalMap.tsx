"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Compass, Lightbulb } from "lucide-react";
import Image from "next/image";
import { RoyalDivider } from "@/components/ui/royal-divider";
import Link from "next/link"; 

const allRegions = [
  {
    id: 1,
    title: "The Desert Weavers",
    subtitle: "Rajasthan & Gujarat",
    desc: "Vibrant Bandhani & camel wool weaves.",
    icon: "🏜️",
    color: "border-[#D97742]",
  },
  {
    id: 2,
    title: "The Eastern Painters",
    subtitle: "Odisha & West Bengal",
    desc: "Intricate Pattachitra & terracotta temples.",
    icon: "🎨",
    color: "border-[#D4AF37]",
  },
  {
    id: 3,
    title: "Southern Temple Crafts",
    subtitle: "Tamil Nadu & Karnataka",
    desc: "Bronze casting & Kanjivaram silk.",
    icon: "🛕",
    color: "border-[#2F334F]",
  },
  {
    id: 4,
    title: "Himalayan Artisans",
    subtitle: "Kashmir & Himachal",
    desc: "Pashmina shawls & wood carving.",
    icon: "🏔️",
    color: "border-[#4A3526]",
  },
  {
    id: 5,
    title: "Western Maritime Crafts",
    subtitle: "Gujarat & Maharashtra",
    desc: "Ship building & coastal textile traditions.",
    icon: "⚓",
    color: "border-[#1E88E5]",
  },
  {
    id: 6,
    title: "Northeastern Weavers",
    subtitle: "Assam & Meghalaya",
    desc: "Traditional silk weaving & bamboo crafts.",
    icon: "🎋",
    color: "border-[#8E24AA]",
  },
  {
    id: 7,
    title: "Central Tribal Artisans",
    subtitle: "Madhya Pradesh & Chhattisgarh",
    desc: "Gond art & tribal pottery traditions.",
    icon: "🎨",
    color: "border-[#00897B]",
  },
  {
    id: 8,
    title: "Bengal Craft Masters",
    subtitle: "West Bengal & Bihar",
    desc: "Dhokra metalwork & handloom textiles.",
    icon: "🧵",
    color: "border-[#F57C00]",
  },
];

const getRandomRegions = (count = 4) => {
  const shuffled = [...allRegions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function RegionalMap() {
  const [displayedRegions, setDisplayedRegions] = useState(getRandomRegions(4));

  const handleInspireMe = () => {
    setDisplayedRegions(getRandomRegions(4));
  };

  return (
    <section className="relative w-full py-24 overflow-hidden bg-[#FDFBF7]">
      
      <div className="absolute inset-0 bg-linear-to-b from-[#FDFBF7] via-[#FFF8E7] to-[#F2E6D8]" />
      <div className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-[#D97742]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 container mx-auto px-4 lg:px-8">
        
        <div className="text-center mb-16 space-y-6">
          
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#4A3526]">
            Follow the Threads of <span className="bg-clip-text text-transparent bg-linear-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] animate-shine">Tradition</span>
          </h2>
          <p className="text-[#5D4037] text-lg max-w-2xl mx-auto font-medium">
             Embark on a curated journey through India’s craft corridors.
          </p>
          
          <div className="flex justify-center">
             <Button 
                variant="outline" 
                className="h-10 px-6 rounded-full bg-[#FFFBF5] border-[#D4AF37]/50 text-[#8C7B70] hover:text-[#D4AF37] hover:border-[#D4AF37] shadow-sm gap-2 transition-all hover:shadow-md hover:scale-105 active:scale-95"
                onClick={handleInspireMe}
             >
                <Lightbulb className="w-4 h-4 animate-spin-slow" /> Inspire Me
             </Button>
          </div>

          <div className="flex justify-center scale-100 pt-4">
            <RoyalDivider />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          <div className="lg:col-span-7 relative h-full min-h-125">
             <div className="relative w-full h-full rounded-4xl overflow-hidden border-[6px] border-white shadow-2xl shadow-[#D4AF37]/10 bg-[#F3E5AB]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-40 mix-blend-multiply z-10"></div>
                
                <Image 
                  src="/map.png" 
                  alt="Vintage Map of India"
                  fill
                  className="object-cover mix-blend-multiply opacity-80 p-8 sepia-[.3]" 
                />

                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(74,53,38,0.3)] z-20 pointer-events-none"></div>

                <div className="absolute top-[35%] left-[25%] z-30 group cursor-pointer">
                   <div className="w-4 h-4 bg-[#D97742] rounded-full animate-ping absolute"></div>
                   <div className="w-4 h-4 bg-[#D97742] rounded-full border-2 border-white shadow-lg relative"></div>
                   <div className="absolute left-6 -top-2 bg-[#FFFBF5] px-3 py-1 rounded-md shadow-md border border-[#D4AF37]/20 text-xs font-bold text-[#4A3526] opacity-0 group-hover:opacity-100 transition-opacity">Rajasthan</div>
                </div>
             </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-8">

             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               {displayedRegions.map((region, index) => (
                  <div 
                    key={region.id} 
                    className="relative group bg-[#FFFBF5] rounded-2xl p-8 border border-[#E5DCCA] shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 min-h-55 flex flex-col justify-center opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                                   
                     <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37]/30 rounded-tl-lg group-hover:border-[#D4AF37] transition-colors"></div>
                     <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37]/30 rounded-tr-lg group-hover:border-[#D4AF37] transition-colors"></div>
                     <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37]/30 rounded-bl-lg group-hover:border-[#D4AF37] transition-colors"></div>
                     <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37]/30 rounded-br-lg group-hover:border-[#D4AF37] transition-colors"></div>
             
                     <div className="mb-4 text-4xl opacity-20 group-hover:opacity-100 transition-all duration-300">{region.icon}</div>
             
                     <h3 className="text-xl font-serif font-bold text-[#4A3526] leading-tight mb-2 group-hover:text-[#D97742] transition-colors">
                        {region.title}
                     </h3>
                     <p className="text-[11px] font-bold text-[#8C7B70] uppercase tracking-wider mb-3">
                        {region.subtitle}
                     </p>
                     <p className="text-sm text-[#5D4037] leading-relaxed">
                        {region.desc}
                     </p>
                                  
                     <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
                        <span className="text-sm font-medium text-[#D97742] flex items-center gap-1">
                           Discover More <ArrowRight className="w-3 h-3" />
                        </span>
                     </div>
                  </div>
               ))}
             </div>

             <div className="flex flex-col sm:flex-row gap-4 pt-4">

                <div className="flex-1 group relative rounded-xl p-0.5 bg-linear-to-b from-[#F3E5AB] via-[#D4AF37] to-[#8B6508] shadow-lg hover:shadow-[#D4AF37]/40 transition-shadow">
                   <Link href="/atlas" className="w-full">
                     <Button className="w-full h-14 rounded-[10px] bg-[#FFFBF5] hover:bg-[#FFF5E1] text-[#4A3526] text-base font-serif font-medium border-none shadow-inner">
                        Launch Interactive Map
                     </Button>
                   </Link>
                </div>

                <div className="flex-1 group relative rounded-xl p-0.5 bg-linear-to-b from-[#F3E5AB] via-[#D4AF37] to-[#8B6508] shadow-lg hover:shadow-[#2F334F]/40 transition-shadow">
                     <Link href="/craft-atlas">
                        <Button className="w-full h-14 rounded-[10px] bg-[#2F334F] hover:bg-[#1E2135] text-[#FDFBF7] text-base font-serif font-medium border-none shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] relative overflow-hidden">
                           <span className="relative z-10 flex items-center gap-2">
                               View Craft Atlas <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                           </span>
                     <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        </Button>
                     </Link>
                </div>                     

             </div>

          </div>

        </div>

      </div>
    </section>
  );
}