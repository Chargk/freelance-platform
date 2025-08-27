const Invitation = require('../models/Invitation');
const Board = require('../models/Board');
const asyncHandler = require('express-async-handler');

// @desc    Get all invitations for user
// @route   GET /api/invitations
// @access  Private
const getInvitations = asyncHandler(async (req, res) => {
  const invitations = await Invitation.find({ to: req.user._id, status: 'pending' });
  res.json(invitations);
});

// @desc    Create new invitation
// @route   POST /api/invitations
// @access  Private
const createInvitation = asyncHandler(async (req, res) => {
  const { boardId, userId, role } = req.body;

  // Check if board exists and user has rights to invite
  const board = await Board.findById(boardId);
  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  // Check if user is board owner or admin
  const member = board.members.find(m => m.user.equals(req.user._id));
  if (!board.owner.equals(req.user._id) && (!member || member.role !== 'admin')) {
    res.status(403);
    throw new Error('Not authorized to invite users to this board');
  }

  // Check if invitation already exists
  const existingInvitation = await Invitation.findOne({
    board: boardId,
    to: userId,
    status: 'pending',
  });

  if (existingInvitation) {
    res.status(400);
    throw new Error('Invitation already sent');
  }

  // Create invitation
  const invitation = await Invitation.create({
    board: boardId,
    from: req.user._id,
    to: userId,
    role,
  });

  res.status(201).json(invitation);
});

// @desc    Accept invitation
// @route   PUT /api/invitations/:id/accept
// @access  Private
const acceptInvitation = asyncHandler(async (req, res) => {
  const invitation = await Invitation.findById(req.params.id);

  if (!invitation) {
    res.status(404);
    throw new Error('Invitation not found');
  }

  // Check if invitation belongs to user
  if (!invitation.to.equals(req.user._id)) {
    res.status(403);
    throw new Error('Not authorized');
  }

  // Check if invitation is still pending
  if (invitation.status !== 'pending') {
    res.status(400);
    throw new Error('Invitation already processed');
  }

  // Add user to board members
  const board = await Board.findById(invitation.board);
  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  board.members.push({
    user: req.user._id,
    role: invitation.role,
  });
  await board.save();

  // Update invitation status
  invitation.status = 'accepted';
  await invitation.save();

  res.json(invitation);
});

// @desc    Reject invitation
// @route   PUT /api/invitations/:id/reject
// @access  Private
const rejectInvitation = asyncHandler(async (req, res) => {
  const invitation = await Invitation.findById(req.params.id);

  if (!invitation) {
    res.status(404);
    throw new Error('Invitation not found');
  }

  // Check if invitation belongs to user
  if (!invitation.to.equals(req.user._id)) {
    res.status(403);
    throw new Error('Not authorized');
  }

  // Check if invitation is still pending
  if (invitation.status !== 'pending') {
    res.status(400);
    throw new Error('Invitation already processed');
  }

  // Update invitation status
  invitation.status = 'rejected';
  await invitation.save();

  res.json(invitation);
});

module.exports = {
  getInvitations,
  createInvitation,
  acceptInvitation,
  rejectInvitation,
};