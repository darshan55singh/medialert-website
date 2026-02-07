import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, Pill, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppNavbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/dashboard" className="flex items-center gap-2">
            <Pill className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">
              Medi
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Alert
              </span>
            </span>
          </a>

          {/* User Info & Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{user?.email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
