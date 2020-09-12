const express = require('express');
const authController = require('./AuthController/authController');
const userController = require('./AuthController/UserController');

const Auth = express.Router();

Auth.post('/signup', authController.signup);
Auth.post('/login', authController.login);

Auth.get('/', authController.protect, authController.restrict('admin'), userController.get_all_users);

module.exports = Auth;