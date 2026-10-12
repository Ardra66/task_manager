const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/", protect, getTasks);

router.post("/", protect, (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({
      message: "Only users can create tasks",
    });
  }

  next();
}, createTask);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

module.exports = router;
