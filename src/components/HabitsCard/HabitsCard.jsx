import "./HabitsCard.css";
import { RiEditLine, RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import * as habitsAPI from "../../utilities/habits-api";
import UpdateHabitForm from "../UpdateHabitForm/UpdateHabitForm";
const moment = require("moment");

export default function HabitsCard({ habit, allHabits, setHabits, todayYMD }) {
  const startTime = moment.utc(habit.startDate).format("MM/DD/YYYY");
  const endTime =
    habit.endDate && moment.utc(habit.endDate).format("MM/DD/YYYY");
  const [editPopup, setEditPopup] = useState(false);

  async function handleDelete() {
    // habit._id is undefined..???
    const response = await habitsAPI.deleteHabit(habit._id);
    console.log(response);
    setHabits(allHabits.filter((h) => h._id !== habit._id));
  }

  return (
    <div className="habits-card">
      <h4>{habit.title}</h4>
      <p>
        <strong>Start Date: </strong>
        {startTime}
      </p>

      {endTime && (
        <p>
          <strong>End Date: </strong>
          {endTime}
        </p>
      )}

      <p>
        <strong>Duration(hours): </strong>
        {habit.duration}
      </p>
      {/* <p>{habit.createdAt}</p> */}

      <button className="delete-button" onClick={handleDelete}>
        <RiDeleteBin5Line />
      </button>

      {/********************* Edit Habits **************************************/}
      <button
        className="edit-button"
        onClick={() => {
          setEditPopup(true);
        }}
      >
        <RiEditLine />
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
