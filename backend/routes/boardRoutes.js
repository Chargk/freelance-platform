const express = require('express');
const router = express.Router();
const {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  addColumn,
  addTask,
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

router.post('/:id/columns', protect, addColumn);
router.post('/:id/columns/:columnId/tasks', protect, addTask);
router.put('/:id/tasks/:taskId/move', protect, moveTask);

module.exports = router;