import "./HabitsCard.css";
const moment = require("moment");

export default function HabitsCard({ habit }) {
  const startTime = habit && moment(habit.startDate);
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
    </div>
  );
}
