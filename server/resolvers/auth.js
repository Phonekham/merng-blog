const { gql } = require("apollo-server-express");

const { authCheck } = require("../helpers/auth");

const me = async (parent, args, { req, res }) => {
  await authCheck(req, res);
  return "phone";
};

module.exports = {
  Query: {
    me,
  },
};
