const { authCheck } = require("../helpers/auth");
const User = require("../models/user");
const Post = require("../models/post");

// queries
const allPosts = async (parent, args, { req }) => {
  return await Post.find({})
    .populate("postedBy", "username _id")
    .sort({ createdAt: -1 })
    .exec();
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

const singlePost = async (parent, args, { req }) => {
  return await Post.findById({ _id: args.postId })
    .populate("postedBy", "_id username")
    .exec();
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

const postUpdate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  // validation
  if (args.input.content.trim() === "") throw new Error("Content is required");
  // get current user from db
  const currentUserFromDB = await User.findOne({
    email: currentUser.email,
  }).exec();
  // id of post to update
  const postToUpdate = await Post.findById({ _id: args.input._id }).exec();
  if (currentUserFromDB._id.toString() !== postToUpdate.postedBy._id.toString())
    throw new Error("not authorized");
  const updatedPost = await Post.findByIdAndUpdate(
    args.input._id,
    { ...args.input },
    { new: true }
  ).exec();
  return updatedPost;
};

const postDelete = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  const currentUserFromDB = await User.findOne({
    email: currentUser.email,
  }).exec();
  const postToDelete = await Post.findById({ _id: args.postId }).exec();
  if (currentUserFromDB._id.toString() !== postToDelete.postedBy._id.toString())
    throw new Error("not authorized");
  const deletedPost = await Post.findByIdAndDelete({ _id: args.postId }).exec();
  return deletedPost;
};

module.exports = {
  Query: { allPosts, postByUser, singlePost },
  Mutation: {
    postCreate,
    postUpdate,
    postDelete,
  },
};
