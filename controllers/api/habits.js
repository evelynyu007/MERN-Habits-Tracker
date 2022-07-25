const HabitModel = require("../../models/habit");
const mongoose = require("mongoose");

module.exports = {
  createHabit,
  getHabits,
  getOneHabit,
  deleteHabit,
  updateHabit,
};
/*========================================
        get all the habits
========================================*/

async function getHabits(req, res) {
  const habits = await HabitModel.find({});
  res.status(200).json(habits);
}

/*========================================
        get one habit
========================================*/
async function getOneHabit(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such habit" });
  }

  const habit = await HabitModel.findById(id);
  if (!habit) {
    return res.status(404).json({ error: "No such habit" });
  }
  res.status(200).json(habit);
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
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such habit" });
  }
  const habit = await HabitModel.findByIdAndDelete({ _id: id });
  if (!habit) {
    return res.status(404).json({ error: "No such habit" });
  }
  res.status(200).json(habit);
}

/*========================================
        Update a habit
========================================*/
async function updateHabit(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such habit" });
  }
  const habit = await HabitModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!habit) {
    return res.status(404).json({ error: "No such habit" });
  }
  res.status(200).json(habit);
}
