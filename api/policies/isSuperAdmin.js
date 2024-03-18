module.exports = (req, res, proceed) => {
  if (req.user.role === "superadmin") {
    return proceed();
  }
  return res.status(401).json("Unauthorized");
};
