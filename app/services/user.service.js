const { User } = require("../../models");

const GetAllUsers = async () => {
  return await User.findAll({
    where: {
      roleId: 1,
    },
  });
};

const DeleteUser = async (id) => {
  return await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  GetAllUsers,
  DeleteUser,
};
