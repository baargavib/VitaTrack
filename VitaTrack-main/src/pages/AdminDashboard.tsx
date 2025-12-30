import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmergencyMap from '@/components/EmergencyMap';
import StatusIndicator from '@/components/StatusIndicator';
import AlertSystem from '@/components/AlertSystem';
import { Shield, Truck, Activity, AlertTriangle, Users, MapPin, Clock, Phone } from 'lucide-react';
import { auth, db } from '../firebase'; // Import auth and db from your firebase config
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

// Mock data
const mockAmbulances = [
  {
    id: 'AMB-001',
    vehicleNumber: 'EMR-2024-01',
    status: 'en_route',
    driverName: 'John Smith',
    currentCall: 'CALL-2024-156',
    location: { lat: 40.7589, lng: -73.9851 },
    eta: '8 mins',
    priority: 'critical'
  },
  {
    id: 'AMB-002', 
    vehicleNumber: 'EMR-2024-02',
    status: 'available',
    driverName: 'Sarah Johnson',
    currentCall: null,
    location: { lat: 40.7505, lng: -73.9934 },
    eta: null,
    priority: null
  },
  {
    id: 'AMB-003',
    vehicleNumber: 'EMR-2024-03', 
    status: 'at_hospital',
    driverName: 'Mike Wilson',
    currentCall: 'CALL-2024-154',
    location: { lat: 40.7614, lng: -73.9776 },
    eta: 'Arrived',
    priority: 'high'
  }
];

const mockEmergencyCalls = [
  {
    id: 'CALL-2024-156',
    patientName: 'Robert Chen',
    callerPhone: '+1-555-0123',
    address: '123 Broadway St, NYC',
    priority: 'critical',
    condition: 'Cardiac arrest',
    ambulanceId: 'AMB-001',
    status: 'dispatched',
    createdAt: '2024-01-15T14:30:00Z'
  },
  {
    id: 'CALL-2024-157',
    patientName: 'Maria Rodriguez',
    callerPhone: '+1-555-0124', 
    address: '456 Park Ave, NYC',
    priority: 'high',
    condition: 'Severe injury',
    ambulanceId: null,
    status: 'pending',
    createdAt: '2024-01-15T14:45:00Z'
  }
];

