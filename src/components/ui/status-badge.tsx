import React from 'react';
import { cn } from '@/lib/utils';
import { ItemStatus } from '@/types/item';
import { CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: ItemStatus;
  className?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ 
  status, 
  className, 
  showIcon = true,
  size = 'md'
}: StatusBadgeProps) {
  const getStatusConfig = (status: ItemStatus) => {
    switch(status) {
      case 'safe':
        return {
          baseClass: 'status-safe',
          icon: <CheckCircle className="mr-1 h-3 w-3" />,
          label: 'Not Stolen'
        };
      case 'stolen':
        return {
          baseClass: 'status-stolen',
          icon: <AlertCircle className="mr-1 h-3 w-3" />,
          label: 'Stolen'
        };
      case 'unknown':
        return {
          baseClass: 'status-unknown',
          icon: <HelpCircle className="mr-1 h-3 w-3" />,
          label: 'Unknown'
        };
    }
  };

  const { baseClass, icon, label } = getStatusConfig(status);
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1'
  };

  return (
    <span className={cn(
      'status-indicator',
      baseClass,
      sizeClasses[size],
      className
    )}>
      {showIcon && icon}
      {label}
    </span>
  );
}