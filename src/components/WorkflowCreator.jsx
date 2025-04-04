import { useState } from "react";
import {
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // For redirection after save
import { useDispatch, useSelector } from "react-redux";
import { addWorkflow } from "../utils/firestoreService";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { logout } from "../features/authSlice";

export default function WorkflowBuilder() {
  const [nodes, setNodes] = useState([
    { id: "start", type: "start" },
    { id: "end", type: "end" },
  ]);
  const userEmail = useSelector(store =>store.auth.user.email);
  const dispatch = useDispatch();
  const [showNodeOptions, setShowNodeOptions] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeConfigs, setNodeConfigs] = useState({});
  const [workflowDetails, setWorkflowDetails] = useState({
    name: "",
    description: "",
  });
  const [isWorkflowDetailsDialogOpen, setWorkflowDetailsDialogOpen] =
    useState(false);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const navigate = useNavigate();

  const addNode = (type) => {
    const newNode = { id: `node-${nodes.length}`, type };
    setNodes((prevNodes) => [
      prevNodes[0],
      ...prevNodes.slice(1, -1),
      newNode,
      prevNodes[prevNodes.length - 1],
    ]);
    setShowNodeOptions(false);
  };

  const deleteNode = (id) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
    setNodeConfigs((prevConfigs) => {
      const newConfigs = { ...prevConfigs };
      delete newConfigs[id];
      return newConfigs;
    });
  };

  const handleConfigChange = (nodeId, field, value) => {
    setNodeConfigs((prevConfigs) => ({
      ...prevConfigs,
      [nodeId]: { ...prevConfigs[nodeId], [field]: value },
    }));
  };

  const saveNodeConfig = () => {
    setSelectedNode(null);
  };

  const handleWorkflowDetailChange = (field, value) => {
    setWorkflowDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const openWorkflowDetailsDialog = () => {
    setWorkflowDetailsDialogOpen(true);
  };

  const closeWorkflowDetailsDialog = () => {
    setWorkflowDetailsDialogOpen(false);
  };

  const openConfirmationDialog = () => {
    setConfirmationDialogOpen(true);
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const confirmSaveWorkflow = async () => {
  const workflow = {
    ...workflowDetails,
    nodes,
    nodeConfigs,
    email: userEmail,
    createdAt: new Date().toISOString(),
  };

  try {
    addWorkflow(workflow)
    closeConfirmationDialog();
    navigate("/");
  } catch (error) {
    console.error("Error saving workflow: ", error);
    alert("Failed to save workflow. Try again.");
  }
};
const handleLogout = async () => {
  await signOut(auth)
  dispatch(logout());
  navigate("/login");
}

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full flex items-center justify-between px-2">
        <Typography sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "bold"  }} variant="h5">
          Create WorkFlow
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

      <div className="relative mt-4 p-10 bg-[#F2E3C3] w-full h-full rounded-md flex flex-col items-center">
        {nodes.map((node, index) => (
          <div key={node.id} className="flex flex-col items-center">
            <Card
              sx={{ backgroundColor: "transparent", boxShadow: "none" }}
              className="p-0 m-2 cursor-pointer"
              onClick={() =>
                node.type !== "start" &&
                node.type !== "end" &&
                setSelectedNode(node)
              }
            >
              <div
                className={`p-2 font-semibold flex items-center justify-center relative ${
                  node.type === "start"
                    ? "bg-green-500 text-white w-16 h-16 rounded-full"
                    : node.type === "end"
                    ? "bg-red-500 text-white w-16 h-16 rounded-full"
                    : "bg-white text-black w-40 h-16 rounded-md"
                }`}
              >
                {node.type.toUpperCase()}
                {node.type !== "start" && node.type !== "end" && (
                  <MdDelete
                    className="absolute size-5 right-3 text-red-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNode(node.id);
                    }}
                  />
                )}
              </div>
            </Card>

            {index < nodes.length - 1 && (
              <FaArrowDown className="text-gray-500 text-2xl" />
            )}
            {index === nodes.length - 2 && (
              <Button onClick={() => setShowNodeOptions(true)}>+</Button>
            )}
          </div>
        ))}
      </div>

      <Dialog open={showNodeOptions} onClose={() => setShowNodeOptions(false)}>
        <DialogContent>
          <DialogTitle>Select Node Type</DialogTitle>
          <div className="flex flex-col gap-2">
            <Button onClick={() => addNode("API Call")}>API Call</Button>
            <Button onClick={() => addNode("Email")}>Email</Button>
            <Button onClick={() => addNode("Text Box")}>Text Box</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedNode} onClose={() => setSelectedNode(null)}>
        <DialogContent>
          <DialogTitle>Configure {selectedNode?.type}</DialogTitle>
          <div className="flex flex-col gap-2">
            {selectedNode?.type === "API Call" && (
              <>
                <TextField
                  select
                  label="Method"
                  value={nodeConfigs[selectedNode.id]?.method || ""}
                  onChange={(e) => handleConfigChange(selectedNode.id, "method", e.target.value)}
                >
                  <MenuItem value="GET">GET</MenuItem>
                  <MenuItem value="POST">POST</MenuItem>
                  <MenuItem value="PUT">PUT</MenuItem>
                  <MenuItem value="DELETE">DELETE</MenuItem>
                </TextField>
                <TextField
                  label="URL"
                  value={nodeConfigs[selectedNode.id]?.url || ""}
                  onChange={(e) => handleConfigChange(selectedNode.id, "url", e.target.value)}
                />
                <TextField
                  label="Headers"
                  value={nodeConfigs[selectedNode.id]?.headers || ""}
                  onChange={(e) => handleConfigChange(selectedNode.id, "headers", e.target.value)}
                />
                <TextField
                  label="Body"
                  multiline
                  rows={3}
                  value={nodeConfigs[selectedNode.id]?.body || ""}
                  onChange={(e) => handleConfigChange(selectedNode.id, "body", e.target.value)}
                />
              </>
            )}

            {selectedNode?.type === "Email" && (
              <TextField
                label="Email"
                value={nodeConfigs[selectedNode.id]?.email || ""}
                onChange={(e) => handleConfigChange(selectedNode.id, "email", e.target.value)}
              />
            )}

            {selectedNode?.type === "Text Box" && (
              <TextField
                label="Message"
                multiline
                rows={2}
                value={nodeConfigs[selectedNode.id]?.message || ""}
                onChange={(e) => handleConfigChange(selectedNode.id, "message", e.target.value)}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={saveNodeConfig}>Save</Button>
        </DialogActions>
      </Dialog>

      <div className="flex items-center justify-center gap-x-5 my-4">
        <Button
          variant="contained"
          color="success"
          sx={{ fontFamily: "Poppins, sans-serif" }} 
          onClick={openWorkflowDetailsDialog}
        >
          Save Workflow
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          sx={{ fontFamily: "Poppins, sans-serif" }} 
          onClick={() => {
            setNodes([
              { id: "start", type: "start" },
              { id: "end", type: "end" },
            ]);
            setNodeConfigs({});
          }}
        >
          Reset WorkFlow
        </Button>
      </div>

      <Dialog
        open={isWorkflowDetailsDialogOpen}
        onClose={closeWorkflowDetailsDialog}
      >
        <DialogTitle>Enter Workflow Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Workflow Name"
            fullWidth
            sx={{ my: 2 }}
            value={workflowDetails.name}
            onChange={(e) => handleWorkflowDetailChange("name", e.target.value)}
          />
          <TextField
            label="Workflow Description"
            fullWidth
            multiline
            value={workflowDetails.description}
            onChange={(e) =>
              handleWorkflowDetailChange("description", e.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeWorkflowDetailsDialog}>Cancel</Button>
          <Button onClick={openConfirmationDialog}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isConfirmationDialogOpen} onClose={closeConfirmationDialog}>
        <DialogTitle>Are you sure you want to Execute the process {workflowDetails.name ? workflowDetails.name : ""}?</DialogTitle>
        <DialogActions>
          <Button onClick={closeConfirmationDialog}>Cancel</Button>
          <Button onClick={confirmSaveWorkflow} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
