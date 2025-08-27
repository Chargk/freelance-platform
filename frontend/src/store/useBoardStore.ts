import { create } from 'zustand';
import { boardsAPI } from '../services/api';
import { BoardState, BoardActions } from '../types/board';

export const useBoardStore = create<BoardState & BoardActions>((set, get) => ({
  boards: [],
  currentBoard: null,
  isLoading: false,
  error: null,

  // Load boards
  fetchBoards: async () => {
    set({ isLoading: true, error: null });
    try {
      const boards = await boardsAPI.getBoards();
      set({ 
        boards,
        currentBoard: boards.length > 0 ? boards[0] : null,
        isLoading: false 
      });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch boards',
        isLoading: false,
      });
      throw error;
    }
  },

  // Board actions
  createBoard: async (title) => {
    set({ isLoading: true, error: null });
    try {
      const board = await boardsAPI.createBoard(title);
      set((state) => ({
        boards: [...state.boards, board],
        currentBoard: board,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Failed to create board',
        isLoading: false,
      });
      throw error;
    }
  },

  updateBoard: async (id, title) => {
    set({ isLoading: true, error: null });
    try {
      const updatedBoard = await boardsAPI.updateBoard(id, { title });
      set((state) => ({
        boards: state.boards.map((board) =>
          board._id === id ? updatedBoard : board
        ),
        currentBoard:
          state.currentBoard?._id === id ? updatedBoard : state.currentBoard,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Failed to update board',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteBoard: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await boardsAPI.deleteBoard(id);
      set((state) => ({
        boards: state.boards.filter((board) => board._id !== id),
        currentBoard: state.currentBoard?._id === id ? null : state.currentBoard,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Failed to delete board',
        isLoading: false,
      });
      throw error;
    }
  },

  setCurrentBoard: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const board = await boardsAPI.getBoard(id);
      set({ currentBoard: board, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to fetch board',
        isLoading: false,
      });
      throw error;
    }
  },

  // Column actions
  addColumn: async (boardId, title) => {
    set({ isLoading: true, error: null });
    try {
      const updatedBoard = await boardsAPI.addColumn(boardId, title);
      set((state) => ({
        boards: state.boards.map((board) =>
          board._id === boardId ? updatedBoard : board
        ),
        currentBoard:
          state.currentBoard?._id === boardId ? updatedBoard : state.currentBoard,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Failed to add column',
        isLoading: false,
      });
      throw error;
    }
  },

  updateColumn: async (boardId, columnId, title) => {
    set({ isLoading: true, error: null });
    try {
      const updatedBoard = await boardsAPI.updateBoard(boardId, {
        columnId,
        title,
      });
      set((state) => ({
        boards: state.boards.map((board) =>
          board._id === boardId ? updatedBoard : board
        ),
        currentBoard:
          state.currentBoard?._id === boardId ? updatedBoard : state.currentBoard,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Failed to update column',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteColumn: async (boardId, columnId) => {
    set({ isLoading: true, error: null });
    try {
      const updatedBoard = await boardsAPI.updateBoard(boardId, {
        deleteColumn: columnId,
      });
      set((state) => ({
        boards: state.boards.map((board) =>
          board._id === boardId ? updatedBoard : board
        ),
        currentBoard:
          state.currentBoard?._id === boardId ? updatedBoard : state.currentBoard,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Failed to delete column',
        isLoading: false,
      });
      throw error;
    }
  },

  // Task actions
  addTask: async (boardId, columnId, task) => {
    set({ isLoading: true, error: null });
    try {
      const updatedBoard = await boardsAPI.addTask(boardId, columnId, task);
      set((state) => ({
        boards: state.boards.map((board) =>
          board._id === boardId ? updatedBoard : board
        ),
        currentBoard:
          state.currentBoard?._id === boardId ? updatedBoard : state.currentBoard,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Failed to add task',
        isLoading: false,
      });
      throw error;
    }
  },

  updateTask: async (boardId, columnId, taskId, task) => {
    set({ isLoading: true, error: null });
    try {
      const updatedBoard = await boardsAPI.updateBoard(boardId, {
        columnId,
        taskId,
        task,
      });
      set((state) => ({
        boards: state.boards.map((board) =>
          board._id === boardId ? updatedBoard : board
        ),
        currentBoard:
          state.currentBoard?._id === boardId ? updatedBoard : state.currentBoard,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Failed to update task',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteTask: async (boardId, columnId, taskId) => {
    set({ isLoading: true, error: null });
    try {
      const updatedBoard = await boardsAPI.updateBoard(boardId, {
        columnId,
        deleteTask: taskId,
      });
      set((state) => ({
        boards: state.boards.map((board) =>
          board._id === boardId ? updatedBoard : board
        ),
        currentBoard:
          state.currentBoard?._id === boardId ? updatedBoard : state.currentBoard,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Failed to delete task',
        isLoading: false,
      });
      throw error;
    }
  },

  moveTask: async (boardId, fromColumnId, toColumnId, taskId) => {
    set({ isLoading: true, error: null });
    try {
      const updatedBoard = await boardsAPI.moveTask(
        boardId,
        taskId,
        fromColumnId,
        toColumnId
      );
      set((state) => ({
        boards: state.boards.map((board) =>
          board._id === boardId ? updatedBoard : board
        ),
        currentBoard:
          state.currentBoard?._id === boardId ? updatedBoard : state.currentBoard,
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.message || 'Failed to move task',
        isLoading: false,
      });
      throw error;
    }
  },
}));