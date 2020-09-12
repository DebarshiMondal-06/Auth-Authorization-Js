const User = require('../AuthModel/User_models');
const AppError = require('../Error/appError');


exports.get_all_users = async (req, res) => {
	try {
		const getAllUser = await User.find();

		res.status(200).json({
			status: 'success',
			size: getAllUser.length,
			result: getAllUser
		});
	} catch (error) {
		return next(new AppError(`${error}`, 404));
	}
}

