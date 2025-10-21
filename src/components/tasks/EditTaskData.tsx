import EditTaskModal from "./EditTaskModal";
import { Navigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import TaskService from "../../services/TaskService";

export default function EditTaskData(){
    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('editTask')!
    
    const { data, isError } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => TaskService.getTaskById({ projectId, taskId }),
        enabled: !!taskId, //Esto convierte a "true" si contiene algo y "false" si no 
    })

    if(isError) return <Navigate to='404' />

    if(data) return <EditTaskModal data={data} taskId={taskId} />
}