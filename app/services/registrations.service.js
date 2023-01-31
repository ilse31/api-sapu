const { User } = require("../../models");

const FindUserEmail = async (email) => {
  return await User.findOne({
    where: {
      email: email,
    },
  });
};

const CreateUser = async ({
  fullName,
  roleId,
  phoneNumber,
  password,
  email,
}) => {
  return await User.create({
    fullName,
    roleId,
    phoneNumber,
    password,
    email,
  });
};

module.exports = {
  FindUserEmail,
  CreateUser,
};
