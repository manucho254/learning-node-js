// express middleware

const express = require("express");
const app = express();
const morgan = require("morgan");

let { people } = require("./data");

app.use(morgan("tiny"));

// static assets

app.use(express.static("./express-tutorial/methods-public"));

// pass POST and PUT data

// parse url encoded data

app.use(express.urlencoded({ extended: false }));

// parse json data

app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  console.log(req.body);
  const { name } = req.body;

  if (name) {
    let peopleLength = people.length;
    people.push({ id: peopleLength + 1, name: name });
    return res
      .status(201)
      .json({ success: true, msg: "successfully added person", person: name });
  }
  res.status(400).json({ success: false, msg: "please provide name value." });
});

app.post("/api/people/postman", (req, res) => {
  console.log(req.body);
  const { name } = req.body;

  if (name) {
    return res.status(201).json({
      success: true,
      msg: "successfully added person",
      data: [...people, { id: people.length + 1, name: name }],
    });
  }
  res.status(400).json({ success: false, msg: "please provide name value." });
});

app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((p) => p.id === Number(id));

  if (!person) {
    return res.status(404).json({ message: "person not found" });
  }

  person.name = name;
  people = [...people, person];
  res.status(200).json({
    success: true,
    data: person,
  });
});

app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const person = people.find((p) => p.id === Number(id));

  if (!person) {
    return res.status(404).json({ message: "person not found" });
  }

  let newPeople = people.filter((p) => p.id !== Number(id));
  res.status(200).json({
    success: true,
    data: newPeople,
  });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please provide credentials");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
