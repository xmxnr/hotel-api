const User = require('../models/user');

const getAllUsersServices = async () => {
	return User.findAll();
};

const createUserService = async (body) => {
	return await User.create(body);
};

const getOneUserService = async (id) => {
	return await User.findByPk(id);
};

const updateUserService = async (id, body) => {
	return await User.update(body, { where: { id }, returning: true });
};

const deleteUserService = async (id) => {
	return await User.destoy({ where: { id } });
};

const loginUser = async (email) => {
	return await User.findOne({ where: { email } });
};

module.exports = {
	getAllUsersServices,
	createUserService,
	getOneUserService,
	updateUserService,
	deleteUserService,
	loginUser,
};
