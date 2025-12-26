import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, UserPlus, Check } from "lucide-react";
import { toggleFollowAction } from "@/app/actions/forum";
import { format } from "date-fns";

export default async function ProfilePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { userId } = await auth();
  const { id } = await params;

  const currentUser = userId ? await prisma.user.findUnique({ where: { clerkId: userId } }) : null;

  const artisan = await prisma.user.findUnique({
    where: { id: id },
    include: {
      profile: true,
      _count: { 
        select: { 
          products: true, 
          followedBy: true, 
          following: true 
        } 
      },
      followedBy: { 
        where: { followerId: currentUser?.id || "invalid_id" } 
      } 
    }
  });

  if (!artisan) return <div className="p-10 text-center">User not found</div>;

  const isFollowing = artisan.followedBy.length > 0;
  const isMe = currentUser?.id === artisan.id;

  return (
    <div className="max-w-4xl mx-auto min-h-screen pb-20 space-y-8">
      
      <div className="bg-white rounded-4xl p-8 border border-[#E5DCCA] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-r from-[#2F334F] to-[#1A1D2E]"></div>
        
        <div className="relative flex flex-col md:flex-row items-end gap-6 pt-16 px-4">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-[#D4AF37] flex items-center justify-center text-4xl text-white font-bold overflow-hidden">
             {artisan.name?.[0] || "A"}
          </div>
          
          <div className="flex-1 mb-2">
             <h1 className="text-3xl font-serif font-bold text-[#4A3526]">{artisan.name}</h1>
             <p className="text-[#8C7B70]">{artisan.profile?.businessName || "Artisan Studio"}</p>
             
             <div className="flex gap-4 mt-3 text-sm text-[#5D4037]">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {artisan.profile?.location || "India"}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined {format(new Date(artisan.createdAt), 'MMM yyyy')}</span>
             </div>
          </div>

          {!isMe && currentUser && (
            <form action={toggleFollowAction.bind(null, artisan.id)}>
               <Button className={`h-12 px-8 rounded-full shadow-lg transition-all ${isFollowing ? "bg-white text-[#2F334F] border border-[#2F334F]" : "bg-[#D97742] text-white hover:bg-[#C26635]"}`}>
                  {isFollowing ? <><Check className="w-4 h-4 mr-2" /> Following</> : <><UserPlus className="w-4 h-4 mr-2" /> Follow</>}
               </Button>
            </form>
          )}
        </div>

        <div className="flex gap-12 mt-8 px-4 pt-6 border-t border-[#E5DCCA]">
           <div>
              <p className="text-2xl font-bold text-[#4A3526]">{artisan._count.products}</p>
              <p className="text-xs uppercase tracking-wider text-[#8C7B70]">Products</p>
           </div>
           <div>
              <p className="text-2xl font-bold text-[#4A3526]">{artisan._count.followedBy}</p>
              <p className="text-xs uppercase tracking-wider text-[#8C7B70]">Followers</p>
           </div>
           <div>
              <p className="text-2xl font-bold text-[#4A3526]">{artisan._count.following}</p>
              <p className="text-xs uppercase tracking-wider text-[#8C7B70]">Following</p>
           </div>
        </div>
      </div>

      {artisan.profile?.bio && (
        <div className="bg-[#FFFBF5] p-6 rounded-2xl border border-[#E5DCCA]">
           <h3 className="font-serif font-bold text-[#4A3526] mb-2">About the Artisan</h3>
           <p className="text-[#5D4037] leading-relaxed">{artisan.profile.bio}</p>
        </div>
      )}

    </div>
  );
}