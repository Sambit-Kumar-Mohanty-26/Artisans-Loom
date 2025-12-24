import { onboardCustomerAction } from "@/app/actions/onboarding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function CustomerOnboarding() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Welcome, Buyer!</CardTitle>
          <CardDescription>
            Tell us a bit about your interests so we can personalize your shop.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={onboardCustomerAction} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Favorite Craft Types (Tags)</label>
              <Input 
                name="craftTypes" 
                placeholder="e.g., Silk, Pottery, Woodwork" 
                required 
              />
              <p className="text-xs text-muted-foreground">Separate types with commas.</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Estimated Monthly Budget (₹)</label>
              <Input 
                name="budget" 
                type="number" 
                placeholder="5000" 
                required 
              />
            </div>
            
            <Button type="submit" className="w-full h-11 text-lg">
              Complete Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}