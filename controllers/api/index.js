const nameRoutes = require("./name-routes");
const router = require("express").Router();

router.use("/name", nameRoutes);

module.exports = router;
