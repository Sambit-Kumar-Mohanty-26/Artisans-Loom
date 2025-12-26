"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { createPostAction } from "@/app/actions/forum";
import { toast } from "sonner";

export default function CreatePost() {
  const [isPosting, setIsPosting] = useState(false);
  const [content, setContent] = useState("");

  const handleSubmit = async (formData: FormData) => {
    if (!content.trim()) return;
    
    setIsPosting(true);
    await createPostAction(formData);
    
    setContent("");
    setIsPosting(false);
    toast.success("Posted to the Sabha!");
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E5DCCA] mb-8 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#2F334F] via-[#D4AF37] to-[#2F334F]"></div>
      
      <form action={handleSubmit} className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-[#FFF5E1] flex items-center justify-center border border-[#D4AF37]/30 shrink-0">
            <Sparkles className="w-6 h-6 text-[#D4AF37]" />
        </div>
        <div className="flex-1">
            <Textarea 
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your craft, ask a question, or tag @Mitra for AI help..."
              className="min-h-25 border-none bg-transparent resize-none text-lg placeholder:text-[#8C7B70]/50 focus-visible:ring-0 p-0"
              required
            />
            <div className="flex justify-between items-center mt-4 border-t border-[#E5DCCA] pt-4">
              <div className="text-xs text-[#D97742] font-medium flex items-center gap-1 animate-pulse">
                  <Sparkles className="w-3 h-3" /> AI Reply Active
              </div>
              <Button 
                type="submit" 
                disabled={isPosting || !content} 
                className="rounded-full bg-[#2F334F] hover:bg-[#1E2135] text-white px-6 transition-all"
              >
                {isPosting ? (
                   <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Posting...</>
                ) : (
                   <><Send className="w-4 h-4 mr-2" /> Post</>
                )}
              </Button>
            </div>
        </div>
      </form>
    </div>
  );
}