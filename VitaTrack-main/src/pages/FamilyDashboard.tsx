import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmergencyMap from '@/components/EmergencyMap';
import StatusIndicator from '@/components/StatusIndicator';
import { Users, MapPin, Clock, Phone, Activity, Truck, AlertTriangle, Navigation } from 'lucide-react';

// Mock family tracking data
const mockTrackingData = {
  patientName: 'Robert Chen',
  callId: 'CALL-2024-156',
  ambulance: {
    id: 'AMB-001',
    vehicleNumber: 'EMR-2024-01',
    driverName: 'John Smith',
    status: 'en_route',
    currentLocation: { lat: 40.7589, lng: -73.9851 },
    estimatedArrival: '8 mins',
    distanceToPatient: '2.1 km'
  },
  emergency: {
    priority: 'critical',
    condition: 'Cardiac arrest',
    reportedTime: '2024-01-15T14:30:00Z',
    pickupAddress: '123 Broadway St, NYC',
    destinationHospital: 'NYC General Hospital',
    hospitalAddress: '456 Medical Center Dr, NYC',
    specialInstructions: 'Patient conscious, experiencing chest pain'
  },
  timeline: [
    { time: '2:30 PM', event: 'Emergency call received', status: 'completed' },
    { time: '2:32 PM', event: 'Ambulance dispatched', status: 'completed' },
    { time: '2:35 PM', event: 'En route to location', status: 'current' },
    { time: '2:43 PM', event: 'Estimated arrival at scene', status: 'pending' },
    { time: '2:50 PM', event: 'Transport to hospital', status: 'pending' },
    { time: '3:05 PM', event: 'Arrival at hospital', status: 'pending' }
  ]
};

