import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/useAuthStore';
import { LogOut, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, token, logout } = useAuthStore();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" to="/">
            <span className="font-bold">Freelance Platform</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {token ? (
            <>
              <nav className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/">Projects</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/board">Board</Link>
                </Button>
                <Button variant="ghost">Messages</Button>
              </nav>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  {user?.name || 'User'}
                </Button>
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-destructive flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <nav className="flex items-center space-x-2">
              {location.pathname !== '/login' && (
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
              )}
              {location.pathname !== '/register' && (
                <Button asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};