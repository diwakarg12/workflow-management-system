import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import WorkflowList from "./components/WorkflowList";
import EditWorkflow from "./components/EditWorkflow";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/Signup";
import WorkflowBuilder from "./components/WorkflowCreator";
import WorkflowExecution from "./components/WorkflowExecution";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute><WorkflowList /></PrivateRoute>} />
        <Route path="/create-workflow" element={<PrivateRoute><WorkflowBuilder /></PrivateRoute>} />
        <Route path="/edit-workflow/:id" element={<PrivateRoute><EditWorkflow /></PrivateRoute>} />
        <Route path="/workflow-execution/:id" element={<PrivateRoute><WorkflowExecution /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
