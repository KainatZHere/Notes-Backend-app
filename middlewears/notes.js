const jwt = require("jsonwebtoken");

const restrictToVerifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json("Access Denied ,no token Provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const user = await jwt.verify(token, process.env.secretKey);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Invalid or Expired Token" });
  }
};


module.exports ={restrictToVerifyToken}