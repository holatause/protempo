import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/theme/ThemeProvider';

// Tipos comunes para los gráficos
interface ChartData {
  name: string;
  value: number;
}

interface ChartProps {
  data: ChartData[];
  colors?: string[];
  height?: number;
  animated?: boolean;
}

// Componente de gráfico de barras
export const BarChart: React.FC<ChartProps> = ({ 
  data, 
  colors = ['#3b82f6'], 
  height = 200,
  animated = true
}) => {
  const { theme } = useTheme();
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="w-full" style={{ height }}>
      <div className="flex items-end h-full space-x-2">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          const barColor = colors[index % colors.length];
          
          return (
            <div 
              key={index} 
              className="flex flex-col items-center flex-1"
            >
              <motion.div 
                className="w-full rounded-t-sm relative group"
                style={{ 
                  backgroundColor: barColor,
                  height: animated ? 0 : `${barHeight}%`
                }}
                animate={{ height: `${barHeight}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 transition-opacity">
                  {item.value}%
                </div>
              </motion.div>
              <div className="text-xs mt-1 truncate w-full text-center" style={{ maxWidth: '100%' }}>
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Componente de gráfico de líneas
export const LineChart: React.FC<ChartProps & { labels?: string[] }> = ({ 
  data, 
  colors = ['#3b82f6'], 
  height = 200,
  labels,
  animated = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Configurar dimensiones
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Dibujar ejes
    ctx.beginPath();
    ctx.strokeStyle = theme === 'dark' ? '#4b5563' : '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Dibujar líneas de cuadrícula
    ctx.beginPath();
    ctx.strokeStyle = theme === 'dark' ? '#374151' : '#f3f4f6';
    ctx.lineWidth = 0.5;
    
    for (let i = 1; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
    }
    
    for (let i = 1; i <= data.length; i++) {
      const x = padding + (chartWidth / data.length) * i;
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
    }
    
    ctx.stroke();
    
    // Dibujar línea de datos
    if (data.length > 0) {
      const maxValue = Math.max(...data.map(item => item.value));
      
      ctx.beginPath();
      ctx.strokeStyle = colors[0];
      ctx.lineWidth = 2;
      ctx.moveTo(
        padding,
        height - padding - (data[0].value / maxValue) * chartHeight
      );
      
      // Animación de dibujo de línea
      if (animated) {
        let currentPoint = 0;
        const totalPoints = data.length;
        const animationDuration = 1000; // ms
        const pointInterval = animationDuration / totalPoints;
        
        const drawNextPoint = () => {
          if (currentPoint >= totalPoints - 1) return;
          
          currentPoint++;
          const x = padding + (chartWidth / (totalPoints - 1)) * currentPoint;
          const y = height - padding - (data[currentPoint].value / maxValue) * chartHeight;
          
          ctx.lineTo(x, y);
          ctx.stroke();
          
          setTimeout(drawNextPoint, pointInterval);
        };
        
        setTimeout(drawNextPoint, pointInterval);
      } else {
        // Dibujar línea completa sin animación
        for (let i = 1; i < data.length; i++) {
          const x = padding + (chartWidth / (data.length - 1)) * i;
          const y = height - padding - (data[i].value / maxValue) * chartHeight;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      
      // Dibujar puntos
      for (let i = 0; i < data.length; i++) {
        const x = padding + (chartWidth / (data.length - 1)) * i;
        const y = height - padding - (data[i].value / maxValue) * chartHeight;
        
        ctx.beginPath();
        ctx.fillStyle = colors[0];
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Etiquetas de datos
        ctx.fillStyle = theme === 'dark' ? '#e5e7eb' : '#4b5563';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(data[i].value.toString(), x, y - 10);
      }
      
      // Etiquetas del eje X
      if (labels) {
        ctx.fillStyle = theme === 'dark' ? '#9ca3af' : '#6b7280';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        
        for (let i = 0; i < labels.length; i++) {
          const x = padding + (chartWidth / (labels.length - 1)) * i;
          ctx.fillText(labels[i], x, height - padding + 15);
        }
      } else {
        // Usar nombres de datos como etiquetas
        ctx.fillStyle = theme === 'dark' ? '#9ca3af' : '#6b7280';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        
        for (let i = 0; i < data.length; i++) {
          const x = padding + (chartWidth / (data.length - 1)) * i;
          ctx.fillText(data[i].name, x, height - padding + 15);
        }
      }
    }
  }, [data, colors, theme, animated]);
  
  return (
    <div className="w-full" style={{ height }}>
      <canvas 
        ref={canvasRef} 
        width={500} 
        height={height}
        className="w-full h-full"
      />
    </div>
  );
};

// Componente de gráfico circular
export const PieChart: React.FC<ChartProps> = ({ 
  data, 
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1'], 
  height = 200,
  animated = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Configurar dimensiones
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // Calcular total
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Dibujar sectores
    let startAngle = -Math.PI / 2; // Comenzar desde arriba
    
    if (animated) {
      // Animación de crecimiento
      let progress = 0;
      const animationDuration = 1000; // ms
      const fps = 60;
      const frames = animationDuration / (1000 / fps);
      let frame = 0;
      
      const animate = () => {
        if (frame >= frames) return;
        
        frame++;
        progress = frame / frames;
        
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Redibujar con progreso
        let currentAngle = startAngle;
        
        for (let i = 0; i < data.length; i++) {
          const sliceAngle = (data[i].value / total) * Math.PI * 2 * progress;
          
          ctx.beginPath();
          ctx.fillStyle = colors[i % colors.length];
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
          ctx.closePath();
          ctx.fill();
          
          currentAngle += sliceAngle;
        }
        
        requestAnimationFrame(animate);
      };
      
      animate();
    } else {
      // Dibujar sin animación
      for (let i = 0; i < data.length; i++) {
        const sliceAngle = (data[i].value / total) * Math.PI * 2;
        
        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        
        startAngle += sliceAngle;
      }
    }
    
    // Dibujar leyenda
    const legendY = height - data.length * 15;
    
    for (let i = 0; i < data.length; i++) {
      const y = legendY + i * 15;
      
      // Cuadrado de color
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(10, y, 10, 10);
      
      // Texto
      ctx.fillStyle = theme === 'dark' ? '#e5e7eb' : '#4b5563';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${data[i].name} (${data[i].value}%)`, 25, y + 8);
    }
  }, [data, colors, theme, animated]);
  
  return (
    <div className="w-full" style={{ height }}>
      <canvas 
        ref={canvasRef} 
        width={500} 
        height={height}
        className="w-full h-full"
      />
    </div>
  );
};

