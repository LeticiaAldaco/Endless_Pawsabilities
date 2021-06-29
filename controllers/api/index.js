
const router = require('express').Router();
router.use("/name", nameRoutes);

const nameRoutes = require("./name-routes");

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
