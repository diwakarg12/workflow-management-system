import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import WorkflowList from "./components/WorkflowList";
// import WorkflowCreator from "./components/WorkflowCreator";
import EditWorkflow from "./components/EditWorkflow"; // Import EditWorkflow component
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/Signup";
// import CreateWorkflow from "./components/CreateWorkflow";
// import WorkflowCreation from "./components/WorkflowCreator";
import WorkflowBuilder from "./components/WorkflowCreator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute><WorkflowList /></PrivateRoute>} />
        <Route path="/create-workflow" element={<PrivateRoute><WorkflowBuilder /></PrivateRoute>} />
        <Route path="/edit-workflow/:id" element={<PrivateRoute><EditWorkflow /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
