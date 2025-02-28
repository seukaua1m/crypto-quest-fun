
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import CryptoChart from './CryptoChart';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';

interface CryptoOperationProps {
  initialPrice: number;
  cryptoName: string;
  cryptoSymbol: string;
  stageAmount: number;
  stageNumber: number;
  onResult: (success: boolean, amount: number) => void;
}

const CryptoOperation: React.FC<CryptoOperationProps> = ({
  initialPrice,
  cryptoName,
  cryptoSymbol,
  stageAmount,
  stageNumber,
  onResult,
}) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<'up' | 'down' | null>(null);
  const [isUptrend, setIsUptrend] = useState<boolean | null>(null);
  const [operationComplete, setOperationComplete] = useState(false);
  const [showingResult, setShowingResult] = useState(false);
  const [timer, setTimer] = useState(15);

  // All stages will be uptrend to make it easier for users to win
  useEffect(() => {
    const willGoUp = true; // Always go up so user can win by selecting up
    setIsUptrend(willGoUp);
    
    let price = initialPrice;
    const times = Array.from({ length: 15 }, (_, i) => i + 1);
    
    const data = times.map((time) => {
      // Create a more pronounced upward trend for the simulation
      const randomFactor = Math.random() * 20 - 5; // Mostly positive fluctuations
      const trendFactor = 25 + randomFactor;
      
      price += trendFactor;
      
      return {
        time: `${time}s`,
        price: Math.max(price, 10),
      };
    });
    
    setChartData(data);
  }, [initialPrice, stageNumber]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && !selectedOption && !operationComplete) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer, selectedOption, operationComplete]);

  // Auto-select correct option after timer ends
  useEffect(() => {
    if (timer === 0 && !selectedOption) {
      // Automatically select the correct option (up) to ensure winning
      handleSelection('up');
    }
  }, [timer, selectedOption]);

  // Process result after selection
  useEffect(() => {
    if (selectedOption && !operationComplete) {
      const resultTimer = setTimeout(() => {
        setOperationComplete(true);
        const success = selectedOption === 'up'; // User wins if they select up
        
        setTimeout(() => {
          setShowingResult(true);
          // Play sound
          const audio = new Audio(success ? '/win-sound.mp3' : '/lose-sound.mp3');
          audio.volume = 0.5;
          audio.play().catch(e => console.error("Audio couldn't play:", e));
          
          setTimeout(() => {
            onResult(success, stageAmount);
          }, 2000);
        }, 500);
      }, 3000);
      
      return () => clearTimeout(resultTimer);
    }
  }, [selectedOption, operationComplete, stageAmount, onResult]);

  const handleSelection = (option: 'up' | 'down') => {
    if (!selectedOption && !operationComplete) {
      setSelectedOption(option);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-md mx-auto glass-card p-4 rounded-lg"
    >
      <div className="mb-4 flex justify-between items-center">
        <div className="flex flex-col items-start">
          <span className="text-xs text-muted-foreground">Criptomoeda</span>
          <h3 className="text-lg font-bold">{cryptoName} ({cryptoSymbol})</h3>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted-foreground">Valor da operação</span>
          <span className="font-bold text-primary">{formatCurrency(stageAmount)}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <CryptoChart 
          data={chartData} 
          isUptrend={isUptrend || false} 
          height={200}
          animated={selectedOption !== null}
        />
      </div>
      
      {!selectedOption && !operationComplete && (
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium mb-2">Para onde o preço vai?</h3>
          <div className="flex gap-4 justify-center">
            <Button 
              variant="outline" 
              className="flex-1 flex items-center justify-center gap-2 border-green-500 hover:bg-green-500/20"
              onClick={() => handleSelection('up')}
            >
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-green-500 font-medium">Alta</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 flex items-center justify-center gap-2 border-red-500 hover:bg-red-500/20"
              onClick={() => handleSelection('down')}
            >
              <TrendingDown className="w-5 h-5 text-red-500" />
              <span className="text-red-500 font-medium">Queda</span>
            </Button>
          </div>
          <div className="mt-4">
            <p className="text-muted-foreground text-sm">Selecione em {timer} segundos</p>
          </div>
        </div>
      )}
      
      {selectedOption && !showingResult && (
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium mb-2">Analisando o mercado...</h3>
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
          </div>
        </div>
      )}
      
      {showingResult && (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center mb-4"
        >
          <h3 className="text-2xl font-bold mb-2">
            {selectedOption === 'up' ? (
              <span className="text-green-500">Acertou! 🎉</span>
            ) : (
              <span className="text-red-500">Errou! 😔</span>
            )}
          </h3>
          <p className="text-muted-foreground">
            O mercado foi para cima e você apostou para {selectedOption === 'up' ? 'cima' : 'baixo'}.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CryptoOperation;
