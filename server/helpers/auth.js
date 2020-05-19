let authorized = true;

exports.authCheck = (req, res, next) => {
  if (authorized) {
    next();
  } else {
    throw new Error("unauthorized");
  }
};
