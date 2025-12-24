// @ts-nocheck
import { onboardArtisanAction } from "@/app/actions/onboarding";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ArtisanOnboarding() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Welcome, Artisan!</CardTitle>
          <CardDescription>
            Share details about your craft so we can showcase your talents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={onboardArtisanAction} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Business Name</label>
              <Input 
                name="businessName" 
                placeholder="e.g., Sharma Handicrafts" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Craft Type</label>
              <Input 
                name="craftType" 
                placeholder="e.g., Pottery, Woodwork, Textiles" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Years of Experience</label>
              <Input 
                name="yearsOfExperience" 
                type="number" 
                placeholder="5" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input 
                name="location" 
                placeholder="e.g., Khurja, Uttar Pradesh" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">About Your Craft</label>
              <Textarea 
                name="bio" 
                placeholder="Tell us about your craft and heritage..." 
                required 
                rows={4}
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