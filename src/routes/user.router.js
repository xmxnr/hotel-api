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
const loginMiddleware = require('../middleware/login.middleware');
const hashPassword = require('../middleware/hashPassword.middleware');

const routerUser = express.Router();

routerUser.route('/').get(verifyJWT, getAll).post(hashPassword, create);

routerUser.route('/login').post(loginMiddleware, login);

routerUser.route('/me').get(verifyJWT, logged);

routerUser
	.route('/:id')
	.get(verifyJWT, getOne)
	.delete(verifyJWT, remove)
	.put(verifyJWT, update);

module.exports = routerUser;
