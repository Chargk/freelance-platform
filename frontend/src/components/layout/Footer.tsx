import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 Freelance Platform. All rights reserved.
          </p>
          <nav className="flex items-center space-x-4 text-sm text-muted-foreground">
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};