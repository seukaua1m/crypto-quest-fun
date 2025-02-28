
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import CryptoOperation from '@/components/CryptoOperation';
import Notification from '@/components/Notification';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  createNotificationData, 
  getRandomItem, 
  cryptoCurrencies,
  playSoundEffect
} from '@/lib/utils';
import { ArrowRight, Trophy } from 'lucide-react';

const INITIAL_BALANCE = 30;
const TARGET_BALANCE = 500;
const TOTAL_STAGES = 5;

// Stage multipliers determine how much of current balance is at stake
const STAGE_MULTIPLIERS = [0.5, 0.6, 0.7, 0.8, 0.9];

const Game = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [currentStage, setCurrentStage] = useState(0);
  const [stageComplete, setStageComplete] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [crypto, setCrypto] = useState(getRandomItem(cryptoCurrencies));
  
  // Create random notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver && Math.random() > 0.6) {
        setNotifications(prev => [...prev, createNotificationData()]);
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [gameOver]);
  
  // Remove notification after it closes
  const removeNotification = (index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index));
  };
  
  // Calculate stage amount based on current balance and stage multiplier
  const calculateStageAmount = () => {
    const multiplier = STAGE_MULTIPLIERS[currentStage];
    return Math.floor(balance * multiplier);
  };
  
  // Handle result of a crypto operation
  const handleOperationResult = (success: boolean, amount: number) => {
    const stageAmount = calculateStageAmount();
    
    if (success) {
      // Win - add 100% of stage amount
      const newBalance = balance + stageAmount;
      setBalance(newBalance);
      playSoundEffect(true);
      
      // Check if reached target
      if (newBalance >= TARGET_BALANCE) {
        setGameWon(true);
        setGameOver(true);
      }
    } else {
      // Lose - subtract 50% of stage amount
      const lossAmount = Math.floor(stageAmount * 0.5);
      const newBalance = Math.max(balance - lossAmount, 0);
      setBalance(newBalance);
      playSoundEffect(false);
      
      // Check if balance is too low to continue
      if (newBalance < 10) {
        setGameOver(true);
      }
    }
    
    setStageComplete(true);
  };
  
  // Move to next stage
  const goToNextStage = () => {
    if (currentStage < TOTAL_STAGES - 1) {
      setCurrentStage(currentStage + 1);
      setStageComplete(false);
      setCrypto(getRandomItem(cryptoCurrencies));
    } else {
      // Final stage complete
      setGameOver(true);
      setGameWon(balance >= TARGET_BALANCE);
    }
  };
  
  // Restart game
  const restartGame = () => {
    setBalance(INITIAL_BALANCE);
    setCurrentStage(0);
    setStageComplete(false);
    setGameOver(false);
    setGameWon(false);
    setCrypto(getRandomItem(cryptoCurrencies));
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      <Header balance={balance} />
      
      <div className="pt-20 px-4 container max-w-lg mx-auto">
        <div className="mb-6 text-center">
          <div className="inline-block glass-card px-4 py-2">
            <span className="text-muted-foreground">Etapa </span>
            <span className="font-bold">{currentStage + 1}</span>
            <span className="text-muted-foreground"> de {TOTAL_STAGES}</span>
          </div>
          
          <div className="mt-2">
            <h2 className="text-2xl font-bold">
              {gameOver 
                ? (gameWon ? 'Parabéns!' : 'Game Over!') 
                : (stageComplete ? 'Etapa Concluída!' : 'Faça sua operação')}
            </h2>
            <p className="text-muted-foreground">
              {gameOver 
                ? (gameWon ? 'Você alcançou o objetivo!' : 'Não foi dessa vez...') 
                : (stageComplete ? 'Prepare-se para a próxima etapa' : 'Preveja a direção do mercado')}
            </p>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {gameOver ? (
            <motion.div
              key="game-over"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-6 rounded-lg text-center"
            >
              {gameWon ? (
                <>
                  <div className="mb-4 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                      <Trophy className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Missão Cumprida!</h3>
                  <p className="text-muted-foreground mb-6">
                    Você transformou R$30 em R${balance.toFixed(2)}!
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-2">Fim de Jogo</h3>
                  <p className="text-muted-foreground mb-6">
                    Você terminou com R${balance.toFixed(2)}
                  </p>
                </>
              )}
              
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => navigate('/')}>
                  Voltar ao Início
                </Button>
                <Button onClick={restartGame}>
                  Tentar Novamente
                </Button>
              </div>
            </motion.div>
          ) : stageComplete ? (
            <motion.div
              key="stage-complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-6 rounded-lg text-center"
            >
              <h3 className="text-xl font-bold mb-4">Próxima Etapa</h3>
              <p className="text-muted-foreground mb-6">
                Saldo atual: <span className="text-primary font-bold">R${balance.toFixed(2)}</span>
              </p>
              
              <Button 
                size="lg" 
                onClick={goToNextStage}
                className="px-8 group"
              >
                Continuar
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="crypto-operation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CryptoOperation
                initialPrice={crypto.price}
                cryptoName={crypto.name}
                cryptoSymbol={crypto.symbol}
                stageAmount={calculateStageAmount()}
                onResult={handleOperationResult}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Notifications */}
      {notifications.map((notification, index) => (
        <Notification
          key={index}
          username={notification.username}
          message={notification.message}
          profit={notification.profit}
          avatar={notification.avatar}
          onClose={() => removeNotification(index)}
        />
      ))}
    </div>
  );
};

export default Game;
