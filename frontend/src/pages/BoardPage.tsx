import React from 'react';
import { Board } from '../components/board/Board';

// Temporary mock data
const mockData = {
  title: "Project Development",
  columns: [
    {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: "1",
          title: "Design System",
          description: "Create a comprehensive design system for the project",
          tags: ["design", "high-priority"],
          deadline: "2024-04-01"
        },
        {
          id: "2",
          title: "API Integration",
          description: "Integrate backend APIs with frontend",
          tags: ["backend", "api"],
          deadline: "2024-04-15"
        }
      ]
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [
        {
          id: "3",
          title: "User Authentication",
          description: "Implement user authentication flow",
          tags: ["security", "frontend"],
          deadline: "2024-03-25"
        }
      ]
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        {
          id: "4",
          title: "Project Setup",
          description: "Initial project setup and configuration",
          tags: ["setup"],
          deadline: "2024-03-10"
        }
      ]
    }
  ]
};

export const BoardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Board title={mockData.title} columns={mockData.columns} />
    </div>
  );
};