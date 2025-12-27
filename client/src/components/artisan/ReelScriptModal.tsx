"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video, Copy, Loader2, Film } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Scene {
  visual: string;
  voiceover: string;
  onScreenText: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  script: { scenes: Scene[] } | null;
  isLoading: boolean;
  productName: string;
}

export default function ReelScriptModal({ isOpen, onClose, script, isLoading, productName }: Props) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-[#FDFBF7] rounded-[2rem] border-[#D4AF37]/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold text-[#4A3526] flex items-center gap-2">
            <Video className="w-6 h-6 text-[#D97742]" /> Reel Script: {productName}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[75vh] pr-4">
          {isLoading ? (
            <div className="py-20 text-center space-y-4">
              <Loader2 className="w-12 h-12 text-[#D4AF37] animate-spin mx-auto" />
              <p className="font-serif text-[#8C7B70]">Directing your viral masterpiece...</p>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              {script?.scenes.map((scene, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E5DCCA] shadow-sm space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">Scene {idx + 1}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-[#8C7B70] uppercase">Visual</p>
                      <p className="text-sm text-[#4A3526] italic">{scene.visual}</p>
                    </div>
                    <div className="space-y-1 bg-[#FDFBF7] p-3 rounded-lg border border-dashed border-[#E5DCCA]">
                      <p className="text-[10px] font-bold text-[#8C7B70] uppercase">Voiceover</p>
                      <p className="text-sm text-[#4A3526] font-medium">"{scene.voiceover}"</p>
                      <Button variant="ghost" size="sm" className="h-6 w-full mt-2" onClick={() => copyToClipboard(scene.voiceover)}>
                        <Copy className="w-3 h-3 mr-1" /> Copy Speech
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-[#8C7B70] uppercase">On-Screen Text</p>
                      <p className="text-sm font-bold text-[#D97742] uppercase">{scene.onScreenText}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="bg-[#2F334F] p-6 rounded-2xl text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Film className="w-5 h-5 text-[#D4AF37]" />
                  <p className="text-sm">Pro Tip: Keep transitions fast and use trending artisan music!</p>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}