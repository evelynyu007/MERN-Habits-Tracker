import "./HabitsCard.css";

export default function HabitsCard({ habit }) {
  return (
    <div className="habits-card">
      <p>{habit.habitName}</p>
      <p>
        <strong>Started from: </strong>
        {habit.startDate}
      </p>
      <p>
        <strong>Duration: </strong>
        {habit.duration}
      </p>
      <p>{habit.createdAt}</p>
    </div>
  );
}
