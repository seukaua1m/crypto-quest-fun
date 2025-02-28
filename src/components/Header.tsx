
import React from 'react';
import { formatCurrency } from '@/lib/utils';

interface HeaderProps {
  balance: number;
}

const Header: React.FC<HeaderProps> = ({ balance }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-gradient font-bold text-xl tracking-tight">CryptoQuest</div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="bg-secondary px-3 py-1 rounded-full">
          <span className="text-muted-foreground text-sm">Saldo:</span>
          <span className="ml-1 font-bold text-primary">{formatCurrency(balance)}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
