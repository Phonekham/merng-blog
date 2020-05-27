const { authCheck } = require("../helpers/auth");
const User = require("../models/user");
const Post = require("../models/post");

// queries
const allPosts = async (parent, args, { req }) => {
  return await Post.find({}).populate("postedBy", "username _id").exec();
};
const postByUser = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  const currentUserFromDB = await User.findOne({
    email: currentUser.email,
  }).exec();
  return await Post.find({ postedBy: currentUserFromDB })
    .populate("postedBy", "_id username")
    .sort({ createdAt: -1 });
};

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
  Query: { allPosts, postByUser },
  Mutation: {
    postCreate,
  },
};
