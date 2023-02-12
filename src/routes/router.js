import { Route, Routes, BrowserRouter } from "react-router-dom";
import Analytics from "../component/Analytics";
import AnalyticsAll from "../component/AnalyticsAll";
import Applications from "../component/Application";
import Dashboard from "../component/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/resources" element={<Applications />} />
        <Route path="/analytics" element={<AnalyticsAll />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
