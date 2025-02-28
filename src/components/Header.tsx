
import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';

interface HeaderProps {
  balance: number;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ balance, title = "Summit Trader" }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">{title}</span>
        </Link>
        <div className="bg-muted/50 px-4 py-2 rounded-full flex items-center">
          <span className="font-bold text-primary">
            {formatCurrency(balance)}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
