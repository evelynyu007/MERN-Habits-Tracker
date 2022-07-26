const express = require("express");
const router = express.Router();
const habitsCtrl = require("../../controllers/api/habits");

// get all the user's habits
// GET /api/habits
router.get("/user/:userId", habitsCtrl.getHabits);

// get a habit
// router.get("/:id", habitsCtrl.getOneHabit);

// create a habit
// POST /api/habits
router.post("/", habitsCtrl.createHabit);

// delete a habit
router.delete("/:id", habitsCtrl.deleteHabit);

// update a habit
router.put("/:id", habitsCtrl.updateHabit);

module.exports = router;
