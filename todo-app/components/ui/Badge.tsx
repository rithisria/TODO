import React from 'react';

interface BadgeProps {
  variant?: 'low' | 'medium' | 'high' | 'completed' | 'pending';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'medium',
  children,
  className = '',
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
};