const AdminDashboard = () => {
  const [ambulances, setAmbulances] = useState(mockAmbulances);
  const [emergencyCalls, setEmergencyCalls] = useState(mockEmergencyCalls);
  const [selectedAmbulance, setSelectedAmbulance] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null); // State to hold the authenticated user
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [notifications, setNotifications] = useState<any[]>([]); // New state for live notifications
  const [newNotificationText, setNewNotificationText] = useState(''); // State for adding new notifications

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAmbulances(prev => prev.map(amb => ({
        ...amb,
        location: {
          lat: amb.location.lat + (Math.random() - 0.5) * 0.001,
          lng: amb.location.lng + (Math.random() - 0.5) * 0.001
        }
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Listen for Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Listen for real-time notifications from Firestore
  useEffect(() => {
    // Create a query to get the latest 5 notifications, ordered by creation time
    const q = query(collection(db, "notifications"), orderBy("createdAt", "desc"), limit(5));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const liveNotifications: any[] = [];
      querySnapshot.forEach((doc) => {
        liveNotifications.push({ id: doc.id, ...doc.data() });
      });
      setNotifications(liveNotifications);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Authentication handlers
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signed up successfully!');
    } catch (error: any) {
      alert(`Error signing up: ${error.message}`);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Signed in successfully!');
    } catch (error: any) {
      alert(`Error signing in: ${error.message}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('Signed out successfully!');
      setEmail(''); // Clear inputs on sign out
      setPassword('');
    } catch (error: any) {
      alert(`Error signing out: ${error.message}`);
    }
  };

  // Handler to add a new notification to Firestore
  const handleAddNotification = async () => {
    if (newNotificationText.trim() === '') return;
    try {
      await addDoc(collection(db, "notifications"), {
        message: newNotificationText,
        createdAt: serverTimestamp(), // Use server timestamp for consistent ordering
        read: false,
        type: 'info' // You can categorize notifications
      });
      setNewNotificationText('');
      alert('Notification added!');
    } catch (error: any) {
      alert(`Error adding notification: ${error.message}`);
    }
  };

  const getStatusColor = (status: string): "success" | "warning" | "secondary" | "default" | "muted" => {
    const colors = {
      available: 'success' as const,
      dispatched: 'warning' as const, 
      en_route: 'secondary' as const,
      at_hospital: 'default' as const,
      offline: 'muted' as const
    };
    return colors[status as keyof typeof colors] || 'muted';
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
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">VitaTrack Control Center</h1>
              <p className="text-sm text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <AlertSystem />
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Emergency Contact
            </Button>
            {/* Authentication UI */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>
                <Button onClick={handleSignOut} size="sm" variant="destructive">Sign Out</Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 border rounded text-black" // Added text-black for visibility
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 border rounded text-black" // Added text-black for visibility
                />
                <Button onClick={handleSignIn} size="sm">Sign In</Button>
                <Button onClick={handleSignUp} size="sm" variant="secondary">Sign Up</Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Ambulances</p>
                  <p className="text-3xl font-bold text-foreground">
                    {ambulances.filter(a => a.status !== 'offline').length}
                  </p>
                </div>
                <Truck className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Emergency Calls</p>
                  <p className="text-3xl font-bold text-foreground">{emergencyCalls.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                  <p className="text-3xl font-bold text-foreground">6.2</p>
                  <p className="text-sm text-muted-foreground">minutes</p>
                </div>
                <Clock className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-3xl font-bold text-foreground">98.5%</p>
                </div>
                <Activity className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="map" className="space-y-6">
          <TabsList>
            <TabsTrigger value="map">Live Map</TabsTrigger>
            <TabsTrigger value="ambulances">Ambulances</TabsTrigger>
            <TabsTrigger value="calls">Emergency Calls</TabsTrigger>
            <TabsTrigger value="alerts">Alert System</TabsTrigger>
          </TabsList>

          <TabsContent value="map">
          <Card 
    className="h-[600px] bg-cover bg-center relative" 
    style={{ backgroundImage: "url('https://2.bp.blogspot.com/-OcLdQgqCtpQ/UBLITVbMnjI/AAAAAAAABHc/V_SEnO5ZCrA/s1600/Olympic%2BPark.jpeg')" }}
  >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white bg-black bg-opacity-60 px-2 py-1 rounded">
                  <MapPin className="h-5 w-5" />
                  Real-Time Ambulance Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full p-0">
                <EmergencyMap ambulances={ambulances} calls={emergencyCalls} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ambulances">
            <div className="grid gap-4">
              {ambulances.map((ambulance) => (
                <Card key={ambulance.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-secondary/10 rounded-lg">
                          <Truck className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{ambulance.vehicleNumber}</h3>
                          <p className="text-sm text-muted-foreground">Driver: {ambulance.driverName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <StatusIndicator status={ambulance.status} />
                        {ambulance.currentCall && (
                          <Badge variant={getPriorityColor(ambulance.priority || 'medium')}>
                            {ambulance.priority?.toUpperCase()}
                          </Badge>
                        )}
                        <div className="text-right">
                          <p className="text-sm font-medium">{ambulance.eta || 'Available'}</p>
                          <p className="text-xs text-muted-foreground">
                            {ambulance.currentCall || 'No active call'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calls">
            <div className="grid gap-4">
              {emergencyCalls.map((call) => (
                <Card key={call.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(call.priority)}>
                            {call.priority.toUpperCase()}
                          </Badge>
                          <span className="font-semibold">{call.id}</span>
                        </div>
                        <h3 className="font-medium">Patient: {call.patientName}</h3>
                        <p className="text-sm text-muted-foreground">{call.address}</p>
                        <p className="text-sm">Condition: {call.condition}</p>
                        <p className="text-xs text-muted-foreground">
                          Called: {new Date(call.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      
                      <div className="text-right space-y-2">
                        <StatusIndicator status={call.status} />
                        {call.ambulanceId ? (
                          <p className="text-sm font-medium">{call.ambulanceId}</p>
                        ) : (
                          <Button size="sm" className="bg-primary hover:bg-primary-hover">
                            Assign Ambulance
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Digital Signboard Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Manage IoT digital signboards for traffic clearance and public alerts.
                </p>
                <Button className="bg-primary hover:bg-primary-hover">
                  Configure Signboards
                </Button>
              </CardContent>
            </Card>

            {/* Live Notifications Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Live Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div key={notification.id} className="p-3 bg-blue-100 border border-blue-200 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.createdAt?.toDate().toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No live notifications.</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add new notification..."
                    value={newNotificationText}
                    onChange={(e) => setNewNotificationText(e.target.value)}
                    className="flex-1 p-2 border rounded text-black" // Added text-black for visibility
                  />
                  <Button onClick={handleAddNotification}>Add Notification</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;