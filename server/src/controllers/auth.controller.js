const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  const isUserAlreadyExist = await User.findOne({ email });

  if (isUserAlreadyExist)
    return res.status(400).json({ message: "User already exist" });

  //   Hash password
  const hashedPassword = await bcrypt.hashSync(password, 10);

  //   Create New User
  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  //   Sign a token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
    },
  });
};
