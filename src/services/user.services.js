const { user } = require('../models');

const getAllUsersServices = async () => {
	return user.findAll();
};

const createUserService = async (body) => {
	return await user.create(body);
};

const getOneUserService = async (id) => {
	return await user.findByPk(id);
};

const updateUserService = async (id, body) => {
	return await user.update(body, { where: { id }, returning: true });
};

const deleteUserService = async (id) => {
	return await user.destroy({ where: { id } });
};

const loginUser = async (email) => {
	return await user.findOne({ where: { email } });
};

module.exports = {
	getAllUsersServices,
	createUserService,
	getOneUserService,
	updateUserService,
	deleteUserService,
	loginUser,
};
