const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/boardController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getBoards)
  .post(protect, createBoard);

router.route('/:id')
  .get(protect, getBoard)
  .put(protect, updateBoard)
  .delete(protect, deleteBoard);

router.route('/:id/columns')
  .post(protect, addColumn);

router.route('/:id/columns/:columnId')
  .delete(protect, deleteColumn);

router.route('/:id/columns/:columnId/tasks')
  .post(protect, addTask);

router.route('/:id/columns/:columnId/tasks/:taskId')
  .delete(protect, deleteTask);

router.route('/:id/tasks/:taskId/move')
  .put(protect, moveTask);

module.exports = router;