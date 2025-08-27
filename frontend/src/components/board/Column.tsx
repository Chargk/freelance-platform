import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Task } from './Task';
import { TaskModal } from './TaskModal';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useBoardStore } from '../../store/useBoardStore';
import { Trash2, Plus } from 'lucide-react';
import type { Task as TaskType } from '../../types/board';

interface ColumnProps {
  id: string;
  title: string;
  tasks: TaskType[];
}

export const Column: React.FC<ColumnProps> = ({ id, title, tasks }) => {
  const { addTask, deleteColumn, currentBoard } = useBoardStore();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = async (taskData: { 
    title: string; 
    description: string; 
    deadline?: string; 
    tags?: string[] 
  }) => {
    try {
      if (currentBoard) {
        await addTask(currentBoard._id, id, taskData);
        setIsAddingTask(false);
        setError(null);
      }
    } catch (error: any) {
      console.error('Failed to add task:', error);
      setError(error.message || 'Failed to add task');
    }
  };

  const handleDeleteColumn = async () => {
    try {
      if (currentBoard) {
        await deleteColumn(currentBoard._id, id);
      }
    } catch (error: any) {
      console.error('Failed to delete column:', error);
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
              key={task._id}
              task={task}
              columnId={id}
            />
          ))}
        </motion.div>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground flex items-center gap-2"
          onClick={() => setIsAddingTask(true)}
        >
          <Plus className="h-4 w-4" />
          Add Task
        </Button>

        {error && (
          <div className="text-sm text-destructive">
            {error}
          </div>
        )}

        {isAddingTask && (
          <TaskModal
            onClose={() => {
              setIsAddingTask(false);
              setError(null);
            }}
            onSubmit={handleAddTask}
          />
        )}
      </div>
    </Card>
  );
};