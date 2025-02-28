
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 text-center max-w-md w-full"
      >
        <h1 className="text-4xl font-bold mb-4 text-gradient">404</h1>
        <p className="text-xl text-foreground mb-6">Página não encontrada</p>
        <Button asChild>
          <a href="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Voltar para o Início
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
