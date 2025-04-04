import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowUp, FaEllipsisV } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";
import { TiPin } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorkflow, getWorkflows } from "../utils/firestoreService";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { logout } from "../features/authSlice";
import { Button, Typography } from "@mui/material";
import WorkflowExecutionHistory from "./WorkflowExecutionHistory";

const WorkflowList = () => {
  const [search, setSearch] = useState("");
  const [workflows, setWorkflows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const [showExecutionHis, setShowExecutionHis] = useState(false);
  const workflowsPerPage = 10;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector(store =>store.auth.user.email)

  useEffect(() => {
    const fetchWorkflows = async () => {

      if (!userEmail) {
        console.log("User not authenticated");
        return;
      }

      try {
        const workFlow = await getWorkflows(userEmail)
        setWorkflows(Array.isArray(workFlow) ? workFlow : []);
        console.log('WorkFlows', workFlow)
      } catch (error) {
        console.error("Error fetching workflows:", error);
      }
    };

    fetchWorkflows();
  }, []);

  const handleDelete = (id) => {
    const updatedWorkflows = workflows.filter((w) => w.id !== id);
    deleteWorkflow(id)
    setWorkflows(updatedWorkflows);
    
  };

  const ShowDeleteButton = () =>{
    setShowDeleteButton(prev=>!prev)
  }

  const handleLogout = async () => {
    await signOut(auth)
    dispatch(logout());
    navigate("/login");
  }

  // Calculate pagination
  const totalPages = Math.ceil(workflows.length / workflowsPerPage);
  const indexOfLast = currentPage * workflowsPerPage;
  const indexOfFirst = indexOfLast - workflowsPerPage;
  const currentWorkflows = workflows.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-6 bg-[#FDFBF6] min-h-screen">
        <div className="w-full flex items-center justify-between px-2">
        <Typography sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "bold"  }} variant="h5">
          WorkFlow Builder
        </Typography>
        <Button 
          variant="contained" 
          color="error" 
          sx={{ fontFamily: "Poppins, sans-serif" }}
          onClick={handleLogout}
        >
          LogOut
        </Button>
      </div>
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
              <>
              <tr key={w.id} className="border-t">
                <td className="p-2 text-center">
                  {w.name ? w.name : "Sample Name"}
                </td>
                <td className="p-2  text-center">#{w.id ? w.id : 'jdrgnvdnvd1'}</td>
                <td className="p-2  text-center">{w.lastEditedOn ? w.lastEditedOn : userEmail}</td>
                <td className="p-2  text-center">{w.description ? w.description : 'Lorem ipsum dolor sit, amet consectetur'}</td>
                <td className="p-2  flex space-x-3 items-center justify-center relative">
                <TiPin className="size-6 text-yellow-500 mr-6" />
                  <button className="px-3 py-1 rounded border-[1.5px] border-[#E0E0E0] cursor-pointer">Execute</button>
                  <Link to={`/edit-workflow/${w.id}`} className="px-3 py-1 rounded border-[1.5px] border-[#E0E0E0]">Edit</Link>
                  {
                    showDeleteButton && <button onClick={() => handleDelete(w.id)} className="absolute top-10 left-7/12 px-3 py-1 rounded border-[1.5px] border-[#E0E0E0] bg-white cursor-pointer">
                    Delete
                  </button>
                  }
                  <FaEllipsisV className="cursor-pointer size-5" onClick={ShowDeleteButton} />
                  <div onClick={()=>setShowExecutionHis(prev=>!prev)}>
                    {showExecutionHis ? <FaArrowUp className="cursor-pointer size-5" /> : <FaArrowDown className="cursor-pointer size-5" />}
                  </div>

                </td>
              </tr>
              {
                showExecutionHis && 
                (<tr className="p-4 bg-[#FFFAF2]">
                  <td colSpan={2}><WorkflowExecutionHistory workFlowDta={w} /></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  </tr>
                )
              }
            </>
            ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-4 p-2">
          <div className="space-x-0.5">
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
        </div>
      )}
    </div>
  );
};

export default WorkflowList;
