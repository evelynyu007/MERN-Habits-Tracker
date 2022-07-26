import "./CheckInPage.css";
import * as habitsAPI from "../../utilities/habits-api";
import { useEffect, useState } from "react";
import HabitsCheckInCard from "../../components/HabitsCheckInCard/HabitsCheckInCard";

const today = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default function CheckInPage({ user }) {
  const [habits, setHabits] = useState([]);
  //grab all habits
  useEffect(() => {
    async function fetchHabits() {
      const habits = await habitsAPI.getAll(user._id);
      setHabits(habits);
    }
    fetchHabits();
  }, []);

  return (
    <div>
      <h1>Check In</h1>
      <p>All info as of {today}</p>
      {/* List all the habits user have */}
      {habits?.length ? (
        <>
          {habits.map((habit) => {
            return <HabitsCheckInCard key={habit._id} habit={habit} />;
          })}
        </>
      ) : (
        <h2>No Habits</h2>
      )}
    </div>
  );
}
