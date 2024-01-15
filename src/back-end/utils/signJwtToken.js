const JWT = require("jsonwebtoken");
const signJwtToken = (user) => {

  let payload = {
    sub: user._id,
    name: user.name,
    email: user.email
  };

  const options = {
    expiresIn: "1d",
    audience: "https://vendospace.com",
    issuer: "https://vendospace.com",
  };

  let token = JWT.sign(payload, process.env.JWT_SECRET, options);
  return token;
}

module.exports = signJwtToken;