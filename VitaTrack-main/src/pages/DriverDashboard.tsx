import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatusIndicator from '@/components/StatusIndicator';
import { Truck, Navigation, Clock, AlertTriangle, Phone, MessageSquare, MapPin, Activity } from 'lucide-react';

// Mock driver data
const mockDriverData = {
  id: 'DRV-001',
  name: 'John Smith',
  ambulanceId: 'AMB-001',
  vehicleNumber: 'EMR-2024-01',
  status: 'en_route',
  currentCall: {
    id: 'CALL-2024-156',
    patientName: 'Robert Chen',
    address: '123 Broadway St, NYC',
    priority: 'critical',
    condition: 'Cardiac arrest',
    estimatedArrival: '8 mins',
    specialInstructions: 'Patient is conscious but experiencing chest pain. Family on scene.',
    hospitalDestination: 'NYC General Hospital',
    dispatchTime: '2024-01-15T14:30:00Z'
  },
  location: { lat: 40.7589, lng: -73.9851 }
};

const mockRouteInstructions = [
  { instruction: 'Head north on Broadway', distance: '0.3 mi', time: '2 mins' },
  { instruction: 'Turn right onto 42nd St', distance: '0.5 mi', time: '3 mins' },
  { instruction: 'Turn left onto Park Ave', distance: '0.2 mi', time: '1 min' },
  { instruction: 'Arrive at destination', distance: '0.1 mi', time: '2 mins' }
];

const DriverDashboard = () => {
  const [driverData, setDriverData] = useState(mockDriverData);
  const [currentStatus, setCurrentStatus] = useState(driverData.status);

  const statusOptions = [
    { value: 'available', label: 'Available', color: 'success' },
    { value: 'dispatched', label: 'Dispatched', color: 'warning' },
    { value: 'en_route', label: 'En Route', color: 'secondary' },
    { value: 'at_scene', label: 'At Scene', color: 'primary' },
    { value: 'transporting', label: 'Transporting', color: 'destructive' },
    { value: 'at_hospital', label: 'At Hospital', color: 'success' },
    { value: 'offline', label: 'Offline', color: 'muted' }
  ];

  const updateStatus = (newStatus: string) => {
    setCurrentStatus(newStatus);
    setDriverData(prev => ({ ...prev, status: newStatus }));
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Truck className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">VitaTrack Driver</h1>
              <p className="text-sm text-muted-foreground">{driverData.vehicleNumber}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <StatusIndicator status={currentStatus} />
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Dispatch
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        {/* Current Emergency Card */}
        {driverData.currentCall && (
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <AlertTriangle className="h-5 w-5" />
                  Active Emergency Call
                </CardTitle>
                <Badge variant={getPriorityColor(driverData.currentCall.priority)}>
                  {driverData.currentCall.priority.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">{driverData.currentCall.patientName}</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    {driverData.currentCall.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <Activity className="inline h-4 w-4 mr-1" />
                    {driverData.currentCall.condition}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-semibold">ETA: {driverData.currentCall.estimatedArrival}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Destination: {driverData.currentCall.hospitalDestination}
                  </p>
                </div>
              </div>
              
              {driverData.currentCall.specialInstructions && (
                <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="text-sm font-medium text-warning-foreground">
                    Special Instructions:
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {driverData.currentCall.specialInstructions}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="navigation" className="space-y-6">
          <TabsList>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="status">Status Control</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>

          <TabsContent value="navigation">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Route Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Navigation className="h-5 w-5" />
                    Route Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockRouteInstructions.map((step, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{step.instruction}</p>
                        <p className="text-sm text-muted-foreground">
                          {step.distance} • {step.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card style={{backgroundImage: "url('https://2.bp.blogspot.com/-OcLdQgqCtpQ/UBLITVbMnjI/AAAAAAAABHc/V_SEnO5ZCrA/s1600/Olympic%2BPark.jpeg')"}}>
                <CardHeader className='gap-2 text-white bg-black bg-opacity-60 px-2 py-1 rounded' >
                  <CardTitle>Live Navigation Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-muted/30 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin 
                        className="h-12 w-12 mx-auto mb-2 text-blue-600 font-bold" 
                        style={{ 
                          textShadow: `
                            -1px -1px 0 #fff,  
                            1px -1px 0 #fff,
                            -1px 1px 0 #fff,
                            1px 1px 0 #fff,
                            2px 2px 4px rgba(0,0,0,0.5)
                          ` 
                        }} 
                      />
                      <p 
                        className="text-blue-600 font-bold text-xl" 
                        style={{ 
                          textShadow: `
                            -1px -1px 0 #fff,  
                            1px -1px 0 #fff,
                            -1px 1px 0 #fff,
                            1px 1px 0 #fff,
                            2px 2px 4px rgba(0,0,0,0.5)
                          ` 
                        }}
                      >
                        Real-time GPS navigation will display here
                      </p>
                      <p className="text-blue-600">Optimized route with traffic updates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="status">
            <Card>
              <CardHeader>
                <CardTitle>Update Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {statusOptions.map((status) => (
                    <Button
                      key={status.value}
                      variant={currentStatus === status.value ? "default" : "outline"}
                      onClick={() => updateStatus(status.value)}
                      className="justify-start h-auto p-4"
                    >
                      <div className="flex items-center gap-3">
                        <StatusIndicator status={status.value} size="sm" />
                        <div className="text-left">
                          <p className="font-medium">{status.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {status.value === 'available' && 'Ready for dispatch'}
                            {status.value === 'dispatched' && 'Assigned to call'}
                            {status.value === 'en_route' && 'Traveling to scene'}
                            {status.value === 'at_scene' && 'Arrived at location'}
                            {status.value === 'transporting' && 'Patient on board'}
                            {status.value === 'at_hospital' && 'At medical facility'}
                            {status.value === 'offline' && 'Not available'}
                          </p>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Dispatch Center: (555) 911-DISP
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Hospital Direct: (555) 911-HOSP
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Text Dispatch
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium">Dispatch</p>
                    <p className="text-sm text-muted-foreground">
                      Patient condition stable. Hospital notified of arrival.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                  
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm font-medium text-primary">System Alert</p>
                    <p className="text-sm text-muted-foreground">
                      Traffic delay detected. Route updated automatically.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">5 minutes ago</p>
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

export default DriverDashboard;