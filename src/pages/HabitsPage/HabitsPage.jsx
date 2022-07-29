import "./HabitsPage.css";
import { useState, useEffect } from "react";
import HabitsCard from "../../components/HabitsCard/HabitsCard";
import HabitsForm from "../../components/HabitsForm/HabitsForm";
import * as habitsAPI from "../../utilities/habits-api";
const moment = require("moment");

// create today as YYYY-MM-DD
const todayYMD = moment(new Date()).format("YYYY-MM-DD");
//console.log(todayYMD);

export default function HabitsPage({ user }) {
  const [habits, setHabits] = useState([]);
  const [addPopup, setAddPopup] = useState(false);

  useEffect(() => {
    async function fetchHabits() {
      const habits = await habitsAPI.getAll(user._id);
      setHabits(habits);
    }
    fetchHabits();
  }, [user._id]);

  // add new habits to the existing one
  function addNewHabit(newHabit) {
    setHabits([...habits, newHabit]);
  }

  return (
    <>
      <h1>All Your Habits</h1>
      {/* Add a habit */}
      <button onClick={() => setAddPopup(true)}>Add</button>
      <HabitsForm
        trigger={addPopup}
        setTrigger={setAddPopup}
        addNewHabit={addNewHabit}
        setHabits={setHabits}
        user={user}
        todayYMD={todayYMD}
      />

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
                  todayYMD={todayYMD}
                />
              );
            })}
          </>
        ) : (
          <h2>No Habits - Create One!</h2>
        )}
      </div>
    </>
  );
}
