import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import "./Dashboard.css";
import { get } from "../common/httpClient";
import Analytics from "./Analytics";

const AnalyticsAll = () => {
  const [data, setData] = useState({});
  const [selectedX, setSelectedX] = useState("");
  const [selectedY, setSelectedY] = useState("");
  const [selectedChart, setselectedChart] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await get("/raw")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, []);

  const handleXChange = (e: any) => {
    setSelectedX(e.value);
  };

  const handleYChange = (e: any) => {
    setSelectedY(e.value);
  };

  const handleChartChange = (e: any) => {
    setselectedChart(e.value);
  };

  const keys =
    Array.isArray(data) && data.length > 0 ? Object.keys(data[0]) : [];

  const xAxisOptions = [...keys.map((key) => ({ label: key, value: key }))];
  const yAxisOptions = [...keys.map((key) => ({ label: key, value: key }))];
  const chartOptions = ["Line", "Bar", "Pie", "Doughnut", "PolarArea"];

  let chartData = {
    labels: [] as any[],
    datasets: [
      {
        label: selectedY,
        data: [] as any[],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (Array.isArray(data)) {
    chartData.labels = data.map((item: any) => item[selectedX]);
    chartData.datasets[0].data = data.map((item: any) => item[selectedY]);
  }

  return (
    <div>
      <label htmlFor="x-axis">X Axis:</label>
      <Dropdown
        id="x-axis"
        placeholder="Select X-Axis"
        value={selectedX}
        options={xAxisOptions}
        onChange={handleXChange}
      />
      <label htmlFor="y-axis">Y Axis:</label>
      <Dropdown
        id="y-axis"
        placeholder="Select Y-Axis"
        value={selectedY}
        options={yAxisOptions}
        onChange={handleYChange}
      />
      <label htmlFor="chart-type">Chart Type:</label>
      <Dropdown
        id="chart-type"
        placeholder="Select Chart type"
        value={selectedChart}
        options={chartOptions}
        onChange={handleChartChange}
      />
      <div className="chart-container">
        <Card style={{ width: "85%", height: "75%" }}>
          {selectedX && selectedY && (
            <Analytics
              xAxis={selectedX}
              yAxis={selectedY}
              chart={selectedChart}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsAll;
