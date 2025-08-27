const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.ObjectId,
      ref: 'Board',
      required: true,
    },
    from: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    to: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      enum: ['viewer', 'editor', 'admin'],
      default: 'viewer',
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Populate references when finding invitations
invitationSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'board',
    select: 'title',
  })
    .populate({
      path: 'from',
      select: 'name email',
    })
    .populate({
      path: 'to',
      select: 'name email',
    });
  next();
});

module.exports = mongoose.model('Invitation', invitationSchema);