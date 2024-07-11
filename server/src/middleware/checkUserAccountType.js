const UserModel = require('../model/User.model');

const checkUserAccountType = (requiredAccountType) => {
  return async (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    console.log("Account type : ", user);
    const newUser = await UserModel.findOne({ _id: user.userId });
    console.log("user:", newUser);

    if (!newUser) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!requiredAccountType.includes(newUser.account_type)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient privileges." });
    }
    req.user = newUser;
    next();
  };
};

module.exports = checkUserAccountType;
