module.exports = (req, res, proceed) => {
  if (req.user.role !== "admin" || req.user.role !== "superadmin") {
    return res.status(401).json("Unauthorized");
  }
  if (!req.user.status) {
    return res.status(401).json("User is disabled");
  }
  proceed();
};
