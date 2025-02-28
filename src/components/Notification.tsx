
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from 'framer-motion';

export interface NotificationProps {
  message: string;
  profit: number;
  username: string;
  avatar?: string;
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  profit,
  username,
  avatar,
  onClose
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        setTimeout(onClose, 300);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-16 right-4 z-50 max-w-sm"
        >
          <div className="glass-card p-4 flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={avatar} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{username}</p>
              <p className="text-xs text-muted-foreground">{message}</p>
              <p className="text-xs font-semibold text-primary">+R${profit.toFixed(2)}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
