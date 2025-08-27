const Board = require('../models/Board');
const asyncHandler = require('express-async-handler');

// @desc    Get all user's boards
// @route   GET /api/boards
// @access  Private
const getBoards = asyncHandler(async (req, res) => {
  const boards = await Board.find({
    $or: [
      { owner: req.user._id },
      { 'members.user': req.user._id }
    ]
  });
  res.json(boards);
});

// @desc    Get single board
// @route   GET /api/boards/:id
// @access  Private
const getBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  // Check if user has access to the board
  const hasAccess = board.owner.equals(req.user._id) || 
    board.members.some(member => member.user.equals(req.user._id));

  if (!hasAccess) {
    res.status(403);
    throw new Error('Not authorized to access this board');
  }

  res.json(board);
});

// @desc    Create new board
// @route   POST /api/boards
// @access  Private
const createBoard = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Please add a title');
  }

  const board = await Board.create({
    title,
    owner: req.user._id,
    columns: [], // Створюємо дошку без колонок
  });

  res.status(201).json(board);
});

// @desc    Update board
// @route   PUT /api/boards/:id
// @access  Private
const updateBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  // Check ownership
  if (!board.owner.equals(req.user._id)) {
    res.status(403);
    throw new Error('Not authorized to update this board');
  }

  const updatedBoard = await Board.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json(updatedBoard);
});

// @desc    Delete board
// @route   DELETE /api/boards/:id
// @access  Private
const deleteBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  // Check ownership
  if (!board.owner.equals(req.user._id)) {
    res.status(403);
    throw new Error('Not authorized to delete this board');
  }

  await Board.findByIdAndDelete(req.params.id);
  res.json({ message: 'Board removed' });
});

// @desc    Add column to board
// @route   POST /api/boards/:id/columns
// @access  Private
const addColumn = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  // Check ownership or editor rights
  const member = board.members.find(m => m.user.equals(req.user._id));
  if (!board.owner.equals(req.user._id) && (!member || member.role !== 'editor')) {
    res.status(403);
    throw new Error('Not authorized to modify this board');
  }

  board.columns.push({ title, tasks: [] });
  const updatedBoard = await board.save();

  res.json(updatedBoard);
});

// @desc    Delete column from board
// @route   DELETE /api/boards/:id/columns/:columnId
// @access  Private
const deleteColumn = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  // Check ownership or editor rights
  const member = board.members.find(m => m.user.equals(req.user._id));
  if (!board.owner.equals(req.user._id) && (!member || member.role !== 'editor')) {
    res.status(403);
    throw new Error('Not authorized to modify this board');
  }

  board.columns = board.columns.filter(
    column => column._id.toString() !== req.params.columnId
  );
  
  const updatedBoard = await board.save();
  res.json(updatedBoard);
});

// @desc    Add task to column
// @route   POST /api/boards/:id/columns/:columnId/tasks
// @access  Private
const addTask = asyncHandler(async (req, res) => {
  const { title, description, deadline, tags } = req.body;
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  // Check ownership or editor rights
  const member = board.members.find(m => m.user.equals(req.user._id));
  if (!board.owner.equals(req.user._id) && (!member || member.role !== 'editor')) {
    res.status(403);
    throw new Error('Not authorized to modify this board');
  }

  const column = board.columns.id(req.params.columnId);
  if (!column) {
    res.status(404);
    throw new Error('Column not found');
  }

  column.tasks.push({
    title,
    description,
    deadline,
    tags,
    assignedTo: req.body.assignedTo,
  });

  const updatedBoard = await board.save();
  res.json(updatedBoard);
});

// @desc    Delete task from column
// @route   DELETE /api/boards/:id/columns/:columnId/tasks/:taskId
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  // Check ownership or editor rights
  const member = board.members.find(m => m.user.equals(req.user._id));
  if (!board.owner.equals(req.user._id) && (!member || member.role !== 'editor')) {
    res.status(403);
    throw new Error('Not authorized to modify this board');
  }

  const column = board.columns.id(req.params.columnId);
  if (!column) {
    res.status(404);
    throw new Error('Column not found');
  }

  column.tasks = column.tasks.filter(
    task => task._id.toString() !== req.params.taskId
  );

  const updatedBoard = await board.save();
  res.json(updatedBoard);
});

// @desc    Move task between columns
// @route   PUT /api/boards/:id/tasks/:taskId/move
// @access  Private
const moveTask = asyncHandler(async (req, res) => {
  const { fromColumnId, toColumnId } = req.body;
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  // Check ownership or editor rights
  const member = board.members.find(m => m.user.equals(req.user._id));
  if (!board.owner.equals(req.user._id) && (!member || member.role !== 'editor')) {
    res.status(403);
    throw new Error('Not authorized to modify this board');
  }

  const fromColumn = board.columns.id(fromColumnId);
  const toColumn = board.columns.id(toColumnId);

  if (!fromColumn || !toColumn) {
    res.status(404);
    throw new Error('Column not found');
  }

  const taskIndex = fromColumn.tasks.findIndex(
    task => task._id.toString() === req.params.taskId
  );

  if (taskIndex === -1) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Remove task from source column and add to target column
  const [task] = fromColumn.tasks.splice(taskIndex, 1);
  toColumn.tasks.push(task);

  const updatedBoard = await board.save();
  res.json(updatedBoard);
});

module.exports = {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  addColumn,
  deleteColumn,
  addTask,
  deleteTask,
  moveTask,
};