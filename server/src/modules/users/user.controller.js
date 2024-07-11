const UserModel = require('../../model/User.model');
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");// Adjust the path to your User model
const bcrypt = require("bcryptjs");

const addUser = async (req, res) => {
    const { username, password, account_type } = req.body;
    console.log("This route does work fine Do not touch (AddUser/SignUp) !!");
    const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await UserModel.create({
      username,
      password: hashedPassword,
      account_type,
    });

    return res
      .status(201)
      .json({ user, message: "User registered successfully" });
  } catch (error) {
    console.log('Error in adding user : ', error);
    if (error.errors.username)
      return res
        .status(400)
        .json({ message: "The Username field is required" });

    if (error.errors.password)
      return res
        .status(400)
        .json({ message: "The Password field is required",  });

    return res
      .status(500)
      .json({ message: "Internal server error", error: `${error}` });
  }
};

const findUser = async (req, res) => {
    const { username, password } = req.body;
    console.log("this route works fine (findUser/login)");

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid Username" });
    }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: "Invalid password" });
      }
      
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ token, user: user });
  } catch (error) {
    console.log('Error in finding user : ', error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};

module.exports = {
  findUser,
  addUser
}