import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";

import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as habitsAPI from "../../utilities/habits-api";
import "./CalendarPage.css";

moment.locale("en");
const localizer = momentLocalizer(moment);

export default function CalendarPage({ user }) {
  const [allCheckIn, setAllCheckIn] = useState([]);

  // grab all the checked in dates and start = end
  useEffect(() => {
    async function fetchHabits() {
      const habits = await habitsAPI.getAll(user._id);
      // create an empty object
      let checkedInEvents = [];
      // flatten the nested habits
      habits.forEach((habit) => {
        habit.checkIn.forEach((date) => {
          checkedInEvents.push({
            title: "✅ " + habit.title,
            start: moment(date).toDate(),
            end: moment(date).add(1, "days").toDate(),
          });
        });
      });

      //console.log(checkedInEvents);
      setAllCheckIn(checkedInEvents);
    }
    fetchHabits();
  }, [user._id]);

  return (
    <div className="calendar-page">
      <h1 className="page-title">Punch Out Calendar</h1>

      <Calendar
        localizer={localizer}
        events={allCheckIn}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 700,
          margin: "50px",
        }}
      />
    </div>
  );
}
