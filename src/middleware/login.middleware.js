const bcrypt = require('bcrypt');
const { loginUser } = require('../services/user.services');

const loginMiddleware = async (req, res, next) => {
	const { email, password } = req.body;

	const resultUser = await loginUser(email);
	if (!resultUser)
		return res.status(401).json({ message: 'Invalid credentials' });

	const isValid = await bcrypt.compare(password, resultUser.password);
	if (!isValid) return res.status(404).json({ message: 'Invalid credentials' });

	req.userLogin = resultUser;

	next();
};

module.exports = { loginMiddleware };
