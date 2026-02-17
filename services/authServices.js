const User = require("../entities/authModel");
const userRepository = require("../repo/authRepository");

exports.addUser = (name, password, callback) => {
  userRepository.insertUser(name, password, callback);
};