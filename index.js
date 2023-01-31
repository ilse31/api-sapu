const express = require("express");
const logger = require("./app/helpers/logger");
const userRouter = require("./app/routes/routes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", userRouter);

app.listen({ port: 5000 }, async () => {
  logger.info("DB Connected on Port 5000 localhost:5000");
});
