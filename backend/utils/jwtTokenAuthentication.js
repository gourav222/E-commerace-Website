const sendToken = (users, statusCode, res) => {
  const token = users.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    users,
    token,
  });
};
module.exports = sendToken;
