const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  app.get('/test/all', controller.allAccess);
  app.get('/test/user', [authJwt.verifyToken], controller.userBoard);
  app.get('/test/moderator', [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);
  app.get('/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
  app.get('/admin/users', [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUsers);
  app.get('/admin/moderators', [authJwt.verifyToken, authJwt.isAdmin], controller.getAllModerators);
  app.put('/user/edit/:id', [authJwt.verifyToken], controller.editUserProfile);
};
