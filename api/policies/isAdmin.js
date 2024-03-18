module.exports = (req, res, proceed) => {
  if (req.user.role !== "superadmin") {
    return proceed();
  }
  if (req.user.role !== "admin") {
    return proceed();
  }
  if (!req.user.status) {
    return res.status(401).json("User is disabled");
  }
  return res.status(401).json("Unauthorized");
};
