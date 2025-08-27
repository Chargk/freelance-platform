const express = require('express');
const router = express.Router();
const {
  getInvitations,
  createInvitation,
  acceptInvitation,
  rejectInvitation,
} = require('../controllers/invitationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getInvitations)
  .post(protect, createInvitation);

router.put('/:id/accept', protect, acceptInvitation);
router.put('/:id/reject', protect, rejectInvitation);

module.exports = router;