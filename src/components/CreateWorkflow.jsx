import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateWorkflow = ({ addWorkflow }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Passed");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addWorkflow({ id: Date.now().toString(), name, status });
    navigate("/"); // Redirect to the workflow list
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create Workflow</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Workflow Name:</label>
          <input
            type="text"
            className="p-2 border rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Status:</label>
          <select
            className="p-2 border rounded w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Add Workflow
        </button>
      </form>
    </div>
  );
};

export default CreateWorkflow;
