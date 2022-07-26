import { useState, useEffect } from "react";
import * as habitsAPI from "../../utilities/habits-api";
const moment = require("moment");
// create today as YYYY-MM-DD
const todayYMD = moment(new Date()).format("YYYY-MM-DD");
console.log(todayYMD);

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
  }, []);

  async function handleCrossOut() {
    setCrossOut(true);
    // save today's date into habit.checkIn
    updateHabit.checkIn.push(todayYMD);
    try {
      await habitsAPI.updateHabit(habit._id, { ...updateHabit });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <h3
        onClick={handleCrossOut}
        style={{
          textDecoration: crossOut ? "line-through" : "",
          color: crossOut ? "red" : "",
        }}
      >
        {habit.habitName} for {habit.duration} hour(s)
      </h3>
    </>
  );
}
