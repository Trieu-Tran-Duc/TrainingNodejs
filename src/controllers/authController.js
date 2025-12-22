const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { users, response, tokenUtils } = require("../utils");

/*
  summary: Login user and generate tokens
*/
const login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return response.unauthorized(res, 401, "Invalid credentials");
  }

  const accessToken = tokenUtils.generateAccessToken(user);
  const refreshToken = tokenUtils.generateRefreshToken(user);

  user.refreshToken = refreshToken;

  response.success(res, { accessToken, refreshToken });
};

/*
  summary: Refresh access token using refresh token
*/
const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return response.unauthorized(res, 401, "Refresh token required");
  }

  const user = users.find(u => u.refreshToken === refreshToken);
  if (!user) {
    return response.unauthorized(res, 403, "Invalid refresh token");
  }

  try {

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = tokenUtils.generateAccessToken(user);
    const newRefreshToken = tokenUtils.generateRefreshToken(user);

    user.refreshToken = newRefreshToken;

    return response.success(res, { accessToken: newAccessToken });

  } catch (err) {
    return response.unauthorized(res, 403, "Refresh token expired");
  }

};

const adminOnly = (req, res) => {
  response.success(res, { message: "Admin access granted" });
};

const userOnly = (req, res) => {
  response.success(res, { message: "User access granted" });
};

module.exports = {
  login,
  refreshToken,
  adminOnly,
  userOnly
};
