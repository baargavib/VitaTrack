import { useState, useEffect } from 'react';
import { Bell, AlertTriangle, CheckCircle, X, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Alert {
  id: string;
  type: 'emergency' | 'traffic' | 'system' | 'hospital';
  title: string;
  message: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  timestamp: Date;
  isRead: boolean;
  ambulanceId?: string;
  location?: string;
}

const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'emergency',
    title: 'Critical Emergency Dispatch',
    message: 'AMB-001 dispatched to cardiac arrest - Broadway St',
    priority: 'critical',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    isRead: false,
    ambulanceId: 'AMB-001',
    location: 'Broadway St, NYC'
  },
  {
    id: 'alert-002',
    type: 'traffic',
    title: 'Traffic Delay Detected',
    message: 'Heavy traffic on Park Ave - Route updated automatically',
    priority: 'medium',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    isRead: false,
    location: 'Park Ave'
  },
  {
    id: 'alert-003',
    type: 'hospital',
    title: 'Hospital Prepared',
    message: 'NYC General Hospital ready for incoming patient',
    priority: 'high',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    isRead: true,
    location: 'NYC General Hospital'
  }
];

const AlertSystem = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance every 30 seconds
        const newAlert: Alert = {
          id: `alert-${Date.now()}`,
          type: ['emergency', 'traffic', 'system', 'hospital'][Math.floor(Math.random() * 4)] as Alert['type'],
          title: 'New System Alert',
          message: 'Real-time alert from VitaTrack system',
          priority: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as Alert['priority'],
          timestamp: new Date(),
          isRead: false
        };
        
        setAlerts(prev => [newAlert, ...prev]);
        
        // Play sound for critical alerts
        if (soundEnabled && newAlert.priority === 'critical') {
          playAlertSound();
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  const playAlertSound = () => {
    // In a real app, this would play an actual alert sound
    console.log('🚨 Critical alert sound played');
  };

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getPriorityColor = (priority: string): "critical" | "high" | "medium" | "low" | "default" => {
    const colors = {
      critical: 'critical' as const,
      high: 'high' as const,
      medium: 'medium' as const,
      low: 'low' as const
    };
    return colors[priority as keyof typeof colors] || 'default';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      emergency: AlertTriangle,
      traffic: Volume2,
      system: CheckCircle,
      hospital: CheckCircle
    };
    return icons[type as keyof typeof icons] || AlertTriangle;
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="relative">
      {/* Alert Bell Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Alert Panel */}
      {isOpen && (
        <Card className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-hidden shadow-xl border z-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">System Alerts</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  title={soundEnabled ? 'Disable sounds' : 'Enable sounds'}
                >
                  <Volume2 className={`h-4 w-4 ${soundEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {unreadCount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {unreadCount} unread alert{unreadCount !== 1 ? 's' : ''}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="p-0 max-h-80 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No alerts at this time</p>
              </div>
            ) : (
              <div className="space-y-1">
                {alerts.map((alert) => {
                  const IconComponent = getTypeIcon(alert.type);
                  
                  return (
                    <div
                      key={alert.id}
                      className={`p-3 border-b border-border hover:bg-muted/50 cursor-pointer ${
                        !alert.isRead ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                      }`}
                      onClick={() => markAsRead(alert.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1 rounded-full ${
                          alert.priority === 'critical' ? 'bg-destructive/10' :
                          alert.priority === 'high' ? 'bg-warning/10' :
                          'bg-secondary/10'
                        }`}>
                          <IconComponent className={`h-4 w-4 ${
                            alert.priority === 'critical' ? 'text-destructive' :
                            alert.priority === 'high' ? 'text-warning' :
                            'text-secondary'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`text-sm font-medium truncate ${
                              !alert.isRead ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {alert.title}
                            </h4>
                            <div className="flex items-center gap-1">
                              <Badge variant={getPriorityColor(alert.priority)} className="text-xs">
                                {alert.priority}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteAlert(alert.id);
                                }}
                                className="h-auto p-1 opacity-0 group-hover:opacity-100"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mb-1">
                            {alert.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(alert.timestamp)}
                            </span>
                            {alert.location && (
                              <span className="text-xs text-muted-foreground">
                                📍 {alert.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AlertSystem;