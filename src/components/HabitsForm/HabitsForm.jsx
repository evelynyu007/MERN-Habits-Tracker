import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as habitsAPI from "../../utilities/habits-api";
import "./HabitsForm.css";

export default function HabitsForm({
  trigger,
  setTrigger,
  addNewHabit,
  todayYMD,
}) {
  const [newHabit, setNewHabit] = useState({});
  const [error, setError] = useState("");
  function handleChange(event) {
    setNewHabit({
      ...newHabit,
      [event.target.name]: event.target.value,
    });
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const theNewHabit = await habitsAPI.createHabit({ ...newHabit });
      addNewHabit(theNewHabit); // need habits Page to re-render

      console.log("add new habit");
      setNewHabit({ title: "", startDate: "", endDate: "", duration: 0 });
      setTrigger(false);
    } catch {
      setError("Invalid Habit - Try Again");
    }
  }

  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <h3>Create a new habit</h3>
        <button
          className="close-btn"
          onClick={() => {
            setTrigger(false);
          }}
        >
          close
        </button>

        <form className="create-habit" onSubmit={handleSubmit}>
          <label>
            Habit Name:
            <input
              type="text"
              onChange={handleChange}
              value={newHabit.title}
              name="title"
              required
            />
          </label>

          <label>
            Start Date:
            <input
              type="date"
              onChange={handleChange}
              value={newHabit.startDate}
              name="startDate"
              min={todayYMD}
              required
            />
          </label>

          <label>
            End Date:
            <input
              type="date"
              onChange={handleChange}
              value={newHabit.endDate}
              name="endDate"
              min={newHabit.startDate}
            />
          </label>

          <label>
            Duration(hours/per day):
            <input
              type="number"
              onChange={handleChange}
              value={newHabit.duration}
              name="duration"
              min="0"
              required
            />
          </label>
          <button>Add Habit</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}
