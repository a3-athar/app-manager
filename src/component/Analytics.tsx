import { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { get } from "../common/httpClient";

const Analytics = (props: any) => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("");
  const [appCostData, setAppCostData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await get("/raw")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      let xAxis = props.xAxis;
      let yAxis = props.yAxis;
      // Transform the data for chart.js
      const appCosts: { [key: string]: number } = {};
      data.forEach(({ [yAxis]: Cost, [xAxis]: appName }: any) => {
        let appCost = parseInt(Cost);
        if (appCosts[appName]) {
          appCosts[appName] += appCost;
        } else {
          appCosts[appName] = appCost;
        }
      });

      setAppCostData({
        labels: Object.keys(appCosts),
        datasets: [
          {
            label: "Cost",
            data: Object.values(appCosts),
            // backgroundColor: "rgba(255, 99, 132, 0.2)",
            // borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      });
    };
    setChartType(props.chart);
    fetchData();
  }, [props]);

  return (
    <div>
      {chartType === "Line" && <Chart type="line" data={appCostData} />}
      {chartType === "Bar" && <Chart type="bar" data={appCostData} />}
      {chartType === "Pie" && <Chart type="pie" data={appCostData} />}
      {chartType === "Doughnut" && <Chart type="doughnut" data={appCostData} />}
      {chartType === "PolarArea" && (
        <Chart type="polarArea" data={appCostData} />
      )}
    </div>
  );
};

export default Analytics;
