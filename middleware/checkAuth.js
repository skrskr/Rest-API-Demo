const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      msg: "Auth Failed"
    });
  }
  const token = req.headers.authorization.split("Bearer ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECERT_KEY);
    req.userData = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      msg: "Auth Failed"
    });
  }
};
