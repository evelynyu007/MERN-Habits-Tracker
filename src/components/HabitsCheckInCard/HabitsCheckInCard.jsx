import { useState } from "react";

export default function HabitsCheckInCard({ habit }) {
  const [crossOut, setCrossOut] = useState(false);

  function handleCrossOut() {
    setCrossOut(true);
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
