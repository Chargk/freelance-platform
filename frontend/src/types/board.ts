export interface Task {
  _id: string;
  title: string;
  description: string;
  deadline?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

export interface Column {
  _id: string;
  title: string;
  tasks: Task[];
}

export interface Board {
  _id: string;
  title: string;
  columns: Column[];
  owner: string;
  members?: {
    user: string;
    role: 'viewer' | 'editor' | 'admin';
  }[];
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
  // Load boards
  fetchBoards: () => Promise<void>;
  
  // Board actions
  createBoard: (title: string) => Promise<void>;
  updateBoard: (id: string, title: string) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;
  setCurrentBoard: (id: string) => Promise<void>;
  
  // Column actions
  addColumn: (boardId: string, title: string) => Promise<void>;
  updateColumn: (boardId: string, columnId: string, title: string) => Promise<void>;
  deleteColumn: (boardId: string, columnId: string) => Promise<void>;
  
  // Task actions
  addTask: (
    boardId: string,
    columnId: string,
    task: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>;
  updateTask: (
    boardId: string,
    columnId: string,
    taskId: string,
    task: Partial<Task>
  ) => Promise<void>;
  deleteTask: (boardId: string, columnId: string, taskId: string) => Promise<void>;
  moveTask: (
    boardId: string,
    fromColumnId: string,
    toColumnId: string,
    taskId: string
  ) => Promise<void>;
}