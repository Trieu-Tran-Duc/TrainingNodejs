const response = require("../helper/response");
const AuthService = require("../services/authService");
/*
  summary: Login user and generate tokens
*/
const login = async (req, res) => {
  const { username, password } = req.body;
  const { accessToken, refreshToken } = await AuthService.login(username, password);
  return response.success(res, { accessToken, refreshToken });
  
};

/*
  summary: Refresh access token using refresh token
*/
const refreshToken = async (req, res) => {
  const { oldRefreshToken } = req.body;
  var { newAccessToken } = await AuthService.refreshToken(oldRefreshToken);
  return response.success(res, { accessToken: newAccessToken });

};

const adminOnly = async (req, res) => {
  return response.success(res, { message: "Admin access granted" });
};

const userOnly = async (req, res) => {
  return response.success(res, { message: "User access granted" });
};

module.exports = {
  login,
  refreshToken,
  adminOnly,
  userOnly
};
