import { useState } from "react";
import * as habitsAPI from "../../utilities/habits-api";
import "./HabitsForm.css";

export default function HabitsForm({ addNewHabit }) {
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
      await habitsAPI.createHabit({ ...newHabit });
      addNewHabit(newHabit);
      setNewHabit({});
    } catch {
      setError("Invalid Habit - Try Again");
    }
  }

  return (
    <div>
      <h3>create a habit</h3>
      <form className="create-habit" onSubmit={handleSubmit}>
        <label>Habit Name:</label>
        <input
          type="text"
          onChange={handleChange}
          value={newHabit.habitName}
          name="habitName"
          required
        />

        <label>Start Date</label>
        <input
          type="date"
          onChange={handleChange}
          value={newHabit.startDate}
          name="startDate"
          required
        />

        <label>End Date</label>
        <input
          type="date"
          onChange={handleChange}
          value={newHabit.endDate}
          name="endDate"
        />

        <label>Duration(hours)</label>
        <input
          type="number"
          onChange={handleChange}
          value={newHabit.duration}
          name="duration"
          required
        />
        <button>Add Habit</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
