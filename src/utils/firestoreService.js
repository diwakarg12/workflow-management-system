import { collection, addDoc, getDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";

// Add a new workflow
const addWorkflow = async (workflowData) => {
    try {
        const docRef = await addDoc(collection(db, "workflows"), workflowData);
        console.log("Workflow added with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding workflow: ", error);
    }
};

// Get all workflows
const getWorkflows = async (email) => {
    try {
        const q = query(
            collection(db, "workflows"),
            where("email", "==", email)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching workflows: ", error);
    }
};

const getWorkflowById = async (id) => {
    try {
        const docRef = doc(db, "workflows", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No workflow found with this ID.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching workflow: ", error);
        return null;
    }
};

// Update an existing workflow
const updateWorkflow = async (id, updatedData) => {
    try {
        const workflowRef = doc(db, "workflows", id);
        await updateDoc(workflowRef, updatedData);
        console.log("Workflow updated successfully!");
    } catch (error) {
        console.error("Error updating workflow: ", error);
    }
};

// Delete a workflow
const deleteWorkflow = async (id) => {
    try {
        await deleteDoc(doc(db, "workflows", id));
        console.log("Workflow deleted successfully!");
    } catch (error) {
        console.error("Error deleting workflow: ", error);
    }
};

export { addWorkflow, getWorkflows, getWorkflowById, updateWorkflow, deleteWorkflow };
