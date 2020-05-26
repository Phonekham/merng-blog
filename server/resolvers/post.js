const { gql } = require("apollo-server-express");
const { posts } = require("../temp");
const { authCheck } = require("../helpers/auth");
const User = require("../models/user");
const Post = require("../models/post");

// queries
const totalPosts = () => posts.length;
// mutation
const postCreate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);

  // validate
  if (args.input.content.trim() === "") throw new Error("content is required");

  const currentUserFromDB = await User.findOne({
    email: currentUser.email,
  });
  let newPost = await new Post({
    ...args.input,
    postedBy: currentUserFromDB._id,
  })
    .save()
    .then((post) => post.populate("postedBy", "_id username").execPopulate());
  return newPost;
};

module.exports = {
  Query: { totalPosts },
  Mutation: {
    postCreate,
  },
};
