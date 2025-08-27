import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/Card';
import { useBoardStore } from '../../store/useBoardStore';
import type { Task as TaskType } from '../../types/board';

interface TaskProps {
  task: TaskType;
  columnId: string;
}

export const Task: React.FC<TaskProps> = ({ task, columnId }) => {
  const { deleteTask, currentBoard } = useBoardStore();

  const handleDelete = () => {
    if (currentBoard) {
      deleteTask(currentBoard.id, columnId, task.id);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card 
        className="cursor-pointer hover:border-primary/50 transition-colors group"
        onClick={() => {
          // TODO: Open task details modal
          console.log('Open task details', task);
        }}
      >
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium leading-none">{task.title}</h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
            >
              ×
            </button>
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
        </CardContent>
      </Card>
    </motion.div>
  );
};