// Componente de gráfico de radar
export const RadarChart: React.FC<ChartProps & { maxValue?: number }> = ({ 
  data, 
  colors = ['#3b82f6'], 
  height = 200,
  maxValue = 100,
  animated = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Configurar dimensiones
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    // Número de ejes
    const axisCount = data.length;
    
    // Dibujar ejes
    for (let i = 0; i < axisCount; i++) {
      const angle = (i / axisCount) * Math.PI * 2 - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.strokeStyle = theme === 'dark' ? '#4b5563' : '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      // Etiquetas
      const labelX = centerX + (radius + 15) * Math.cos(angle);
      const labelY = centerY + (radius + 15) * Math.sin(angle);
      
      ctx.fillStyle = theme === 'dark' ? '#9ca3af' : '#6b7280';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(data[i].name, labelX, labelY);
    }
    
    // Dibujar círculos concéntricos
    for (let i = 1; i <= 4; i++) {
      const circleRadius = (radius / 4) * i;
      
      ctx.beginPath();
      ctx.strokeStyle = theme === 'dark' ? '#374151' : '#f3f4f6';
      ctx.lineWidth = 0.5;
      ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    // Dibujar datos
    if (animated) {
      // Animación de crecimiento
      let progress = 0;
      const animationDuration = 1000; // ms
      const fps = 60;
      const frames = animationDuration / (1000 / fps);
      let frame = 0;
      
      const animate = () => {
        if (frame >= frames) return;
        
        frame++;
        progress = frame / frames;
        
        // Limpiar área de datos (mantener ejes)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Redibujar ejes
        for (let i = 0; i < axisCount; i++) {
          const angle = (i / axisCount) * Math.PI * 2 - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          
          ctx.beginPath();
          ctx.strokeStyle = theme === 'dark' ? '#4b5563' : '#e5e7eb';
          ctx.lineWidth = 1;
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.stroke();
          
          // Etiquetas
          const labelX = centerX + (radius + 15) * Math.cos(angle);
          const labelY = centerY + (radius + 15) * Math.sin(angle);
          
          ctx.fillStyle = theme === 'dark' ? '#9ca3af' : '#6b7280';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(data[i].name, labelX, labelY);
        }
        
        // Dibujar círculos concéntricos
        for (let i = 1; i <= 4; i++) {
          const circleRadius = (radius / 4) * i;
          
          ctx.beginPath();
          ctx.strokeStyle = theme === 'dark' ? '#374151' : '#f3f4f6';
          ctx.lineWidth = 0.5;
          ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        // Dibujar polígono de datos con progreso
        ctx.beginPath();
        
        for (let i = 0; i < axisCount; i++) {
          const angle = (i / axisCount) * Math.PI * 2 - Math.PI / 2;
          const value = data[i].value * progress;
          const pointRadius = (value / maxValue) * radius;
          const x = centerX + pointRadius * Math.cos(angle);
          const y = centerY + pointRadius * Math.sin(angle);
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Cerrar polígono
        const firstAngle = -Math.PI / 2;
        const firstValue = data[0].value * progress;
        const firstPointRadius = (firstValue / maxValue) * radius;
        const firstX = centerX + firstPointRadius * Math.cos(firstAngle);
        const firstY = centerY + firstPointRadius * Math.sin(firstAngle);
        ctx.lineTo(firstX, firstY);
        
        // Estilo del polígono
        ctx.fillStyle = `${colors[0]}40`; // Color con transparencia
        ctx.strokeStyle = colors[0];
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
        
        requestAnimationFrame(animate);
      };
      
      animate();
    } else {
      // Dibujar sin animación
      ctx.beginPath();
      
      for (let i = 0; i < axisCount; i++) {
        const angle = (i / axisCount) * Math.PI * 2 - Math.PI / 2;
        const value = data[i].value;
        const pointRadius = (value / maxValue) * radius;
        const x = centerX + pointRadius * Math.cos(angle);
        const y = centerY + pointRadius * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      // Cerrar polígono
      const firstAngle = -Math.PI / 2;
      const firstValue = data[0].value;
      const firstPointRadius = (firstValue / maxValue) * radius;
      const firstX = centerX + firstPointRadius * Math.cos(firstAngle);
      const firstY = centerY + firstPointRadius * Math.sin(firstAngle);
      ctx.lineTo(firstX, firstY);
      
      // Estilo del polígono
      ctx.fillStyle = `${colors[0]}40`; // Color con transparencia
      ctx.strokeStyle = colors[0];
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();
    }
  }, [data, colors, theme, maxValue, animated]);
  
  return (
    <div className="w-full" style={{ height }}>
      <canvas 
        ref={canvasRef} 
        width={500} 
        height={height}
        className="w-full h-full"
      />
    </div>
  );
};
