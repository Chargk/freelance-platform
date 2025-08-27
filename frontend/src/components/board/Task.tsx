import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/Card';
import { useBoardStore } from '../../store/useBoardStore';
import { TaskModal } from './TaskModal';
import { Pencil, Trash2 } from 'lucide-react';
import type { Task as TaskType } from '../../types/board';

interface TaskProps {
  task: TaskType;
  columnId: string;
}

export const Task: React.FC<TaskProps> = ({ task, columnId }) => {
  const { deleteTask, updateTask, currentBoard } = useBoardStore();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      if (currentBoard) {
        await deleteTask(currentBoard._id, columnId, task._id);
      }
    } catch (error: any) {
      console.error('Failed to delete task:', error);
      setError(error.message || 'Failed to delete task');
    }
  };

  const handleUpdate = async (taskData: {
    title: string;
    description: string;
    deadline?: string;
    tags?: string[];
  }) => {
    try {
      if (currentBoard) {
        await updateTask(currentBoard._id, columnId, task._id, taskData);
        setIsEditing(false);
        setError(null);
      }
    } catch (error: any) {
      console.error('Failed to update task:', error);
      setError(error.message || 'Failed to update task');
    }
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Card 
          className="cursor-pointer hover:border-primary/50 transition-colors group"
        >
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium leading-none">{task.title}</h4>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-accent"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={handleDelete}
                  className="text-muted-foreground hover:text-destructive p-1 rounded-md hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">{task.description}</p>
            
            {task.tags && task.tags.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {task.deadline && (
              <div className="flex items-center text-xs text-muted-foreground">
                <span>Due {new Date(task.deadline).toLocaleDateString()}</span>
              </div>
            )}

            {error && (
              <div className="text-sm text-destructive">
                {error}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {isEditing && (
        <TaskModal
          onClose={() => {
            setIsEditing(false);
            setError(null);
          }}
          onSubmit={handleUpdate}
          initialData={task}
        />
      )}
    </>
  );
};