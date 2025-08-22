
"use client";

interface OracleStatusIndicatorProps {
  status: 'pending' | 'verified' | 'failed';
  className?: string;
}

export default function OracleStatusIndicator({ status, className = '' }: OracleStatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          icon: '✓',
          text: 'Verified',
          bgColor: 'bg-accent/20',
          textColor: 'text-accent',
          borderColor: 'border-accent/30'
        };
      case 'failed':
        return {
          icon: '✗',
          text: 'Failed',
          bgColor: 'bg-red-100',
          textColor: 'text-red-600',
          borderColor: 'border-red-200'
        };
      default:
        return {
          icon: '⏳',
          text: 'Pending',
          bgColor: 'bg-muted/20',
          textColor: 'text-muted',
          borderColor: 'border-muted/30'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`
      inline-flex items-center gap-sm px-md py-sm rounded-md border text-sm font-medium
      ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}
    `}>
      <span className="text-xs">{config.icon}</span>
      <span>Oracle {config.text}</span>
    </div>
  );
}
