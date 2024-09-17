const express = require("express");
const router = express.Router();
const orderRoutes = require("./orders");
const userRoutes = require("./users");

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `${req.method} - Request made` });
});

router.use("/orders", orderRoutes);
router.use("/users", userRoutes);

module.exports = router;
