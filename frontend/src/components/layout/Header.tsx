import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" to="/">
            <span className="font-bold">Freelance Platform</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/">Projects</Link>
            </Button>
            <Button variant="ghost">My Tasks</Button>
            <Button variant="ghost">Messages</Button>
          </nav>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};