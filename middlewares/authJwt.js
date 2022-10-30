const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const { role } = require('../models');
const db = require('../models');
const User = db.user;
const Role = db.role;

// check if token is provided, legal or not
verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

// check if roles of the user contain required role or not

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find({ _id: { $in: user.roles } }, (err, roles) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      for (role of roles) {
        if (role.name === 'admin') {
          next();
          return;
        }
      }
      res.status(403).send({ message: 'Require Admin Role!' });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find({ _id: { $in: user.roles } }, (err, roles) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      for (role of roles) {
        if (role === 'moderator') {
          next();
          return;
        }
      }
      res.status(403).send({ message: 'Require Moderator Role!' });
      return;
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
module.exports = authJwt;
