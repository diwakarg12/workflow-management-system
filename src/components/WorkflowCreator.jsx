import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 100, y: 100 }, data: { label: "Start" }, type: "input" },
  { id: "2", position: { x: 300, y: 100 }, data: { label: "Process" } },
  { id: "3", position: { x: 500, y: 100 }, data: { label: "End" }, type: "output" },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const WorkflowCreator = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeName, setNodeName] = useState("");

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const addNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      data: { label: nodeName || `Node ${nodes.length + 1}` },
    };
    setNodes([...nodes, newNode]);
    setNodeName("");
  };

  return (
    <div className="flex flex-col items-center p-4 h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Workflow Creator</h2>

      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Node Name"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          className="p-2 border rounded"
        />
        <button onClick={addNode} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Node
        </button>
      </div>

      <div className="w-full h-full bg-white shadow-lg rounded-lg overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default WorkflowCreator;
