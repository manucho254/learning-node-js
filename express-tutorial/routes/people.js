const express = require("express");
const router = express.Router();

const {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson,
  postman,
} = require("../controllers/people");

// not chaining urls
// router.get("/", getPeople);
// router.post("/", createPerson);
// router.put("/:id", updatePerson);
// router.delete("/:id", deletePerson);
// router.post("/postman", postman);

// chaining routes

router.route("/").get(getPeople).post(createPerson);
router.route("/:id").put(updatePerson).delete(deletePerson);
router.route("/postman").post(postman);

module.exports = router;
