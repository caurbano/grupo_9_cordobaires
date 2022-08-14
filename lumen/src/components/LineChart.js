import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
// ingresos mensuales x vtas x 1 año 2022
// const scores = [25.000, 48.900, 60.300, 55.000, 70.500, 100.900, 190.000];
const scores = [1, 5, 2, 6, 7, 8, 4]
const scores2 = [1, 3, 2, 2, 4, 4, 8];
const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const options = {
  fill: true,
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

 const LineChart = () => {
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Mis datos",
          data: scores,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
        {
          label: "Mis datos (2)",
          tension: 0.3,
          data: scores2,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
          pointRadius: 6,
        },
      ],
      labels,
    };
  }, []);

  return (
    <div className="barChart">
    <Line data={data} options={options} />
    </div>);
}

export default LineChart;