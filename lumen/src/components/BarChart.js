import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

  // eje y
  const scores = [10, 20, 30, 40, 50];
  // eje x
  const labels = ['prod1', 'prod2', 'prod3', 'prod4', 'prod5'];
  const options = {
      fill: true,
      animations: false,
      scales: {
        y: {
          min: 0,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
      },
    };
  
const BarChart = () => {
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Ventas",
          tension: 0.3,
          data: scores,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
      ],
      labels,
    };
  }, []);

  return (
    <div className="barChart">
      <h3 className="barTitle">Los 5 productos más vendidos</h3>
      <Bar data={data} options={options} role="img" className="bar"/>
      {/* className="w-100 p-3 h-100 d-inline-block" height="50" width="100" */}
    </div>
  );
}
export default BarChart;