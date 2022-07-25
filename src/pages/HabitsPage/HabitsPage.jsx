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

  // add new habits to the existing one
  // not correct..
  function addNewHabit(newHabit) {
    setHabits([...habits, newHabit]);
  }

  return (
    <>
      <h1>All Your Habits</h1>
      <div className="habits-container">
        {habits?.length ? (
          <>
            {habits.map((habit) => {
              return (
                <HabitsCard
                  key={habit._id}
                  habit={habit}
                  allHabits={habits}
                  setHabits={setHabits}
                />
              );
            })}
          </>
        ) : (
          <h2>No Habits - Create One!</h2>
        )}
      </div>

      <HabitsForm addNewHabit={addNewHabit} />
    </>
  );
}
