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
const ing = [28.000, 48.900, 45.300, 55.000, 80.500, 120.900, 130.500, 125.500];
const out = [15.000, 35.900, 18.300, 18.000, 17.500, 15.900, 46.900, 56.900];

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
            label: "Ingresos",
            tension: 0.3,
            data: ing,
            borderColor: "green",
            backgroundColor: "rgba(0, 255, 0, 0.3)",
            pointRadius: 5,
          },
        {
          label: "Egresos",
          data: out,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 5,
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        }
      ],
      labels,
    };
  }, []);

  return (
    <div className="lineChart">
    <Line data={data} options={options} />
    </div>);
}

export default LineChart;