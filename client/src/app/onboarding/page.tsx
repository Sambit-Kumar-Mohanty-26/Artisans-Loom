import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hammer, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-50">
      <div className="max-w-2xl text-center mb-12">
        <h1 className="text-4xl font-serif mb-4 text-primary">Welcome to Artisan's Loom</h1>
        <p className="text-muted-foreground text-lg">
          To provide you with the best experience, please tell us how you would like to use the platform.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Artisan Path */}
        <Card className="hover:border-primary transition-all hover:shadow-md group">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
              <Hammer className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl">Join as Artisan</CardTitle>
            <CardDescription className="mt-2">
              Showcase your heritage, sell handcrafted masterpieces, and grow your business.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/onboarding/artisan" className="w-full">
              <Button className="w-full h-12 text-lg">Start Selling</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Buyer Path */}
        <Card className="hover:border-primary transition-all hover:shadow-md group">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl">Join as Buyer</CardTitle>
            <CardDescription className="mt-2">
              Discover authentic crafts directly from India's finest artisans and support local talent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/onboarding/customer" className="w-full">
              <Button className="w-full h-12 text-lg" variant="outline">Start Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}