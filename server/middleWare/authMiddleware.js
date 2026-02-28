const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

/**
 * Authentication middleware.
 * Accepts token from (in order): route param `tk`, cookie `artikonToken`, or `Authorization` header.
 */
const userAuth = asyncHandler(async (req, res, next) => {
  try {
    // Try route param first (keeps backward compatibility)
    let token = req.params && req.params.tk ? req.params.tk : null;

    // Then cookie
    if (!token && req.cookies && req.cookies.artikonToken) {
      token = req.cookies.artikonToken;
    }

    // Then Authorization header (Bearer)
    if (!token && req.headers && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") token = parts[1];
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Get user id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});

module.exports = userAuth;
