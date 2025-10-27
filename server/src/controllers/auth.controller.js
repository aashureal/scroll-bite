const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../services/jwt.service");

exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
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
    const token = generateToken({ id: newUser._id });

    res.cookie("token", token);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
      },
    });
  } catch (error) {
    console.log("Internal Server Error: ", error.message);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check User
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not exist" });

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // Sign a token
    const token = generateToken({ id: user._id });
    res.cookie("token", token);

    res.status(200).json({
      message: "User loggedin sucessfully.",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.log("Internal Server Error: ", error.message);
  }
};
