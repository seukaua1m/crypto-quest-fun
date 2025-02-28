
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  finalBalance: number;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  isOpen,
  onClose,
  finalBalance,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleWithdrawal = () => {
    setIsLoading(true);
    
    // Simulate processing and then redirect to VSL page
    setTimeout(() => {
      navigate('/vsl', { state: { balance: finalBalance } });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-6 rounded-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Parabéns!</h2>
        <p className="mb-6 text-muted-foreground">
          Você completou a simulação com sucesso e acumulou R${finalBalance.toFixed(2)}. 
          Para sacar seus ganhos, assista um breve vídeo que explica como funciona o processo.
        </p>
        
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Voltar
          </Button>
          <Button
            onClick={handleWithdrawal}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin mr-2"></div>
                Processando...
              </>
            ) : (
              'Sacar Ganhos'
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default WithdrawalModal;
