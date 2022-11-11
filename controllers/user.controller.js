let db = require('../models');
let UsersDB = db.user;
let RolesDB = db.role;

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

// Filter users & search user
exports.FilterUsers = async (req, res) => {
  let query = {};
  // get page
  const page = req.query.page ? req.query.page - 1 : 0;
  if (req.query.email) {
    query.email = req.query.email;
  }
  if (req.query.firstName) {
    query.firstName = req.query.firstName;
  }
  if (req.query.lastName) {
    query.lastName = req.query.lastName;
  }
  if (req.query.birthday) {
    query.birthday = req.query.birthday;
  }
  if (req.query.username) {
    query.username = req.query.username;
  }
  if (req.query.role) {
    query.role = req.query.role;
  }
  try {
    // Check Search for Role Ref
    if (req.query.role) {
      const usersByRole = await RolesDB.find({
        role: { $regex: new RegExp(req.query.role, 'i') },
      });
      res.status(200).send(usersByRole);
    }

    const users = await UsersDB.find(query).skip(page).limit(5).populate('roles').exec();
    res.status(200).send(users);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const usersList = await UsersDB.find({}).populate('roles').exec();
    res.status(200).send(usersList);
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

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
