
import React, { useEffect, useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
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

  const greenColor = '#22c55e';
  const redColor = '#ef4444';
  const strokeColor = isUptrend ? greenColor : redColor;
  
  // Prepare data for candlestick-like chart
  const dataForChart = (animated ? animatedData : data).map(item => {
    // Generate open, high, low, close values to make it look like a candlestick chart
    const price = item.price;
    const open = price - (Math.random() * 20);
    const close = price;
    const high = Math.max(open, close) + (Math.random() * 15);
    const low = Math.min(open, close) - (Math.random() * 15);
    const isGreen = close > open;
    
    return {
      ...item,
      open,
      close,
      high,
      low,
      isGreen
    };
  });

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={dataForChart}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          barGap={1}
        >
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
            formatter={(value: number) => [`${value.toFixed(2)}`, 'Price']}
          />
          <Bar
            dataKey="high"
            fill="transparent"
            stroke="transparent"
            barSize={6}
          >
            {dataForChart.map((entry, index) => (
              <Cell 
                key={`bar-${index}`} 
                fill={entry.isGreen ? greenColor : redColor}
              />
            ))}
          </Bar>
          <Bar
            dataKey="open"
            fill="transparent"
            stroke="transparent"
            barSize={12}
          >
            {dataForChart.map((entry, index) => (
              <Cell 
                key={`bar-${index}`} 
                fill={entry.isGreen ? greenColor : redColor}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoChart;
