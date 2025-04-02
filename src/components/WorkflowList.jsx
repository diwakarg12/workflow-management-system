import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WorkflowList = () => {
  const [search, setSearch] = useState("");
  const [workflows, setWorkflows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWorkflows = JSON.parse(localStorage.getItem("workflows")) || [];
    setWorkflows(storedWorkflows);
  }, []);

  const handleDelete = (id) => {
    const updatedWorkflows = workflows.filter((w) => w.id !== id);
    setWorkflows(updatedWorkflows);
    localStorage.setItem("workflows", JSON.stringify(updatedWorkflows));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Workflows</h2>
        <button
          onClick={() => navigate("/create-workflow")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Create Workflow
        </button>
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="p-2 border rounded w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workflows
            .filter((w) => w.name.toLowerCase().includes(search.toLowerCase()))
            .map((w) => (
              <tr key={w.id} className="border-t">
                <td className="p-2">{w.name}</td>
                <td className={`p-2 ${w.status === "Passed" ? "text-green-500" : "text-red-500"}`}>
                  {w.status}
                </td>
                <td className="p-2">
                  <button onClick={() => handleDelete(w.id)} className="bg-red-500 text-white p-1 rounded mr-2">
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/edit-workflow/${w.id}`)}
                    className="bg-blue-500 text-white p-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkflowList;
