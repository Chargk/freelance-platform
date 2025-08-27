import React from 'react';
import { motion } from 'framer-motion';
import { Task } from './Task';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useBoardStore } from '../../store/useBoardStore';
import type { Task as TaskType } from '../../types/board';

interface ColumnProps {
  id: string;
  title: string;
  tasks: TaskType[];
}

export const Column: React.FC<ColumnProps> = ({ id, title, tasks }) => {
  const { addTask, currentBoard } = useBoardStore();

  const handleAddTask = () => {
    if (currentBoard) {
      addTask(currentBoard.id, id, {
        title: 'New Task',
        description: 'Add description here',
      });
    }
  };

  return (
    <Card className="w-80 shrink-0">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-sm text-muted-foreground">{tasks.length}</span>
        </div>
        
        <motion.div 
          className="space-y-2"
          layout
        >
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              columnId={id}
            />
          ))}
        </motion.div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground"
          onClick={handleAddTask}
        >
          + Add Task
        </Button>
      </div>
    </Card>
  );
};