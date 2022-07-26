import { useState, useEffect } from "react";

export default function HabitsCheckInCard({ habit }) {
  const [crossOut, setCrossOut] = useState(false);
  const today = "2022-07-23";

  function handleCrossOut() {
    setCrossOut(true);
    // push today's date into habit.checkIn
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
