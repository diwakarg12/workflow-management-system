import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditWorkflow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workflow, setWorkflow] = useState({ name: "", status: "Passed" });

  useEffect(() => {
    const storedWorkflows = JSON.parse(localStorage.getItem("workflows")) || [];
    const existingWorkflow = storedWorkflows.find((w) => w.id === id);
    if (existingWorkflow) {
      setWorkflow(existingWorkflow);
    } else {
      navigate("/"); // Redirect if workflow not found
    }
  }, [id, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const storedWorkflows = JSON.parse(localStorage.getItem("workflows")) || [];
    const updatedWorkflows = storedWorkflows.map((w) =>
      w.id === id ? { ...w, ...workflow } : w
    );
    localStorage.setItem("workflows", JSON.stringify(updatedWorkflows));
    navigate("/");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Workflow</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-semibold">Workflow Name:</label>
          <input
            type="text"
            className="p-2 border rounded w-full"
            value={workflow.name}
            onChange={(e) => setWorkflow({ ...workflow, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Status:</label>
          <select
            className="p-2 border rounded w-full"
            value={workflow.status}
            onChange={(e) => setWorkflow({ ...workflow, status: e.target.value })}
          >
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Workflow
        </button>
      </form>
    </div>
  );
};

export default EditWorkflow;
