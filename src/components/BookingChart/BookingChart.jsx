import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const BookingChart = ({ chartData }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Ref to store Chart.js instance

  // Create or update the chart whenever chartData changes
  useEffect(() => {
    if (chartData.labels.length > 0 && chartData.values.length > 0) {
      // Cleanup any existing chart instance
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      if (chartRef.current) {
        const ctx = chartRef.current.getContext("2d");
        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: chartData.labels,
            datasets: [
              {
                label: "Bookings",
                data: chartData.values,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Bookings",
                },
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, [chartData]);

  // Cleanup the chart instance on component unmount
  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default BookingChart;
