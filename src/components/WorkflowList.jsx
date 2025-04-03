import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";
import { TiPin } from "react-icons/ti";



const WorkflowList = () => {
  const [search, setSearch] = useState("");
  const [workflows, setWorkflows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const workflowsPerPage = 10;
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

  const ShowDeleteButton = () =>{
    setShowDeleteButton(prev=>!prev)
  }

  // Calculate pagination
  const totalPages = Math.ceil(workflows.length / workflowsPerPage);
  const indexOfLast = currentPage * workflowsPerPage;
  const indexOfFirst = indexOfLast - workflowsPerPage;
  const currentWorkflows = workflows.slice(indexOfFirst, indexOfLast);
//   const currentWorkflows = [{
//    id: 1,
//    name: 'Diwakar Giri',
//     lastEditedOn: 'Diwakar Giri',
//     description: 'Some description here regarding the flow..',
//   }]

  return (
    <div className="p-6 bg-[#FDFBF6] min-h-screen">
        <h2 className="text-3xl font-bold">Workflow Builder</h2>
      <div className="flex justify-between items-center my-6">
        <input
        type="text"
        placeholder="Search By Workflow Name/ID"
        className="p-2 border rounded w-1/4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

        <button
          onClick={() => navigate("/create-workflow")}
          className="bg-black text-white px-4 py-2 rounded cursor-pointer"
        >
          + Create New Process
        </button>
      </div>


      <table className="w-full border bg-white p-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Workflow Name</th>
            <th className="p-2">ID</th>
            <th className="p-2">Last Edited On</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentWorkflows
            .filter((w) => w.name.toLowerCase().includes(search.toLowerCase()))
            .map((w) => (
              <tr key={w.id} className="border-t">
                <td className="p-2 text-center">
                  {w.name}
                </td>
                <td className="p-2  text-center">#{w.id}</td>
                <td className="p-2  text-center">{w.lastEditedOn}</td>
                <td className="p-2  text-center">{w.description}</td>
                <td className="p-2  flex space-x-3 border-2 items-center justify-center relative">
                <TiPin className="size-6 text-yellow-500 mr-6" />
                  <button className="px-3 py-1 rounded border-[1.5px] border-[#E0E0E0]">Execute</button>
                  <button className="px-3 py-1 rounded border-[1.5px] border-[#E0E0E0]">Edit</button>
                  {
                    showDeleteButton && <button onClick={() => handleDelete(w.id)} className="absolute top-10 left-7/12 px-3 py-1 rounded border-[1.5px] border-[#E0E0E0] bg-white">
                    Delete
                  </button>
                  }
                  <FaEllipsisV className="cursor-pointer size-5" onClick={ShowDeleteButton} />
                  <FaArrowDown className="cursor-pointer size-5" />

                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination - Show only if more than 10 workflows */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-4 p-2">
          <div className="space-x-0.5">
            {/* <button
            className={`p-2 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &#9664;
          </button> */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded cursor-pointer ${currentPage === index + 1 ? "bg-[#FEF3E9] text-white" : "bg-transparent"}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          {/* <button
            className={`p-2 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            ▶
          </button> */}
        </div>
      )}
    </div>
  );
};

export default WorkflowList;
