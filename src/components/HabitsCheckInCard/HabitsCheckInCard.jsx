import { useState, useEffect } from "react";
import * as habitsAPI from "../../utilities/habits-api";
import "./HabitsCheckInCard.css";
const moment = require("moment");
// create today as YYYY-MM-DD
const todayYMD = moment(new Date()).format("YYYY-MM-DD");

export default function HabitsCheckInCard({ habit }) {
  const [crossOut, setCrossOut] = useState(false);
  const [updateHabit, setUpdateHabit] = useState({
    ...habit,
  });

  // if habit is already crossed out
  useEffect(() => {
    if (habit.checkIn.includes(todayYMD)) {
      setCrossOut(true);
    }
  }, [habit.checkIn]);

  async function handleCrossOut() {
    setCrossOut(true);
    // save today's date into habit.checkIn
    // only push one same date
    if (updateHabit.checkIn.indexOf(todayYMD) === -1) {
      updateHabit.checkIn.push(todayYMD);
    }

    try {
      await habitsAPI.updateHabit(habit._id, { ...updateHabit });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="check-in-card">
      <i
        className="fa fa-check-square-o text-primary btn m-0 p-0"
        data-toggle="tooltip"
        data-placement="bottom"
        title=""
        data-original-title="Mark as todo"
      ></i>

      <p
        className="check-in-routine"
        onClick={handleCrossOut}
        style={{
          textDecoration: crossOut ? "line-through" : "",
          color: crossOut ? "black" : "",
        }}
      >
        {habit.title}
        {habit.duration > 0 ? <span> for {habit.duration} hour(s)</span> : ""}
      </p>
    </div>
  );
}
