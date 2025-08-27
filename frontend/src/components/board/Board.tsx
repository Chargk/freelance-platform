import React from 'react';
import { motion } from 'framer-motion';
import { Column } from './Column';
import { Button } from '../ui/Button';
import { useBoardStore } from '../../store/useBoardStore';
import type { Column as ColumnType } from '../../types/board';

interface BoardProps {
  title: string;
  columns: ColumnType[];
}

export const Board: React.FC<BoardProps> = ({ title, columns }) => {
  const { addColumn, currentBoard } = useBoardStore();

  const handleAddColumn = () => {
    if (currentBoard) {
      addColumn(currentBoard.id, 'New Column');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground/80">{title}</h2>
        <Button variant="outline" size="sm" onClick={handleAddColumn}>
          Add Column
        </Button>
      </div>
      
      <motion.div 
        className="flex gap-6 overflow-x-auto pb-4"
        layout
      >
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={column.tasks}
          />
        ))}
      </motion.div>
    </div>
  );
};