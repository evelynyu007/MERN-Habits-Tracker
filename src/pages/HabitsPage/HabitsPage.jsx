import "./HabitsPage.css";
import { useState, useEffect } from "react";
import HabitsCard from "../../components/HabitsCard/HabitsCard";
import HabitsForm from "../../components/HabitsForm/HabitsForm";
import * as habitsAPI from "../../utilities/habits-api";

export default function HabitsPage() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    async function fetchHabits() {
      const habits = await habitsAPI.getAll();
      setHabits(habits);
    }
    fetchHabits();
  }, []);

  return (
    <>
      <h1>All Your Habits</h1>
      <div className="habits-page">
        {habits?.length ? (
          <>
            {habits.map((habit) => {
              return <HabitsCard key={habit._id} habit={habit} />;
            })}
          </>
        ) : (
          <h2>No Habits - Create One!</h2>
        )}

        <HabitsForm />
      </div>
    </>
  );
}
