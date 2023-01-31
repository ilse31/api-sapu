const { RefreshToken } = require("../../models");
const helpers = require("../helpers/JWTVerify");

const generateTokens = async (user) => {
  try {
    const payload = { id: user.uuid, email: user.email, roleId: user.roleId };
    const accessToken = helpers.jwtSignAccess(payload);
    const refreshToken = helpers.jwtSignRefresh(payload);
    const userToken = await RefreshToken.findOne({
      where: { userId: user.id },
    });
    if (userToken) {
      await userToken.destroy({ force: true });
    }
    await RefreshToken.create({ userId: user.id, token: refreshToken });
    return {
      accessToken,
      refreshToken,
    };
  } catch (err) {
    return err;
  }
};

module.exports = { generateTokens };
