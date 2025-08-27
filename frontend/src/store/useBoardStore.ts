import { create } from 'zustand';
import { BoardState, BoardActions, Task } from '../types/board';

const initialState: BoardState = {
  boards: [],
  currentBoard: null,
  isLoading: false,
  error: null,
};

export const useBoardStore = create<BoardState & BoardActions>((set, get) => ({
  ...initialState,

  // Board actions
  createBoard: (title) => {
    const newBoard = {
      id: crypto.randomUUID(),
      title,
      columns: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      boards: [...state.boards, newBoard],
      currentBoard: newBoard,
    }));
  },

  updateBoard: (id, title) => {
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === id
          ? { ...board, title, updatedAt: new Date().toISOString() }
          : board
      ),
      currentBoard:
        state.currentBoard?.id === id
          ? { ...state.currentBoard, title, updatedAt: new Date().toISOString() }
          : state.currentBoard,
    }));
  },

  deleteBoard: (id) => {
    set((state) => ({
      boards: state.boards.filter((board) => board.id !== id),
      currentBoard: state.currentBoard?.id === id ? null : state.currentBoard,
    }));
  },

  setCurrentBoard: (id) => {
    const board = get().boards.find((board) => board.id === id);
    set({ currentBoard: board || null });
  },

  // Column actions
  addColumn: (boardId, title) => {
    const newColumn = {
      id: crypto.randomUUID(),
      title,
      tasks: [],
    };

    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: [...board.columns, newColumn],
              updatedAt: new Date().toISOString(),
            }
          : board
      ),
      currentBoard:
        state.currentBoard?.id === boardId
          ? {
              ...state.currentBoard,
              columns: [...state.currentBoard.columns, newColumn],
              updatedAt: new Date().toISOString(),
            }
          : state.currentBoard,
    }));
  },

  updateColumn: (boardId, columnId, title) => {
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId ? { ...column, title } : column
              ),
              updatedAt: new Date().toISOString(),
            }
          : board
      ),
      currentBoard:
        state.currentBoard?.id === boardId
          ? {
              ...state.currentBoard,
              columns: state.currentBoard.columns.map((column) =>
                column.id === columnId ? { ...column, title } : column
              ),
              updatedAt: new Date().toISOString(),
            }
          : state.currentBoard,
    }));
  },

  deleteColumn: (boardId, columnId) => {
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.filter((column) => column.id !== columnId),
              updatedAt: new Date().toISOString(),
            }
          : board
      ),
      currentBoard:
        state.currentBoard?.id === boardId
          ? {
              ...state.currentBoard,
              columns: state.currentBoard.columns.filter(
                (column) => column.id !== columnId
              ),
              updatedAt: new Date().toISOString(),
            }
          : state.currentBoard,
    }));
  },

  // Task actions
  addTask: (boardId, columnId, taskData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? { ...column, tasks: [...column.tasks, newTask] }
                  : column
              ),
              updatedAt: new Date().toISOString(),
            }
          : board
      ),
      currentBoard:
        state.currentBoard?.id === boardId
          ? {
              ...state.currentBoard,
              columns: state.currentBoard.columns.map((column) =>
                column.id === columnId
                  ? { ...column, tasks: [...column.tasks, newTask] }
                  : column
              ),
              updatedAt: new Date().toISOString(),
            }
          : state.currentBoard,
    }));
  },

  updateTask: (boardId, columnId, taskId, taskData) => {
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: column.tasks.map((task) =>
                        task.id === taskId
                          ? {
                              ...task,
                              ...taskData,
                              updatedAt: new Date().toISOString(),
                            }
                          : task
                      ),
                    }
                  : column
              ),
              updatedAt: new Date().toISOString(),
            }
          : board
      ),
      currentBoard:
        state.currentBoard?.id === boardId
          ? {
              ...state.currentBoard,
              columns: state.currentBoard.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: column.tasks.map((task) =>
                        task.id === taskId
                          ? {
                              ...task,
                              ...taskData,
                              updatedAt: new Date().toISOString(),
                            }
                          : task
                      ),
                    }
                  : column
              ),
              updatedAt: new Date().toISOString(),
            }
          : state.currentBoard,
    }));
  },

  deleteTask: (boardId, columnId, taskId) => {
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: column.tasks.filter((task) => task.id !== taskId),
                    }
                  : column
              ),
              updatedAt: new Date().toISOString(),
            }
          : board
      ),
      currentBoard:
        state.currentBoard?.id === boardId
          ? {
              ...state.currentBoard,
              columns: state.currentBoard.columns.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      tasks: column.tasks.filter((task) => task.id !== taskId),
                    }
                  : column
              ),
              updatedAt: new Date().toISOString(),
            }
          : state.currentBoard,
    }));
  },

  moveTask: (boardId, fromColumnId, toColumnId, taskId) => {
    const state = get();
    const board = state.boards.find((b) => b.id === boardId);
    if (!board) return;

    const fromColumn = board.columns.find((c) => c.id === fromColumnId);
    if (!fromColumn) return;

    const task = fromColumn.tasks.find((t) => t.id === taskId);
    if (!task) return;

    // Remove task from source column
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === fromColumnId
                  ? {
                      ...column,
                      tasks: column.tasks.filter((task) => task.id !== taskId),
                    }
                  : column.id === toColumnId
                  ? {
                      ...column,
                      tasks: [...column.tasks, task],
                    }
                  : column
              ),
              updatedAt: new Date().toISOString(),
            }
          : board
      ),
      currentBoard:
        state.currentBoard?.id === boardId
          ? {
              ...state.currentBoard,
              columns: state.currentBoard.columns.map((column) =>
                column.id === fromColumnId
                  ? {
                      ...column,
                      tasks: column.tasks.filter((task) => task.id !== taskId),
                    }
                  : column.id === toColumnId
                  ? {
                      ...column,
                      tasks: [...column.tasks, task],
                    }
                  : column
              ),
              updatedAt: new Date().toISOString(),
            }
          : state.currentBoard,
    }));
  },
}));