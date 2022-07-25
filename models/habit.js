const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const habitSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    habitName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    duration: {
      type: Number,
      required: true,
    },
    checkIn: [],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("HabitModel", habitSchema);
