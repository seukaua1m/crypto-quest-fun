
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full glass-card p-8 rounded-lg text-center"
        >
          <div className="mb-6 flex justify-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <BarChart3 className="w-12 h-12 text-primary" />
            </motion.div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Summit Trader</h1>
          <p className="text-muted-foreground mb-8">
            Transforme R$30 em R$500 em apenas 5 operações! Faça parte dos traders de sucesso.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="w-full group"
              onClick={() => navigate('/simulation')}
            >
              Começar Agora
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </main>
      
      <footer className="py-4 px-6 text-center text-muted-foreground text-sm">
        <p>Summit Trader &copy; {new Date().getFullYear()} - Todos os direitos reservados</p>
      </footer>
    </div>
  );
};

export default Index;
