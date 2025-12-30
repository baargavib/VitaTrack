import { useEffect, useRef } from 'react';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Ambulance {
  id: string;
  vehicleNumber: string;
  status: string;
  driverName: string;
  currentCall: string | null;
  location: { lat: number; lng: number };
  eta: string | null;
  priority: string | null;
}

interface EmergencyCall {
  id: string;
  patientName: string;
  address: string;
  priority: string;
  condition: string;
  ambulanceId: string | null;
  status: string;
}

interface EmergencyMapProps {
  ambulances: Ambulance[];
  calls: EmergencyCall[];
  focusedAmbulance?: string;
}

const EmergencyMap = ({ ambulances, calls, focusedAmbulance }: EmergencyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const getStatusColor = (status: string) => {
    const colors = {
      available: '#22c55e',
      dispatched: '#f59e0b',
      en_route: '#3b82f6',
      at_scene: '#ef4444',
      transporting: '#8b5cf6',
      at_hospital: '#10b981',
      offline: '#6b7280'
    };
    return colors[status as keyof typeof colors] || '#6b7280';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      critical: '#dc2626',
      high: '#f59e0b',
      medium: '#3b82f6',
      low: '#6b7280'
    };
    return colors[priority as keyof typeof colors] || '#6b7280';
  };

  // Mock map rendering - in a real app, this would integrate with Google Maps, Mapbox, etc.
  useEffect(() => {
    if (!mapRef.current) return;

    // Simulate map initialization
    console.log('Initializing emergency map with:', { ambulances, calls, focusedAmbulance });
  }, [ambulances, calls, focusedAmbulance]);

  return (
    <div className="relative h-full w-full">
      {/* Map Container - Placeholder for actual map integration */}
      <div 
        ref={mapRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23cbd5e1' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40l10-10h20l10 10v10h-40v-10zm10 0l10-10h10l10 10v10h-40v-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span>En Route</span>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span>Available</span>
            </div>
          </div>
        </div>

        {/* Ambulance Markers */}
        {ambulances.map((ambulance, index) => (
          <div
            key={ambulance.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${30 + index * 15}%`,
              top: `${40 + index * 10}%`,
            }}
          >
            {/* Ambulance Icon */}
            <div className={`relative p-3 rounded-full shadow-lg border-2 transition-all hover:scale-110 ${
              focusedAmbulance === ambulance.id ? 'ring-4 ring-primary/50' : ''
            }`}
            style={{
              backgroundColor: getStatusColor(ambulance.status),
              borderColor: 'white'
            }}>
              <Navigation className="h-5 w-5 text-white" />
              
              {/* Pulse animation for active ambulances */}
              {ambulance.status === 'en_route' && (
                <div className="absolute inset-0 rounded-full animate-ping" 
                     style={{ backgroundColor: getStatusColor(ambulance.status) }} />
              )}
            </div>

            {/* Ambulance Info Card */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-card border border-border rounded-lg p-3 shadow-xl min-w-48 z-10">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{ambulance.vehicleNumber}</h4>
                  <Badge 
                    style={{ 
                      backgroundColor: getStatusColor(ambulance.status),
                      color: 'white'
                    }}
                    className="text-xs"
                  >
                    {ambulance.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Driver: {ambulance.driverName}
                </p>
                
                {ambulance.currentCall && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium">Call: {ambulance.currentCall}</p>
                    {ambulance.priority && (
                      <Badge 
                        style={{ 
                          backgroundColor: getPriorityColor(ambulance.priority),
                          color: 'white'
                        }}
                        className="text-xs"
                      >
                        {ambulance.priority.toUpperCase()} PRIORITY
                      </Badge>
                    )}
                  </div>
                )}
                
                {ambulance.eta && (
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <Clock className="h-3 w-3" />
                    <span>ETA: {ambulance.eta}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Emergency Call Markers */}
        {calls.map((call, index) => (
          <div
            key={call.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${60 + index * 10}%`,
              top: `${30 + index * 15}%`,
            }}
          >
            <div 
              className="p-2 rounded-full shadow-lg border-2 border-white"
              style={{ backgroundColor: getPriorityColor(call.priority) }}
            >
              <MapPin className="h-4 w-4 text-white" />
            </div>
            
            {/* Emergency Call Info */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-card border border-border rounded-lg p-2 shadow-xl min-w-40">
              <div className="space-y-1">
                <h5 className="font-semibold text-xs">{call.patientName}</h5>
                <p className="text-xs text-muted-foreground">{call.condition}</p>
                <Badge 
                  style={{ 
                    backgroundColor: getPriorityColor(call.priority),
                    color: 'white'
                  }}
                  className="text-xs"
                >
                  {call.priority.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
        ))}

        {/* Center message for empty state */}
        {ambulances.length === 0 && calls.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-lg font-medium">Real-Time Emergency Map</p>
              <p className="text-sm">Ambulance and emergency locations will appear here</p>
            </div>
          </div>
        )}

        {/* Map Attribution */}
        <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm border border-border rounded px-2 py-1">
          <p className="text-xs text-muted-foreground">
            Live GPS Tracking • Updated every 30 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyMap;