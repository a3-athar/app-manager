import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { useNavigate } from "react-router-dom";
import { get } from "../common/httpClient";

const AppCards = () => {
  const [applications, setApplications] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await get("/applications")
        .then((response) => {
          setApplications(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      await get("/resources")
        .then((response) => {
          setResources(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <ProgressSpinner />;
  }

  const handleApplicationClick = () => {
    navigate("/applications");
  };

  const handleResourceClick = () => {
    navigate("/resources");
  };

  const handleAnalyticsClick = () => {
    navigate("/analytics");
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Card
        title="Applications"
        style={{ width: "50%", textAlign: "center", margin: "10px" }}
      >
        <p>Count: {applications.length}</p>
        <Button label="View Details" onClick={handleApplicationClick} />
      </Card>

      <Card
        title="Resources"
        style={{ width: "50%", textAlign: "center", margin: "10px" }}
      >
        <p>Count: {resources.length}</p>
        <Button label="View Details" onClick={handleResourceClick} />
      </Card>

      <Card
        title="Analytics"
        style={{ width: "50%", textAlign: "center", margin: "10px" }}
      >
        <p>Count: 5</p>
        <Button label="View Details" onClick={handleAnalyticsClick} />
      </Card>
    </div>
  );
};

export default AppCards;
