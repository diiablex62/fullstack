const jwt = require("jsonwebtoken");
const User = require("../models/user.schema");

const authentification = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ messsage: "Accès interdit" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decoded.sub);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }
};

module.exports = { authentification };
