const express = require("express");
const logger = require("./app/helpers/logger");
const userRouter = require("./app/routes/routes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
