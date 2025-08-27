import React from 'react';
import { motion } from 'framer-motion';
import { Task } from './Task';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useBoardStore } from '../../store/useBoardStore';
import { Trash2 } from 'lucide-react';
import type { Task as TaskType } from '../../types/board';

interface ColumnProps {
  id: string;
  title: string;
  tasks: TaskType[];
}

export const Column: React.FC<ColumnProps> = ({ id, title, tasks }) => {
  const { addTask, deleteColumn, currentBoard } = useBoardStore();

  const handleAddTask = () => {
    if (currentBoard) {
      addTask(currentBoard.id, id, {
        title: 'New Task',
        description: 'Add description here',
      });
    }
  };

  const handleDeleteColumn = () => {
    if (currentBoard) {
      deleteColumn(currentBoard.id, id);
    }
  };

  return (
    <Card className="w-80 shrink-0 bg-muted/50">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm">{title}</h3>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
              {tasks.length}
            </span>
          </div>
          <button
            onClick={handleDeleteColumn}
            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity p-1 rounded-md hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        
        <motion.div 
          className="space-y-2 min-h-[200px]"
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
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={handleAddTask}
        >
          + Add Task
        </Button>
      </div>
    </Card>
  );
};