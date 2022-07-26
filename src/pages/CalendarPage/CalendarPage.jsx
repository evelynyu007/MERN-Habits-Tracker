import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";

import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as habitsAPI from "../../utilities/habits-api";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

// seed data
// date is a month later..
// const events = [
//   {
//     title: "big meeting",
//     allDay: true,
//     start: new Date(2022, 6, 1),
//     end: new Date(2022, 6, 10),
//   },
//   {
//     title: "Vacation",
//     start: new Date(2022, 9, 1),
//     end: new Date(2022, 9, 12),
//   },
//   {
//     title: "Conference",
//     start: new Date(2022, 6, 14),
//     end: new Date(2022, 6, 16),
//   },
// ];

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
            title: habit.title,
            start: new Date(date),
            end: new Date(date),
          });
        });
      });

      console.log(checkedInEvents);
      setAllCheckIn(checkedInEvents);
    }
    fetchHabits();
  }, [user._id]);

  return (
    <div className="calendar-page">
      <h1>Checked In Calendar</h1>

      <Calendar
        localizer={localizer}
        events={allCheckIn}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800, margin: "50px" }}
      />
    </div>
  );
}
