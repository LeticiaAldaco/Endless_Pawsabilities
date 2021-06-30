const Pet = require("../../models/Pet");

const router = require("express").Router();

router.get("/:gender", (req, res) => {
  const petNames = Pet.findAll({
    where: {
      gender: req.params.gender,
    },
  });
  res.json(petNames);
});

module.exports = router;
