import React from 'react';
import { RiskLevel } from '../../types';
import { ShieldAlert, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  size = 'md',
  showIcon = true,
  className = ''
}) => {
  const { t } = useApp();

  const getDetails = () => {
    switch (level) {
      case 'critical':
        return {
          label: t('risk_critical'),
          bg: 'bg-red-500/15 text-red-400 border-red-500/40',
          dot: 'bg-red-500 animate-pulse',
          icon: ShieldAlert
        };
      case 'high':
        return {
          label: t('risk_high'),
          bg: 'bg-orange-500/15 text-orange-400 border-orange-500/40',
          dot: 'bg-orange-500 animate-pulse',
          icon: AlertTriangle
        };
      case 'moderate':
        return {
          label: t('risk_moderate'),
          bg: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
          dot: 'bg-amber-400',
          icon: AlertCircle
        };
      case 'low':
      default:
        return {
          label: t('risk_low'),
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
          dot: 'bg-emerald-500',
          icon: CheckCircle2
        };
    }
  };

  const details = getDetails();
  const Icon = details.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1.5',
    md: 'px-2.5 py-1 text-xs sm:text-sm font-semibold gap-1.5',
    lg: 'px-3.5 py-1.5 text-sm sm:text-base font-bold gap-2'
  };

  return (
    <span
      id={`risk-badge-${level}`}
      className={`inline-flex items-center rounded-full border tracking-wide uppercase whitespace-nowrap select-none transition-colors ${details.bg} ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label={`Risk level: ${details.label}`}
    >
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${details.dot}`} aria-hidden="true" />
      {showIcon && <Icon className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />}
      <span>{details.label}</span>
    </span>
  );
};
