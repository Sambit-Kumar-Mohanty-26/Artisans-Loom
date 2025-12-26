import HeroSection from "@/components/landing/HeroSection";
import FeaturedSection from "@/components/landing/FeaturedSection";
import TrendingSection from "@/components/landing/TrendingSection";
import RegionalMap from "@/components/landing/RegionalMap";
import ArtisanSpotlight from "@/components/landing/ArtisanSpotlight";
import ImpactSection from "@/components/landing/ImpactSection";
import Footer from "@/components/landing/Footer";
import { prisma } from "@/lib/prisma"; //

export default async function LandingPage() {
  /**
   * [FIX]: We now fetch real products from the database instead of using
   * hardcoded data in the component. This ensures that the 'id' passed 
   * to the FeaturedSection matches a real record in Prisma.
   */
  const realProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { 
      createdAt: 'desc' 
    },
    // We include the artisan information if your UI displays 'By [Artisan Name]'
    include: {
      artisan: {
        include: {
          profile: true
        }
      }
    }
  });

  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <HeroSection />
      
      {/* [UPDATE]: Pass the fetched 'realProducts' as a prop. 
         This allows the 'Details' link to use 'product.id' (e.g., /shop/cm0x...)
      */}
      <FeaturedSection products={realProducts} />
      
      <TrendingSection />
      <RegionalMap />
      <ArtisanSpotlight />
      <ImpactSection />
      
      <Footer />
    </main>
  );
}