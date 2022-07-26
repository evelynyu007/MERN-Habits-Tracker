import "./UpdateHabitForm.css";
import * as habitsAPI from "../../utilities/habits-api";
import { useState } from "react";
const moment = require("moment");

export default function UpdateHabitForm(props) {
  const [updateHabit, setUpdateHabit] = useState({
    ...props.habit,
  });
  const [error, setError] = useState("");

  function handleChange(event) {
    setUpdateHabit({
      ...updateHabit,
      [event.target.name]: event.target.value,
    });
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await habitsAPI.updateHabit(props.habit._id, { ...updateHabit });
      const newAllHabits = props.allHabits.map((h) => {
        if (h._id === props.habit._id) {
          return updateHabit;
        }
        return h;
      });
      props.setHabits(newAllHabits);
    } catch {
      setError("Invalid Edit - Try Again");
    }
    props.setTrigger(false);
  }

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          close
        </button>
        <h3>Edit Habit - {props.habit.habitName} </h3>

        <form className="update-habit" onSubmit={handleSubmit}>
          <label>Habit Name:</label>
          <input
            type="text"
            onChange={handleChange}
            value={updateHabit.habitName}
            name="habitName"
            required
          />

          <label>Start Date: </label>
          <input
            type="date"
            onChange={handleChange}
            // change date format to yyyy-mm-dd to show up in chrome
            value={moment(updateHabit.startDate).format("YYYY-MM-DD")}
            name="startDate"
            // not earlier than original start date
            min={props.habit.startDate}
            required
          />

          <label>End Date: </label>
          <input
            type="date"
            onChange={handleChange}
            value={moment(updateHabit.endDate).format("YYYY-MM-DD")}
            min={updateHabit.startDate}
            name="endDate"
          />

          <label>Duration(hours/per day):</label>
          <input
            type="number"
            onChange={handleChange}
            value={updateHabit.duration}
            name="duration"
            min="0"
            required
          />

          <button>Update</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}
