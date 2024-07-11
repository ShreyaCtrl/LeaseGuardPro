const connectDb = require("../model/connection");
const cors = require("cors");
const userRouter = require("./users/user.router");
const branchRouter = require('./branch/branch.router');

const initApp = async (app, express) => {
  const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
  };
  connectDb();
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use("/user", userRouter);
  app.use("/branch", branchRouter);
};

module.exports = initApp;
