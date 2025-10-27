const jwt = require("jsonwebtoken");

exports.generateToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET);
  return token;
};

