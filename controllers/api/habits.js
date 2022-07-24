const HabitModel = require("../../models/habit");
const mongoose = require("mongoose");

module.exports = {
  createHabit,
  getHabits,
  deleteHabit,
  updateHabit,
};
/*========================================
        get all the habits
========================================*/

async function getHabits(req, res) {
  const habits = await HabitModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(habits);
}

/*========================================
        Create a Habit
========================================*/

async function createHabit(req, res) {
  try {
    const habit = await HabitModel.create({
      ...req.body,
    });
    res.status(200).json(habit);
  } catch (e) {
    res.status(400).json(e);
  }
}

/*========================================
        Delete a habit
========================================*/
async function deleteHabit(req, res) {
  //baby step
  res.json({ mssg: "DELETE a post" });
}

/*========================================
        Update a habit
========================================*/
async function updateHabit(req, res) {
  //baby step
  res.json({ mssg: "UPDATE a post" });
}
