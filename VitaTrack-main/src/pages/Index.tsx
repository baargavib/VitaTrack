import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Shield, Truck, Users, Activity, MapPin, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MapPin,
      title: 'Real-Time GPS Tracking',
      description: 'Live ambulance location monitoring with continuous updates and ETA calculations.'
    },
    {
      icon: AlertTriangle,
      title: 'Smart Alert System',
      description: 'Automated public notifications and traffic clearance through IoT signboards.'
    },
    {
      icon: Activity,
      title: 'Hospital Readiness',
      description: 'Instant hospital notifications with patient data and arrival preparation.'
    },
    {
      icon: Clock,
      title: 'Optimized Dispatch',
      description: 'AI-powered ambulance assignment based on location and traffic conditions.'
    }
  ];

  const stats = [
    { number: '98.5%', label: 'Success Rate', color: 'text-success' },
    { number: '6.2min', label: 'Avg Response', color: 'text-secondary' },
    { number: '24/7', label: 'Monitoring', color: 'text-primary' },
    { number: '15+', label: 'Cities', color: 'text-warning' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Stethoscope className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">VitaTrack</h1>
                <p className="text-sm text-muted-foreground">Smart Emergency Response</p>
              </div>
            </div>
            
            <Button onClick={() => navigate('/auth')} className="bg-primary hover:bg-primary-hover">
              Access System
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4">
            🚨 Emergency Response System
          </Badge>
          
          <h1 className="text-5xl font-bold text-foreground leading-tight">
            Smart Ambulance Tracking & 
            <span className="text-primary"> Priority Clearance</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionary emergency response system reducing ambulance delays through real-time tracking, 
            smart traffic alerts, and automated hospital preparation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="bg-primary hover:bg-primary-hover text-lg px-8"
            >
              Enter System
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/auth')}
              className="text-lg px-8"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Complete Emergency Response Solution
          </h2>
          <p className="text-muted-foreground text-lg">
            Every second counts in emergency response. Our system ensures faster, smarter ambulance deployment.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="border-card-border hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-3">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* User Roles */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Multi-User Access Control
          </h2>
          <p className="text-muted-foreground text-lg">
            Designed for different roles in the emergency response ecosystem.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-secondary/20 bg-secondary/5 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-8 w-8 text-secondary" />
                <div>
                  <CardTitle className="text-secondary">Admin/Dispatcher</CardTitle>
                  <Badge variant="secondary" className="text-xs">Control Center</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Complete system oversight with ambulance management, dispatch control, and traffic monitoring.
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Real-time ambulance tracking</li>
                <li>• Emergency call management</li>
                <li>• IoT signboard control</li>
                <li>• Performance analytics</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <Truck className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-primary">Ambulance Driver</CardTitle>
                  <Badge variant="default" className="text-xs">Emergency Response</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Optimized navigation with real-time updates and direct communication with dispatch.
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• GPS navigation & routing</li>
                <li>• Status update controls</li>
                <li>• Emergency communications</li>
                <li>• Traffic alert integration</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-success/20 bg-success/5 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-8 w-8 text-success" />
                <div>
                  <CardTitle className="text-success">Family/Hospital</CardTitle>
                  <Badge variant="success" className="text-xs">Live Tracking</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Real-time ambulance tracking with ETA updates and patient status notifications.
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Live location tracking</li>
                <li>• ETA notifications</li>
                <li>• Patient status updates</li>
                <li>• Emergency contact access</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Emergency Response?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join the revolution in emergency medical services. Every second saved can mean the difference between life and death.
          </p>
          
          <Button 
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-white text-primary hover:bg-white/90 text-lg px-8"
          >
            Access VitaTrack System
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Stethoscope className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold">VitaTrack</p>
                <p className="text-sm text-muted-foreground">Smart Emergency Response System</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 VitaTrack. Saving lives through technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
