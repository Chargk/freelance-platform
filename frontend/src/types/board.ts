export interface Task {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
  createdAt: string;
  updatedAt: string;
}

export interface BoardState {
  boards: Board[];
  currentBoard: Board | null;
  isLoading: boolean;
  error: string | null;
}

export interface BoardActions {
  // Board actions
  createBoard: (title: string) => void;
  updateBoard: (id: string, title: string) => void;
  deleteBoard: (id: string) => void;
  setCurrentBoard: (id: string) => void;
  
  // Column actions
  addColumn: (boardId: string, title: string) => void;
  updateColumn: (boardId: string, columnId: string, title: string) => void;
  deleteColumn: (boardId: string, columnId: string) => void;
  
  // Task actions
  addTask: (boardId: string, columnId: string, task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (boardId: string, columnId: string, taskId: string, task: Partial<Task>) => void;
  deleteTask: (boardId: string, columnId: string, taskId: string) => void;
  moveTask: (
    boardId: string,
    fromColumnId: string,
    toColumnId: string,
    taskId: string
  ) => void;
}