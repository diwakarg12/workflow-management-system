import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import WorkflowList from "./components/WorkflowList";
import WorkflowCreator from "./components/WorkflowCreator";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><WorkflowList /></PrivateRoute>} />
        <Route path="/create-workflow" element={<PrivateRoute><WorkflowCreator /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
