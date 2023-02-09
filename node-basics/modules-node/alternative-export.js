// another way of doing exports in node

module.exports.items = ["item1", "item2"];

module.exports.person = {
  name: "bob",
};
const person2 = {
    name: "manucho",
}

module.exports.singlePerson = person2