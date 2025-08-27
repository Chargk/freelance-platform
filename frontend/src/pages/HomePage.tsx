import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/useAuthStore';

export const HomePage: React.FC = () => {
  const { token } = useAuthStore();

  if (token) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold">Welcome to Freelance Platform</h1>
          <p className="text-lg text-muted-foreground">
            Manage your projects and tasks efficiently
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/board">Go to Boards</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome to Freelance Platform</h1>
        <p className="text-lg text-muted-foreground">
          The best way to manage your freelance projects
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild variant="outline" size="lg">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild size="lg">
            <Link to="/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};