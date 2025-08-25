import React from 'react';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">Freelance Platform</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost">Projects</Button>
            <Button variant="ghost">My Tasks</Button>
            <Button variant="ghost">Messages</Button>
          </nav>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost">Sign In</Button>
            <Button>Sign Up</Button>
          </nav>
        </div>
      </div>
    </header>
  );
};