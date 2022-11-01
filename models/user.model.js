const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username name is required!!'],
    trim: true,
    unique: true,
    minLength: 3,
    maxLength: 25,
  },
  email: {
    type: String,
    required: [true, 'email name is required!!'],
    unique: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: [true, 'password name is required!!'],
    minLength: 6,
  //  maxLength: 20,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
