const userModel = require("../Model/users");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const handleLoginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    } else if (user && user.password == password) {
      const token = jwt.sign({ userId: user._id }, process.env.secretKey);
      return res
        .status(200)
        .json({
          msg: "Login Successfully",
          token: token,
          result: {
            userId: user._id,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        });
    } else {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
  } catch (error) {
   return res.status(400).json({Error: error})
  }
};

const handleRegisterUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already exist" });
    }
    const user = await userModel.create({
      username,
      password,
    });
    if (!user) {
      return res.status(400).json({ msg: "user not created" });
    } else {
      return res
        .status(201)
        .json({ msg: "User Created Successfully",  result: {
            userId: user._id,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          }, });
    }
  } catch (error) {
 return res.status(400).json({Error: error})
  }
};

module.exports = { handleLoginUser, handleRegisterUser };
