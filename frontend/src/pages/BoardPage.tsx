import React, { useEffect } from 'react';
import { Board } from '../components/board/Board';
import { useBoardStore } from '../store/useBoardStore';
import { Button } from '../components/ui/Button';

export const BoardPage: React.FC = () => {
  const { 
    boards, 
    currentBoard, 
    createBoard, 
    deleteBoard,
    setCurrentBoard 
  } = useBoardStore();

  useEffect(() => {
    // If there are no boards, create a default one
    if (boards.length === 0) {
      createBoard('My First Board');
    }
    // If there are boards but no current board, set the first one as current
    else if (!currentBoard && boards.length > 0) {
      setCurrentBoard(boards[0].id);
    }
  }, [boards, currentBoard, createBoard, setCurrentBoard]);

  const handleCreateBoard = () => {
    createBoard('New Board');
  };

  const handleDeleteBoard = () => {
    if (currentBoard) {
      deleteBoard(currentBoard.id);
      // Set the first remaining board as current, if any
      if (boards.length > 1) {
        const nextBoard = boards.find(board => board.id !== currentBoard.id);
        if (nextBoard) {
          setCurrentBoard(nextBoard.id);
        }
      }
    }
  };

  if (!currentBoard) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Welcome to your Board</h2>
          <Button onClick={handleCreateBoard}>Create Your First Board</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <select
              className="bg-background border rounded-md px-3 py-2"
              value={currentBoard.id}
              onChange={(e) => setCurrentBoard(e.target.value)}
            >
              {boards.map((board) => (
                <option key={board.id} value={board.id}>
                  {board.title}
                </option>
              ))}
            </select>
            <Button onClick={handleCreateBoard}>New Board</Button>
          </div>
          <Button 
            variant="destructive" 
            onClick={handleDeleteBoard}
          >
            Delete Board
          </Button>
        </div>
        <Board title={currentBoard.title} columns={currentBoard.columns} />
      </div>
    </div>
  );
};