import "./CheckInPage.css";
import * as habitsAPI from "../../utilities/habits-api";
import { useEffect, useState } from "react";
import HabitsCheckInCard from "../../components/HabitsCheckInCard/HabitsCheckInCard";

const today = new Date();

const todayFormat = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default function CheckInPage({ user }) {
  const [habits, setHabits] = useState([]);
  //grab all habits and its checkIn dates
  useEffect(() => {
    async function fetchHabits() {
      const habits = await habitsAPI.getAll(user._id);
      setHabits(habits);
    }
    fetchHabits();
  }, [user._id]);

  return (
    <div className="checkin-page">
      <h1 className="page-title">Check-In {todayFormat}</h1>
      {/* List all the habits user have */}
      {habits?.length ? (
        <>
          {habits.map((habit) => {
            // only list the habits after start date &&// before end date
            if (Date.parse(habit.startDate) <= Date.parse(today))
              return <HabitsCheckInCard key={habit._id} habit={habit} />;
            else return null;
          })}
        </>
      ) : (
        <h2>No Habits for Today</h2>
      )}
    </div>
  );
}
