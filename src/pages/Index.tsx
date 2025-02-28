
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center mb-8"
      >
        <h1 className="text-gradient text-4xl font-bold mb-2">CryptoQuest</h1>
        <p className="text-muted-foreground text-lg mb-6">
          Transforme R$30 em R$500 em apenas 5 etapas!
        </p>
        
        <div className="glass-card p-6 mb-8 max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Como funciona:</h2>
          <ul className="text-left space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center shrink-0">1</span>
              <p>Comece com R$30 de saldo inicial</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center shrink-0">2</span>
              <p>Faça 5 operações em criptomoedas</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center shrink-0">3</span>
              <p>Preveja se o mercado vai subir ou cair</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center shrink-0">4</span>
              <p>Alcance R$500 para completar o desafio</p>
            </li>
          </ul>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Button 
          size="lg" 
          className="px-8 py-6 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 group"
          onClick={() => navigate('/game')}
        >
          <Sparkles className="mr-2 h-5 w-5 group-hover:animate-pulse" />
          Começar Desafio
        </Button>
      </motion.div>
    </div>
  );
};

export default Index;
