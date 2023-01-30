// authorize simple middleware

const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "john") {
    req.user = { name: "john", id: 3 };
    next();
  } else {
    console.log("unauthorized");
    res.status(401).send("Unauthorized user");
  }
};

module.exports = authorize;
