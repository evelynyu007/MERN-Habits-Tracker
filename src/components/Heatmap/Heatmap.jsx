// import * as d3 from "d3";
import { useEffect, useState } from "react";
import * as habitsAPI from "../../utilities/habits-api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Heatmap({ userId }) {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    console.log(userId);
    // find user's habits
    async function fetchHabits() {
      const habits = await habitsAPI.getAll(userId);
      //habits' name
      const habitsLabel = [];
      const habitsCnt = [];
      for (let i = 0; i < habits.length; i++) {
        habitsLabel.push(habits[i].title);
        habitsCnt.push(habits[i].checkIn.length);
      }
      console.log(habitsLabel);
      console.log(habitsCnt);

      setChartData({
        labels: habitsLabel,
        datasets: [
          {
            label: "# of days",
            data: habitsCnt,
            borderColor: "rgb(53,162,235)",
            backgroundColor: "rgba(53,162,235,0.4)",
          },
        ],
      });
      setChartOptions({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            stepSize: 5,
          },
        },
        plugins: {
          legentd: {
            position: "top",
          },
          title: {
            display: true,
            text: "Check-in Stats",
          },
        },
      });
    }
    fetchHabits();
  }, []);

  return (
    <div>
      <Bar
        options={chartOptions}
        data={chartData}
        width={"500px"}
        height={"200px"}
      />
    </div>
  );
}
