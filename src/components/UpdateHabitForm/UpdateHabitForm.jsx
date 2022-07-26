import "./UpdateHabitForm.css";
import CloseButton from "react-bootstrap/CloseButton";
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
        <CloseButton
          className="close-btn"
          onClick={() => props.setTrigger(false)}
        />

        <h3>Edit Routine - {props.habit.title} </h3>

        <form className="habit-form" onSubmit={handleSubmit}>
          <label>Routine Name:</label>
          <input
            type="text"
            onChange={handleChange}
            value={updateHabit.title}
            name="title"
            required
          />

          <label>Start Date: </label>
          <input
            type="date"
            onChange={handleChange}
            // change date format to yyyy-mm-dd to show up in chrome
            value={moment.utc(updateHabit.startDate).format("YYYY-MM-DD")}
            name="startDate"
            // not earlier than original start date, hmmm..
            min={moment.utc(props.habit.startDate)}
            required
          />

          <label>End Date: </label>
          <input
            type="date"
            onChange={handleChange}
            value={moment.utc(updateHabit.endDate).format("YYYY-MM-DD")}
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
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}
