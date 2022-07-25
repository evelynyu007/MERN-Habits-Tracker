import "./HabitsCard.css";
import { useState } from "react";
import * as habitsAPI from "../../utilities/habits-api";
import UpdateHabitForm from "../UpdateHabitForm/UpdateHabitForm";
const moment = require("moment");

export default function HabitsCard({ habit, allHabits, setHabits, todayYMD }) {
  const startTime = habit && moment(habit.startDate);
  const [editPopup, setEditPopup] = useState(false);

  async function handleDelete() {
    await habitsAPI.deleteHabit(habit._id);
    setHabits(allHabits.filter((h) => h._id !== habit._id));
  }

  return (
    <div className="habits-card">
      <h4>{habit.habitName}</h4>
      <p>
        <strong>Started from: </strong>
        {startTime.format("MM/DD/YYYY")}
      </p>

      <p>
        <strong>Duration(hours): </strong>
        {habit.duration}
      </p>
      {/* <p>{habit.createdAt}</p> */}

      <button onClick={handleDelete}>Delete</button>

      {/********************* Edit Habits **************************************/}
      <button
        onClick={() => {
          setEditPopup(true);
        }}
      >
        Edit
      </button>
      <UpdateHabitForm
        trigger={editPopup}
        setTrigger={setEditPopup}
        habit={habit}
        allHabits={allHabits}
        setHabits={setHabits}
        todayYMD={todayYMD}
      />
    </div>
  );
}
