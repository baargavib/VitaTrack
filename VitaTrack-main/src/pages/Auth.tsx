import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Shield, Truck, Users, ArrowRight } from 'lucide-react';

const userTypes = [
  {
    id: 'admin',
    title: 'Admin/Dispatcher',
    description: 'Manage ambulances, monitor system, control dispatch',
    icon: Shield,
    route: '/admin-dashboard',
    badge: 'Control Center'
  },
  {
    id: 'driver',
    title: 'Ambulance Driver',
    description: 'Access routes, update status, receive dispatch',
    icon: Truck,
    route: '/driver-dashboard',
    badge: 'Emergency Response'
  },
  {
    id: 'family',
    title: 'Family/Hospital',
    description: 'Track ambulance, receive updates, monitor ETA',
    icon: Users,
    route: '/family-dashboard',
    badge: 'Live Tracking'
  }
];

const Auth = () => {
  const [selectedUserType, setSelectedUserType] = useState<string>('admin');
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: ''
  });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const userType = userTypes.find(type => type.id === selectedUserType);
    if (userType) {
      navigate(userType.route);
    }
  };

  const selectedType = userTypes.find(type => type.id === selectedUserType);
  const IconComponent = selectedType?.icon || Shield;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Brand & Hero Section */}
        <div className="text-center lg:text-left space-y-6">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className="p-3 bg-primary rounded-xl shadow-lg">
              <Stethoscope className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">VitaTrack</h1>
              <p className="text-muted-foreground">Smart Emergency Response</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Real-Time Ambulance Tracking & Priority Clearance System
            </h2>
            <p className="text-muted-foreground text-lg">
              Reducing emergency response times with intelligent routing, 
              real-time tracking, and automated public alerts.
            </p>
          </div>

          {/* Features */}
          <div className="grid gap-3 max-w-md mx-auto lg:mx-0">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Live GPS Tracking & ETA Updates</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>Smart Traffic Alert System</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Hospital Readiness Notifications</span>
            </div>
          </div>
        </div>

        {/* Authentication Card */}
        <Card className="w-full max-w-md mx-auto shadow-xl border-card-border">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <IconComponent className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl">{selectedType?.title}</CardTitle>
            </div>
            {selectedType && (
              <Badge variant="outline" className="mx-auto">
                {selectedType.badge}
              </Badge>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* User Type Selection */}
            <div className="grid grid-cols-3 gap-2">
              {userTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedUserType(type.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedUserType === type.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mx-auto mb-1" />
                    <span className="text-xs font-medium">{type.title.split('/')[0]}</span>
                  </button>
                );
              })}
            </div>

            <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(val) => setIsLogin(val === 'login')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-primary-hover">
                    Access Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-primary-hover">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <p className="text-xs text-muted-foreground text-center">
              Emergency access? Contact system administrator
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;