const FamilyDashboard = () => {
  const [trackingData, setTrackingData] = useState(mockTrackingData);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrackingData(prev => ({
        ...prev,
        ambulance: {
          ...prev.ambulance,
          currentLocation: {
            lat: prev.ambulance.currentLocation.lat + (Math.random() - 0.5) * 0.001,
            lng: prev.ambulance.currentLocation.lng + (Math.random() - 0.5) * 0.001
          },
          estimatedArrival: Math.max(1, parseInt(prev.ambulance.estimatedArrival) - 1) + ' mins'
        }
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority: string): "critical" | "high" | "medium" | "low" | "default" => {
    const colors = {
      critical: 'critical' as const,
      high: 'high' as const,
      medium: 'medium' as const,
      low: 'low' as const
    };
    return colors[priority as keyof typeof colors] || 'default';
  };

  const getTimelineItemColor = (status: string): "success" | "default" | "muted" => {
    const colors = {
      completed: 'success' as const,
      current: 'default' as const,
      pending: 'muted' as const
    };
    return colors[status as keyof typeof colors] || 'muted';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">VitaTrack Family Portal</h1>
              <p className="text-sm text-muted-foreground">Live Emergency Tracking</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">Call ID: {trackingData.callId}</p>
              <p className="text-xs text-muted-foreground">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Emergency Contact
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        {/* Patient & Emergency Info */}
        <Card className="mb-6 border-primary/20 bg-primary/5" >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-primary">
                <AlertTriangle className="h-5 w-5" />
                Emergency in Progress
              </CardTitle>
              <Badge variant={getPriorityColor(trackingData.emergency.priority)}>
                {trackingData.emergency.priority.toUpperCase()} PRIORITY
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{trackingData.patientName}</h3>
                <p className="text-sm text-muted-foreground">
                  <Activity className="inline h-4 w-4 mr-1" />
                  {trackingData.emergency.condition}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pickup Location</p>
                <p className="text-sm">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  {trackingData.emergency.pickupAddress}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Destination</p>
                <p className="text-sm">{trackingData.emergency.destinationHospital}</p>
              </div>
            </div>
            
            {trackingData.emergency.specialInstructions && (
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <p className="text-sm font-medium">Medical Notes:</p>
                <p className="text-sm text-muted-foreground">
                  {trackingData.emergency.specialInstructions}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ambulance Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-secondary" />
              Ambulance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Vehicle</p>
                <p className="font-bold text-lg">{trackingData.ambulance.vehicleNumber}</p>
              </div>
              
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Driver</p>
                <p className="font-bold text-lg">{trackingData.ambulance.driverName}</p>
              </div>
              
              <div className="text-center p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                <p className="text-sm text-muted-foreground">Status</p>
                <StatusIndicator status={trackingData.ambulance.status} showLabel />
              </div>
              
              <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                <Clock className="h-6 w-6 text-primary mx-auto mb-1" />
                <p className="text-sm text-muted-foreground">ETA</p>
                <p className="font-bold text-xl text-primary">{trackingData.ambulance.estimatedArrival}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="tracking" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="contact">Emergency Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="tracking">
            <Card className="h-[500px]" style={{backgroundImage: "url('https://2.bp.blogspot.com/-OcLdQgqCtpQ/UBLITVbMnjI/AAAAAAAABHc/V_SEnO5ZCrA/s1600/Olympic%2BPark.jpeg')"}}>
              <CardHeader >
                <CardTitle className="gap-2 text-white bg-black bg-opacity-60 px-2 py-1 rounded'">
                  <Navigation className="h-5 w-5" />
                  Real-Time Location Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full p-0">
                <EmergencyMap 
                  ambulances={[{
                    id: trackingData.ambulance.id,
                    vehicleNumber: trackingData.ambulance.vehicleNumber,
                    status: trackingData.ambulance.status,
                    driverName: trackingData.ambulance.driverName,
                    currentCall: trackingData.callId,
                    location: trackingData.ambulance.currentLocation,
                    eta: trackingData.ambulance.estimatedArrival,
                    priority: trackingData.emergency.priority
                  }]} 
                  calls={[]}
                  focusedAmbulance={trackingData.ambulance.id}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Response Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingData.timeline.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        item.status === 'completed' ? 'bg-success border-success' :
                        item.status === 'current' ? 'bg-primary border-primary animate-pulse' :
                        'bg-muted border-muted'
                      }`} />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`font-medium ${
                            item.status === 'current' ? 'text-primary' : 
                            item.status === 'completed' ? 'text-foreground' : 
                            'text-muted-foreground'
                          }`}>
                            {item.event}
                          </p>
                          <Badge variant={getTimelineItemColor(item.status)} className="text-xs">
                            {item.time}
                          </Badge>
                        </div>
                        
                        {index < trackingData.timeline.length - 1 && (
                          <div className={`w-px h-6 ml-2 mt-2 ${
                            item.status === 'completed' ? 'bg-success' :
                            item.status === 'current' ? 'bg-primary' :
                            'bg-muted'
                          }`} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start h-auto p-4">
                    <Phone className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Emergency Services</p>
                      <p className="text-sm text-muted-foreground">911</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start h-auto p-4">
                    <Phone className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Dispatch Center</p>
                      <p className="text-sm text-muted-foreground">(555) 911-DISP</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start h-auto p-4">
                    <Phone className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">{trackingData.emergency.destinationHospital}</p>
                      <p className="text-sm text-muted-foreground">(555) 911-HOSP</p>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Important Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-sm font-medium text-primary">Live Updates</p>
                    <p className="text-sm text-muted-foreground">
                      This page updates automatically every 30 seconds with the latest ambulance location and status.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <p className="text-sm font-medium text-warning-foreground">Stay Calm</p>
                    <p className="text-sm text-muted-foreground">
                      Emergency responders are on their way. The ambulance is equipped with advanced life support.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                    <p className="text-sm font-medium text-success-foreground">Hospital Prepared</p>
                    <p className="text-sm text-muted-foreground">
                      {trackingData.emergency.destinationHospital} has been notified and is preparing for arrival.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FamilyDashboard;