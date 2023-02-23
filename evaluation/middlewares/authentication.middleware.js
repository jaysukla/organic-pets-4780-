const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, "sitansu");
      if (decoded) {
        const role = decoded.role;
        req.body.userrole = role;
        next();
      } else {
        res.send("Please Login first");
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } else {
    res.send(`Please Login`);
  }
};

module.exports = {
  authenticate,
};
