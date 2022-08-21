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
  const sales = [39, 49, 63, 69, 79];
  // eje x
  const labels = ['Monroe', 'Minimal', 'Cristal', 'Aurora', 'Oross'];
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
          data: sales,
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
      <p>Año 2021/2022</p>
      <Bar data={data} options={options} role="img" />
    </div>
  );
}
export default BarChart;