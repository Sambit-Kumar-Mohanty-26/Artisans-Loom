"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Copy, Loader2, Instagram, Mail, Globe } from "lucide-react";
import { generateMarketingCopy } from "@/app/actions/marketing";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    category: string;
    materials: string[];
    description: string;
  };
}

export default function MarketingGeneratorModal({ isOpen, onClose, product }: Props) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const copy = await generateMarketingCopy({
        ...product,
        language: "English" // Defaulting to English, can be expanded to use language store
      });
      setResults(copy);
      toast.success("Marketing story crafted!");
    } catch (err: any) {
      toast.error(err.message || "AI failed to generate copy.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#FDFBF7] rounded-[2rem] border-[#D4AF37]/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold text-[#4A3526] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#D4AF37]" /> AI Marketing Studio
          </DialogTitle>
          <DialogDescription className="text-[#8C7B70]">
            Generating a unique heritage story for: <span className="font-bold text-[#D97742]">{product.title}</span>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          {!results ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-[#E5DCCA]">
                <Sparkles className={`w-10 h-10 text-[#D4AF37] ${loading ? "animate-pulse" : ""}`} />
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={loading}
                className="bg-[#2F334F] text-white rounded-xl h-12 px-8"
              >
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Weaving your story...</> : "Start AI Generation"}
              </Button>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              {/* DESCRIPTION CARD */}
              <div className="bg-white p-6 rounded-2xl border border-[#E5DCCA] shadow-sm relative group">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                    <Globe className="w-4 h-4" /> Story Description
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(results.seoDescription)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <h4 className="text-lg font-serif font-bold text-[#4A3526] mb-2">{results.storyTitle}</h4>
                <p className="text-[#5D4037] text-sm whitespace-pre-line leading-relaxed">{results.seoDescription}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* SOCIAL POST */}
                <div className="bg-[#FFFBF5] p-5 rounded-2xl border border-[#D4AF37]/20 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2 text-[#E1306C] font-bold text-xs">
                      <Instagram className="w-4 h-4" /> Social Post
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(results.instagramPost)}>
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <p className="text-xs text-[#8C7B70] italic line-clamp-4">{results.instagramPost}</p>
                </div>

                {/* EMAIL SUBJECT */}
                <div className="bg-[#FFFBF5] p-5 rounded-2xl border border-[#D4AF37]/20 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2 text-[#2F334F] font-bold text-xs">
                      <Mail className="w-4 h-4" /> Newsletter Subject
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(results.emailSubject)}>
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <p className="text-sm font-bold text-[#4A3526]">{results.emailSubject}</p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleGenerate} 
                disabled={loading}
                className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/5"
              >
                {loading ? "Re-weaving..." : "Regenerate Different Version"}
              </Button>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}