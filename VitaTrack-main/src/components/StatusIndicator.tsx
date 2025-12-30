import { Badge } from '@/components/ui/badge';

interface StatusIndicatorProps {
  status: string;
  size?: 'sm' | 'default' | 'lg';
  showLabel?: boolean;
}

const StatusIndicator = ({ status, size = 'default', showLabel = false }: StatusIndicatorProps) => {
  const statusConfig = {
    available: {
      label: 'Available',
      color: 'bg-status-available',
      textColor: 'text-status-available',
      description: 'Ready for dispatch'
    },
    dispatched: {
      label: 'Dispatched',
      color: 'bg-status-dispatched',
      textColor: 'text-status-dispatched',
      description: 'Assigned to emergency'
    },
    en_route: {
      label: 'En Route',
      color: 'bg-status-enRoute',
      textColor: 'text-status-enRoute',
      description: 'Traveling to scene'
    },
    at_scene: {
      label: 'At Scene',
      color: 'bg-primary',
      textColor: 'text-primary',
      description: 'Arrived at location'
    },
    transporting: {
      label: 'Transporting',
      color: 'bg-destructive',
      textColor: 'text-destructive',
      description: 'Patient on board'
    },
    at_hospital: {
      label: 'At Hospital',
      color: 'bg-status-arrived',
      textColor: 'text-status-arrived',
      description: 'Delivered to hospital'
    },
    offline: {
      label: 'Offline',
      color: 'bg-status-offline',
      textColor: 'text-status-offline',
      description: 'Not available'
    },
    pending: {
      label: 'Pending',
      color: 'bg-warning',
      textColor: 'text-warning',
      description: 'Awaiting assignment'
    },
    completed: {
      label: 'Completed',
      color: 'bg-success',
      textColor: 'text-success',
      description: 'Call completed'
    },
    current: {
      label: 'Current',
      color: 'bg-primary',
      textColor: 'text-primary',
      description: 'In progress'
    }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.offline;
  
  const sizeClasses = {
    sm: 'w-2 h-2',
    default: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  if (showLabel) {
    return (
      <div className="flex items-center gap-2">
        <div className={`${sizeClasses[size]} ${config.color} rounded-full ${
          status === 'en_route' || status === 'current' ? 'animate-pulse' : ''
        }`} />
        <span className={`text-sm font-medium ${config.textColor}`}>
          {config.label}
        </span>
      </div>
    );
  }

  return (
    <div 
      className={`${sizeClasses[size]} ${config.color} rounded-full ${
        status === 'en_route' || status === 'current' ? 'animate-pulse' : ''
      }`}
      title={`${config.label} - ${config.description}`}
    />
  );
};

export default StatusIndicator;