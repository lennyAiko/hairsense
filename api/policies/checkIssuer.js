require('dotenv').config();

module.exports = async (req, res, proceed) => {
  const issuer = process.env.TOKEN_ISSUER;
  if (req.issuer !== issuer) {
    return res.status(401).json('Send a valid token');
  }
  proceed();
};
