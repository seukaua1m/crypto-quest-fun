
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
}

export const randomNames = [
  "João", "Maria", "Pedro", "Ana", "Lucas", "Julia", 
  "Mateus", "Beatriz", "Rafael", "Lara", "Gustavo", 
  "Sofia", "Carlos", "Camila", "Fernando", "Amanda",
  "Eduardo", "Larissa", "Roberto", "Mariana"
];

export const cryptoCurrencies = [
  { name: "Bitcoin", symbol: "BTC", price: 250000 },
  { name: "Ethereum", symbol: "ETH", price: 12000 },
  { name: "Binance Coin", symbol: "BNB", price: 1800 },
  { name: "Solana", symbol: "SOL", price: 700 },
  { name: "Cardano", symbol: "ADA", price: 2.5 },
  { name: "Polkadot", symbol: "DOT", price: 40 },
  { name: "Dogecoin", symbol: "DOGE", price: 0.75 },
  { name: "Ripple", symbol: "XRP", price: 2.3 },
];

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function createNotificationData() {
  const name = getRandomItem(randomNames);
  const profit = Math.floor(Math.random() * 5000) / 100 + 10;
  
  return {
    username: name,
    profit: profit,
    message: "acabou de lucrar com uma operação!",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}${Math.random()}`
  };
}

export function playSoundEffect(success: boolean) {
  const audio = new Audio(success ? '/win-sound.mp3' : '/lose-sound.mp3');
  audio.volume = 0.5;
  audio.play().catch(e => console.error("Audio couldn't play:", e));
}
