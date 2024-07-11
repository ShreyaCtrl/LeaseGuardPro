const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log('Authenticating the user : ', token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
        return res
            .status(403)
            .json({ message: "Invalid token or token expired", error: err.message });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
