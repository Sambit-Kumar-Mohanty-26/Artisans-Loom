"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link"; // ADDED: Link for navigation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ShoppingCart, Filter, Search, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Initialize filter states from URL search params
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [material, setMaterial] = useState(searchParams.get("material") || "All");
  const [region, setRegion] = useState(searchParams.get("region") || "All");
  const [minPrice, setMinPrice] = useState(searchParams.get("min") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") || "");

  const fetchProducts = async () => {
    setLoading(true);
    setError(false);
    try {
      const params = new URLSearchParams();
      if (sort !== "newest") params.append("sort", sort);
      if (category !== "All") params.append("category", category);
      if (material !== "All") params.append("material", material);
      if (region !== "All") params.append("region", region);
      if (minPrice) params.append("min", minPrice);
      if (maxPrice) params.append("max", maxPrice);

      const query = params.toString();
      const res = await fetch(`/api/products?${query}`);
      
      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();
      setProducts(data);
      
      // Update the URL browser bar without a full page refresh
      router.push(`/shop?${query}`, { scroll: false });
    } catch (err) {
      console.error("Shop Fetch Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch automatically when sort changes
  useEffect(() => {
    fetchProducts();
  }, [sort]);

  return (
    <main className="bg-[#FDFBF7] min-h-screen">
      <div className="container mx-auto py-10 px-4 flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR FILTERS */}
        <aside className="w-full lg:w-72 space-y-8 bg-white p-6 rounded-2xl border border-[#E5DCCA] shadow-sm h-fit sticky top-24">
          <div className="flex items-center gap-2 border-b pb-4">
            <Filter className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-xl font-serif font-bold text-[#4A3526]">Filters</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold text-[#8C7B70] uppercase tracking-wider">Sort By</label>
              <select 
                value={sort} 
                onChange={(e) => setSort(e.target.value)}
                className="w-full mt-2 p-2.5 bg-[#FDFBF7] border border-[#E5DCCA] rounded-lg text-[#4A3526] outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-[#8C7B70] uppercase tracking-wider">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full mt-2 p-2.5 bg-[#FDFBF7] border border-[#E5DCCA] rounded-lg outline-none focus:ring-2 focus:ring-[#D4AF37]">
                <option>All</option>
                <option>Home Decor</option>
                <option>Textiles</option>
                <option>Jewelry</option>
                <option>Pottery</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-[#8C7B70] uppercase tracking-wider">Material</label>
              <select value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full mt-2 p-2.5 bg-[#FDFBF7] border border-[#E5DCCA] rounded-lg outline-none focus:ring-2 focus:ring-[#D4AF37]">
                <option>All</option>
                <option>Silk</option>
                <option>Clay</option>
                <option>Metal</option>
                <option>Wood</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-[#8C7B70] uppercase tracking-wider">Region</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full mt-2 p-2.5 bg-[#FDFBF7] border border-[#E5DCCA] rounded-lg outline-none focus:ring-2 focus:ring-[#D4AF37]">
                <option>All</option>
                <option>Odisha</option>
                <option>Rajasthan</option>
                <option>Bihar</option>
                <option>Assam</option>
                <option>Karnataka</option>
                <option>Uttar Pradesh</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-[#8C7B70] uppercase tracking-wider">Price Range (₹)</label>
              <div className="flex gap-2 mt-2">
                <Input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="bg-[#FDFBF7]" />
                <Input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="bg-[#FDFBF7]" />
              </div>
            </div>

            <Button onClick={fetchProducts} className="w-full bg-[#2F334F] hover:bg-[#1E120B] text-white py-6 rounded-xl font-bold transition-all active:scale-95 shadow-md">
              Apply Filters
            </Button>
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <section className="flex-grow">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl text-center mb-8">
              <p className="font-bold">Could not fetch products. Please try again later.</p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="animate-spin w-12 h-12 text-[#D4AF37]" />
              <p className="text-[#8C7B70] font-medium">Gathering handcrafted treasures...</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-[#8C7B70]">Showing <strong>{products.length}</strong> unique crafts</p>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-[#E5DCCA]">
                  <Search className="w-12 h-12 text-[#E5DCCA] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#4A3526]">No products found</h3>
                  <p className="text-[#8C7B70] mt-2">Try adjusting your filters to find what you are looking for.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product: any) => (
                    <div key={product.id} className="group bg-white rounded-2xl border border-[#E5DCCA] overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="relative h-72 w-full overflow-hidden">
                        <Image 
                          src={product.images[0] || "/p1.png"} 
                          alt={product.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 backdrop-blur-sm text-[#4A3526] border-none shadow-sm">{product.category}</Badge>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-serif font-bold text-lg text-[#4A3526] line-clamp-1">{product.title}</h3>
                          <p className="text-xl font-bold text-[#D97742]">₹{product.price}</p>
                        </div>
                        <p className="text-xs text-[#8C7B70] mb-4 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#D4AF37]" /> 
                          {product.artisan?.profile?.state || "India"}
                        </p>
                        <p className="text-sm text-[#5D4037] line-clamp-2 mb-6 h-10">{product.description}</p>
                        
                        {/* WRAPPED IN LINK: Navigates to Phase 3 Details Page */}
                        <Link href={`/shop/${product.id}`}>
                          <Button className="w-full bg-white border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-bold rounded-xl gap-2 transition-all">
                            <ShoppingCart className="w-4 h-4" /> View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#D4AF37]" /></div>}>
      <ShopContent />
    </Suspense>
  );
}