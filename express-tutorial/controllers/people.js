// @desc people controllers

let { people } = require("../../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
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
};

const updatePerson = (req, res) => {
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
};

const deletePerson = (req, res) => {
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
};

const postman = (req, res) => {
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
};

module.exports = {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson,
  postman,
};
