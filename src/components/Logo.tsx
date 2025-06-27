import React from 'react';
import { Home } from 'lucide-react';
import { colors } from '@/constants/colors';

interface LogoProps {
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ size = 40 }) => {
  const chipMarkSize = size * 0.15;
  const innerCircleSize = size * 0.8;
  const borderWidth = size * 0.05;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.primary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: `${borderWidth}px solid #FFFFFF`,
        position: 'relative',
      }}
    >
      {/* Chip marks around the edge */}
      <div
        style={{
          position: 'absolute',
          width: chipMarkSize,
          height: chipMarkSize,
          backgroundColor: '#FFFFFF',
          borderRadius: 2,
          top: size * 0.05,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: chipMarkSize,
          height: chipMarkSize,
          backgroundColor: '#FFFFFF',
          borderRadius: 2,
          top: size * 0.15,
          right: size * 0.15,
          transform: 'rotate(45deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: chipMarkSize,
          height: chipMarkSize,
          backgroundColor: '#FFFFFF',
          borderRadius: 2,
          right: size * 0.05,
          top: '50%',
          transform: 'translateY(-50%) rotate(90deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: chipMarkSize,
          height: chipMarkSize,
          backgroundColor: '#FFFFFF',
          borderRadius: 2,
          bottom: size * 0.15,
          right: size * 0.15,
          transform: 'rotate(135deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: chipMarkSize,
          height: chipMarkSize,
          backgroundColor: '#FFFFFF',
          borderRadius: 2,
          bottom: size * 0.05,
          transform: 'rotate(180deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: chipMarkSize,
          height: chipMarkSize,
          backgroundColor: '#FFFFFF',
          borderRadius: 2,
          bottom: size * 0.15,
          left: size * 0.15,
          transform: 'rotate(225deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: chipMarkSize,
          height: chipMarkSize,
          backgroundColor: '#FFFFFF',
          borderRadius: 2,
          left: size * 0.05,
          top: '50%',
          transform: 'translateY(-50%) rotate(270deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: chipMarkSize,
          height: chipMarkSize,
          backgroundColor: '#FFFFFF',
          borderRadius: 2,
          top: size * 0.15,
          left: size * 0.15,
          transform: 'rotate(315deg)',
        }}
      />
      
      {/* Inner circle with home icon */}
      <div
        style={{
          width: innerCircleSize,
          height: innerCircleSize,
          borderRadius: innerCircleSize / 2,
          backgroundColor: colors.background,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Home size={size * 0.5} color="#FFFFFF" />
      </div>
    </div>
  );
}; 