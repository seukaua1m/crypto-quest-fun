
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import CryptoOperation from '@/components/CryptoOperation';
import WithdrawalModal from '@/components/WithdrawalModal';
import Notification from '@/components/Notification';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  createNotificationData, 
  getRandomItem, 
  cryptoCurrencies,
  playSoundEffect
} from '@/lib/utils';
import { ArrowRight, BarChart3 } from 'lucide-react';

const INITIAL_BALANCE = 30;
const TARGET_BALANCE = 500;
const TOTAL_STAGES = 5;

// Predefined stage outcomes to ensure:
// 1. User wins at least 4 out of 5 stages
// 2. Final balance is exactly R$500
const STAGE_OUTCOMES = [
  { shouldWin: true, multiplier: 2.0 },   // Stage 1: Double money (60)
  { shouldWin: true, multiplier: 2.0 },   // Stage 2: Double money (120)
  { shouldWin: true, multiplier: 1.5 },   // Stage 3: 1.5x money (180)
  { shouldWin: false, multiplier: 0.5 },  // Stage 4: Lose half (90) - the one loss
  { shouldWin: true, multiplier: 4.56 },  // Stage 5: Final boost to reach 500
];

const Simulation = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [currentStage, setCurrentStage] = useState(0);
  const [stageComplete, setStageComplete] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [crypto, setCrypto] = useState(getRandomItem(cryptoCurrencies));
  
  // Create random notifications more frequently for simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!simulationComplete && Math.random() > 0.4) {
        setNotifications(prev => [...prev, createNotificationData()]);
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [simulationComplete]);
  
  // Remove notification after it closes
  const removeNotification = (index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index));
  };
  
  // Calculate stage amount based on current balance
  const calculateStageAmount = () => {
    return Math.floor(balance * 0.8); // Always risk 80% of current balance
  };
  
  // Handle result of a crypto operation
  const handleOperationResult = (success: boolean, amount: number) => {
    const stageOutcome = STAGE_OUTCOMES[currentStage];
    const stageAmount = calculateStageAmount();
    
    if (success) {
      // Use the predefined multiplier for this stage
      const winAmount = Math.floor(stageAmount * stageOutcome.multiplier);
      const newBalance = balance + winAmount;
      setBalance(newBalance);
      playSoundEffect(true); // Play cash sound for winning
    } else {
      // If it's a loss stage, calculate a loss that's not too severe
      const lossAmount = Math.floor(stageAmount * 0.5); // Lose half the stake
      const newBalance = Math.max(balance - lossAmount, 5); // Never go below 5
      setBalance(newBalance);
      playSoundEffect(false);
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
      // Final adjustment to ensure exactly R$500 at the end
      setBalance(TARGET_BALANCE);
      
      // Final stage complete - show withdrawal modal
      setSimulationComplete(true);
      setShowWithdrawalModal(true);
    }
  };
  
  // Restart simulation
  const restartSimulation = () => {
    setBalance(INITIAL_BALANCE);
    setCurrentStage(0);
    setStageComplete(false);
    setSimulationComplete(false);
    setCrypto(getRandomItem(cryptoCurrencies));
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      <Header balance={balance} title="Summit Trader" />
      
      <div className="pt-20 px-4 container max-w-lg mx-auto">
        <div className="mb-6 text-center">
          <div className="inline-block glass-card px-4 py-2">
            <span className="text-muted-foreground">Etapa </span>
            <span className="font-bold">{currentStage + 1}</span>
            <span className="text-muted-foreground"> de {TOTAL_STAGES}</span>
          </div>
          
          <div className="mt-2">
            <h2 className="text-2xl font-bold">
              {simulationComplete 
                ? 'Simulação Concluída!' 
                : (stageComplete ? 'Etapa Concluída!' : 'Faça sua operação')}
            </h2>
            <p className="text-muted-foreground">
              {simulationComplete 
                ? 'Você concluiu todas as etapas de investimento.' 
                : (stageComplete ? 'Prepare-se para a próxima etapa' : 'Preveja a direção do mercado')}
            </p>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {simulationComplete && !showWithdrawalModal ? (
            <motion.div
              key="simulation-complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-6 rounded-lg text-center"
            >
              <div className="mb-4 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <BarChart3 className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Simulação Concluída!</h3>
              <p className="text-muted-foreground mb-6">
                Você transformou R$30 em R${balance.toFixed(2)}!
              </p>
              
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => navigate('/')}>
                  Voltar ao Início
                </Button>
                <Button onClick={() => setShowWithdrawalModal(true)}>
                  Sacar Ganhos
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
                stageNumber={currentStage + 1}
                shouldWin={STAGE_OUTCOMES[currentStage].shouldWin}
                onResult={handleOperationResult}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Withdrawal Modal */}
      <WithdrawalModal 
        isOpen={showWithdrawalModal} 
        onClose={() => setShowWithdrawalModal(false)}
        finalBalance={balance}
      />
      
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

export default Simulation;
