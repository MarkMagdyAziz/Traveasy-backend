let db = require('../models');
let UsersDB = db.user;
let bcrypt = require('bcryptjs');

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};

// api user , moderator  - edit profile - get user, moderator

exports.getAllUsers = async (req, res) => {
  try {
    const usersList = await UsersDB.find({}).populate('roles').exec();
    res.send(usersList);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

exports.editUserProfile = async (req, res) => {
  let { username, email, password, firstName, lastName, country, birthday } = req.body;
  console.log(req.body);
  const _id = req.params.id;
  let userObj = {
    username: username,
    email: email,
    password: password ? bcrypt.hashSync(password, 8) : undefined,
    firstName: firstName,
    lastName: lastName,
    country: country,
    birthday: birthday,
  };
  try {
    const updatedUser = await UsersDB.findByIdAndUpdate(_id, userObj).populate('roles').exec();

    res.send(updatedUser);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
