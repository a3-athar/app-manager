import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import "./Dashboard.css";
import ApplicationCard from "./ApplicationCard";
import { useLocation } from "react-router-dom";
import { get } from "../common/httpClient";
import { ProgressSpinner } from "primereact/progressspinner";

const Application = () => {
  const [applications, setApplications] = useState<string[]>([]);
  const [selectedApp, setSelectedApp] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const type = useLocation().pathname;

  useEffect(() => {
    get(`${type}`)
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setLoading(false);
  }, [type]);

  const onAppClick = (app: any) => {
    setExpanded(true);
    setSelectedApp(app);
  };

  if (loading) {
    return <ProgressSpinner />;
  }

  return (
    <div>
      <div className="header">
        {type === "/applications" ? (
          <h1>Application List</h1>
        ) : (
          <h1>Resources List</h1>
        )}
      </div>
      <div className="grid justify-content-center mt-3">
        {applications.map((application) => (
          <Card
            className="col-3 m-1 cursor-pointer"
            key={application}
            title={application}
            onClick={() => onAppClick(application)}
          />
        ))}
        {expanded && (
          <ApplicationCard type={type} applicationName={selectedApp} />
        )}
      </div>
    </div>
  );
};

export default Application;
