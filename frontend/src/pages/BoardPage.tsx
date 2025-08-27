import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Board } from '../components/board/Board';
import { useBoardStore } from '../store/useBoardStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';

export const BoardPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    boards, 
    currentBoard, 
    createBoard, 
    deleteBoard,
    setCurrentBoard,
    fetchBoards,
    isLoading,
    error 
  } = useBoardStore();

  const [isCreating, setIsCreating] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [isBoardMenuOpen, setIsBoardMenuOpen] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  useEffect(() => {
    const loadBoards = async () => {
      try {
        await fetchBoards();
      } catch (error) {
        // Error handling is done in the store
      }
    };
    loadBoards();
  }, [fetchBoards]);

  const handleCreateBoard = async () => {
    if (!newBoardTitle.trim()) {
      setCreateError('Board title is required');
      return;
    }

    try {
      setCreateError(null);
      await createBoard(newBoardTitle.trim());
      setNewBoardTitle('');
      setIsCreating(false);
    } catch (error: any) {
      setCreateError(error.message || 'Failed to create board');
    }
  };

  const handleDeleteBoard = async () => {
    if (!currentBoard) return;

    try {
      await deleteBoard(currentBoard._id);
      if (boards.length > 1) {
        const nextBoard = boards.find(board => board._id !== currentBoard._id);
        if (nextBoard) {
          setCurrentBoard(nextBoard._id);
        }
      }
    } catch (error: any) {
      // Error handling is done in the store
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center space-y-4 text-destructive">
          <p>Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (!currentBoard || boards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Welcome to your Board</h2>
          <Button onClick={() => setIsCreating(true)}>
            Create Your First Board
          </Button>

          {isCreating && (
            <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
              <Card className="w-[400px] p-6">
                <h3 className="text-lg font-semibold mb-4">Create New Board</h3>
                <div className="space-y-4">
                  {createError && (
                    <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                      {createError}
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium">Board Title</label>
                    <Input
                      value={newBoardTitle}
                      onChange={(e) => {
                        setNewBoardTitle(e.target.value);
                        setCreateError(null);
                      }}
                      placeholder="Enter board title"
                      className="mt-1"
                      autoFocus
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsCreating(false);
                        setNewBoardTitle('');
                        setCreateError(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreateBoard}
                      disabled={!newBoardTitle.trim()}
                    >
                      Create
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setIsBoardMenuOpen(!isBoardMenuOpen)}
            >
              {currentBoard.title}
              <ChevronDown className="h-4 w-4" />
            </Button>
            
            {isBoardMenuOpen && (
              <Card className="absolute top-full mt-1 w-[200px] z-50">
                <div className="p-2">
                  {boards.map((board) => (
                    <button
                      key={board._id}
                      className={`w-full text-left px-2 py-1 rounded hover:bg-accent ${
                        board._id === currentBoard._id ? 'bg-accent' : ''
                      }`}
                      onClick={() => {
                        setCurrentBoard(board._id);
                        setIsBoardMenuOpen(false);
                      }}
                    >
                      {board.title}
                    </button>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsCreating(true)}
          >
            <Plus className="h-4 w-4" />
            New Board
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="ml-auto text-destructive hover:text-destructive hover:bg-destructive/10 flex items-center gap-2"
            onClick={handleDeleteBoard}
          >
            <Trash2 className="h-4 w-4" />
            Delete Board
          </Button>
        </div>

        {currentBoard && <Board title={currentBoard.title} columns={currentBoard.columns} />}

        {isCreating && (
          <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
            <Card className="w-[400px] p-6">
              <h3 className="text-lg font-semibold mb-4">Create New Board</h3>
              <div className="space-y-4">
                {createError && (
                  <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                    {createError}
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium">Board Title</label>
                  <Input
                    value={newBoardTitle}
                    onChange={(e) => {
                      setNewBoardTitle(e.target.value);
                      setCreateError(null);
                    }}
                    placeholder="Enter board title"
                    className="mt-1"
                    autoFocus
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreating(false);
                      setNewBoardTitle('');
                      setCreateError(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateBoard}
                    disabled={!newBoardTitle.trim()}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};