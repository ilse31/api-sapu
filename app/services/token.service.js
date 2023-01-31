const { RefreshToken } = "../../models";

const updateWhereNotNull = async (tokens) => {
  return await userToken.update(
    { token: tokens },
    {
      where: {
        token: !null,
      },
    }
  );
};

const findTokenWhereUserId = async (user) => {
  return await RefreshToken.findOne({
    where: { userId: user.id },
  });
};

const createNewToken = async (user, tokens) => {
  return await RefreshToken.create({ userId: user.id, token: tokens });
};

module.exports = {
  updateWhereNotNull,
  findTokenWhereUserId,
  createNewToken,
};
