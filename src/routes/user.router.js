const {
	getAll,
	create,
	getOne,
	remove,
	update,
	logged,
	login,
} = require('../controllers/user.controllers');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');
const {
	passwordMiddlewares,
} = require('../middleware/hashPassword.middleware');
const { loginMiddleware } = require('../middleware/login.middleware');

const routerUser = express.Router();

routerUser.route('/').get(verifyJWT, getAll).post(passwordMiddlewares, create);

routerUser.route('/login').post(loginMiddleware, login);

routerUser.route('/me').get(verifyJWT, logged);

routerUser
	.route('/:id')
	.get(verifyJWT, getOne)
	.delete(verifyJWT, remove)
	.put(verifyJWT, update);

module.exports = routerUser;
