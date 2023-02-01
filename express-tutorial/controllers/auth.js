const login = (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  if (name) {
    return res.status(200).json({ message: `Welcome ${name}` });
  }
  res.status(401).json({ message: "Please provide credentials" });
};

module.exports = { login };
