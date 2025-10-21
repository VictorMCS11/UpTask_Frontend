import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import ProjectService from "../../services/ProjectService"
import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import AddTaskModal from "../../components/tasks/AddTaskModal"
import TaskList from "../../components/tasks/TaskList"
import EditTaskData from "../../components/tasks/EditTaskData"
import TaskModalDetails from "../../components/tasks/TaskModalDetails"


export default function ProjectDetailsView(){

    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

    const { data, isError, isLoading } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => ProjectService.getProjectById(projectId),
        retry: false
    })
    
    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404'></Navigate>

    if(data) return (
        <>
            <h1 className="text-5xl font-black">{data.clientName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
            <nav className="my-5 flex gap-5">
                <input
                    type="button"
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    onClick={() => navigate(location.pathname + '?newTask=true')}
                    value={'Agregar Tarea'}
                />
            </nav>
            
            <TaskList tasks={data.tasks} />
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )

}