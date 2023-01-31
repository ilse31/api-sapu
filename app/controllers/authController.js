const bcrypt = require("bcrypt");
const token = require("../middleware/token");
const registrationService = require("../services/registrations.service");
const helpers = require("../helpers/JWTVerify");
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).send("All input is required");
  }
  try {
    const user = await registrationService.FindUserEmail(email);
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      const { accessToken, refreshToken } = await token.generateTokens(user);
      const role = await user.getRole();
      const userToken = {
        id: user.id,
        fullName: user.fullName,
        role: role.roles,
        accesToken: accessToken,
        refreshToken: refreshToken,
      };
      return res.status(200).json({
        status: 200,
        success: true,
        data: userToken,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "User Not Found",
    });
  }
};

const getMe = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const emailUser = helpers.verifyJwtAccess(token);
  const user = await registrationService.FindUserEmail(emailUser.email);
  const role = await user.getRole();
  const userToken = {
    user: user,
    role: role.roles,
  };
  return res.status(200).json(userToken);
};

const getRefresh = async (req, res) => {
  try {
    const { refreshTokens } = req.body;
    const decoded = helpers.verifyJwtRefresh(refreshTokens);
    const user = await registrationService.FindUserEmail(decoded.email);
    const { accessToken, refreshToken } = await token.generateTokens(user);
    return res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error });
  }
};

const create = async (req, res) => {
  const { fullName, roleId, phoneNumber, email, password } = req.body;
  const hashpass = await bcrypt.hash(password, 10);
  try {
    if (!(fullName, roleId, phoneNumber && email && password)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await registrationService.FindUserEmail(email);
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const user = await registrationService.CreateUser({
      fullName,
      roleId,
      phoneNumber,
      password: hashpass,
      email,
    });
    const role = await user.getRole();
    const data = {
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: role.roles,
    };
    return res.json({
      message: "User created successfully",
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  login,
  create,
  getRefresh,
  getMe,
};
