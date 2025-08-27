const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a task title'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    deadline: {
      type: Date,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    assignedTo: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const columnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a column title'],
      trim: true,
    },
    tasks: [taskSchema],
  },
  {
    timestamps: true,
  }
);

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a board title'],
      trim: true,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [{
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        enum: ['viewer', 'editor', 'admin'],
        default: 'viewer',
      },
    }],
    columns: [columnSchema],
  },
  {
    timestamps: true,
  }
);

// Populate owner and members when finding boards
boardSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'owner',
    select: 'name email',
  }).populate({
    path: 'members.user',
    select: 'name email',
  });
  next();
});

module.exports = mongoose.model('Board', boardSchema);