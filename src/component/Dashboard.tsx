import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import AppCards from "./AppCards";
import "./Dashboard.css";
import { get } from "../common/httpClient";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState(10);
  const [first, setFirst] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await get("/raw")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      setLoading(false);
    };

    fetchData();
  }, []);

  const handlePage = (event: any) => {
    setRows(event.rows);
    setFirst(event.first);
  };

  if (loading) {
    return <ProgressSpinner />;
  }

  return (
    <div className="Dashboard">
      <div className="header">
        <h1>Application Manager</h1>
      </div>
      <div className="card-container">
        <AppCards />
      </div>
      <div className="data-table-container">
        <DataTable
          value={data}
          rows={rows}
          first={first}
          paginator={true}
          onPage={handlePage}
        >
          <Column
            field="ConsumedQuantity"
            header="Consumed Quantity"
            sortable
          />
          <Column field="Cost" header="Cost" sortable />
          <Column field="Date" header="Date" />
          <Column field="InstanceId" header="Instance Id" />
          <Column field="MeterCategory" header="Meter Category" />
          <Column field="ResourceGroup" header="Resource Group" />
          <Column field="ResourceLocation" header="Resource Location" />
          <Column field="Tags.app-name" header="App Name" />
          <Column field="Tags.environment" header="Environment" />
          <Column field="Tags.business-unit" header="Business Unit" />
          <Column field="UnitOfMeasure" header="Unit of Measure" sortable />
          <Column field="Location" header="Location" />
          <Column field="ServiceName" header="Service Name" />
        </DataTable>
      </div>
    </div>
  );
};

export default Dashboard;
