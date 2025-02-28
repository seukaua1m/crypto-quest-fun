
import React, { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface CryptoChartProps {
  data: any[];
  isUptrend: boolean;
  height?: number;
  animated?: boolean;
}

const CryptoChart: React.FC<CryptoChartProps> = ({ 
  data, 
  isUptrend, 
  height = 200,
  animated = false
}) => {
  const [animatedData, setAnimatedData] = useState<any[]>([]);

  useEffect(() => {
    if (animated) {
      setAnimatedData([]);
      const timer = setInterval(() => {
        setAnimatedData((prev) => {
          if (prev.length >= data.length) {
            clearInterval(timer);
            return prev;
          }
          return [...prev, data[prev.length]];
        });
      }, 100);
      
      return () => clearInterval(timer);
    } else {
      setAnimatedData(data);
    }
  }, [data, animated]);

  const gradientColor = isUptrend ? '#22c55e' : '#ef4444';
  const strokeColor = isUptrend ? '#22c55e' : '#ef4444';

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={animated ? animatedData : data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradientColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 10, fill: '#9ca3af' }}
            domain={['dataMin - 100', 'dataMax + 100']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(23, 23, 23, 0.9)',
              border: 'none',
              borderRadius: '8px',
              color: '#f3f4f6',
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={strokeColor}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoChart;
