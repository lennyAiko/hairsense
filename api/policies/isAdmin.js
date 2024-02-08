module.exports = (req, res, proceed) => {
  if (!req.user.is_admin) {
    return res.status(401).json("Unauthorized");
  }
  proceed();
};
