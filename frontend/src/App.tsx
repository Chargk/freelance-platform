import React from 'react';
import { Layout } from './components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card';
import { Button } from './components/ui/Button';

function App() {
  return (
    <Layout>
      <div className="grid gap-6">
        <h1 className="text-3xl font-bold">Welcome to Freelance Platform</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Website Redesign</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Looking for a skilled designer to revamp our company website with modern UI/UX principles.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">$2,000 - $3,000</span>
                <Button size="sm">View Details</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mobile App Development</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Need an experienced React Native developer for a fitness tracking app.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">$5,000 - $7,000</span>
                <Button size="sm">View Details</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Writing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Seeking a content writer for creating engaging blog posts about technology.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">$500 - $800</span>
                <Button size="sm">View Details</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default App;