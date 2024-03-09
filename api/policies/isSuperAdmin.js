module.exports = (req, res, proceed) => {
  if (req.user.role !== "superadmin") {
    return res.status(401).json("Unauthorized");
  }
  proceed();
};
