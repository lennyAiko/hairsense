module.exports = (req, res, proceed) => {
  if (!req.user.role !== "admin") {
    return res.status(401).json("Unauthorized");
  }
  proceed();
};
