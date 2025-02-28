
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  finalBalance: number;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({ 
  isOpen, 
  onClose,
  finalBalance 
}) => {
  const handleRedirect = () => {
    // Redirect to sales page with the updated URL
    window.location.href = "https://zeuzdrm.shop/summer/";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Parabéns!
          </DialogTitle>
          <DialogDescription className="text-center mt-2">
            Você acumulou <span className="font-bold text-primary">R${finalBalance.toFixed(2)}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-6 p-4 rounded-lg bg-muted">
          <h3 className="text-lg font-semibold mb-2">Para sacar seus ganhos:</h3>
          <p className="text-muted-foreground mb-4">
            Você precisa assistir um vídeo curto que explica como profissionais utilizam estas mesmas estratégias no mercado real.
          </p>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex justify-center"
        >
          <Button 
            size="lg" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleRedirect}
          >
            Assistir e Sacar Agora <ExternalLink className="w-4 h-4" />
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawalModal;
