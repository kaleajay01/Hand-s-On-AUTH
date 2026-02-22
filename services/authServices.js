const userRepository = require("../repo/authRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.addUser = (name, password, callback) => {
  // Hash password before saving
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      userRepository.insertUser(name, hashedPassword, callback);
    })
    .catch((err) => callback(err));
};

exports.loginUser = (name, password, callback) => {
  userRepository.findUserByName(name, (err, user) => {
    if (err) return callback(err);
    if (!user) {
      return callback(null, {
        success: false,
        message: "Invalid credentials",
      });
    }

    bcrypt
      .compare(password, user.password)
      .then((isMatch) => {
        if (!isMatch) {
          return callback(null, {
            success: false,
            message: "Invalid credentials",
          });
        }
        callback(null, {
          success: true,
          userId: user.id,
          name: user.name,
        });
      })
      .catch((err) => callback(err));
  });
};