const authorize = (role_array) => {
  return (req, res, next) => {
    const userRole = req.body.userrole;
    if (role_array.includes(userRole)) {
      next();
    } else {
      res.send("Not Authorized");
    }
  };
};

module.exports = {
  authorize,
};
