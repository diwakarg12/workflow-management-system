/* eslint-disable no-unused-vars */
import { CiShare1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const WorkflowExecutionHistory = ({workFlowDta}) => {
    const data = [
        { id: 1, date: "28/05 - 22:43 IST", status: "Passed" },
        { id: 2, date: "27/05 - 21:43 IST", status: "Failed" },
        { id: 3, date: "26/05 - 20:43 IST", status: "Failed" },
    ];
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/workflow-execution/${workFlowDta.id}`)
    }

    return (
        <div className="flex flex-col items-start">
            {data.map((execution, index) => (
                <div key={execution.id} className="flex items-center space-x-4 w-full relative">
                    
                    {/* Left Timeline */}
                    <div className="flex flex-col items-center">
                        {/* Circle */}
                        <div className="w-6 h-6 rounded-full bg-[#FFE1D2] flex items-center justify-center relative">
                            <div className="w-4 h-4 rounded-full bg-[#FF5200]"></div>
                        </div>
                        {/* Vertical Line (only for non-last items) */}
                        {index !== data.length - 1 && (
                            <div className="w-[2px] h-12 bg-[#FF5200]"></div>
                        )}
                    </div>

                    {/* Execution Details */}
                    <div className="flex items-center justify-center space-x-5 w-full">
                        <p className="font-poppins text-lg font-medium">{execution.date}</p>
                        <p
                            className={`py-2 text-lg font-medium text-center rounded-md 
                                ${execution.status === "Passed" ? "bg-[#DDEBC0] px-6" : "bg-[#F8AEA8] px-7"}`}
                        >
                            {execution.status}
                        </p>
                        <CiShare1 size={30} onClick={handleNavigate} className="text-2xl font-bold cursor-pointer" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WorkflowExecutionHistory;
