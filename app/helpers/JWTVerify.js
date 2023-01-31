const jwt = require("jsonwebtoken");

const verifyJwtRefresh = (token) => {
  return jwt.verify(token, process.env.SECRET_REFRESH_TOKEN);
};
const verifyJwtAccess = (token) => {
  return jwt.verify(token, process.env.SECRET_ACCES_TOKEN);
};

const jwtSignAccess = (payload) => {
  return jwt.sign(payload, process.env.SECRET_ACCES_TOKEN, {
    expiresIn: "30s",
  });
};
const jwtSignRefresh = (payload) => {
  return jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {
    expiresIn: "40s",
  });
};

module.exports = {
  verifyJwtRefresh,
  jwtSignAccess,
  verifyJwtAccess,
  jwtSignRefresh,
};
