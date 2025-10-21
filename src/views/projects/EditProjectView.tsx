import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import ProjectService from "../../services/ProjectService"
import { Navigate } from "react-router-dom"
import EditProjectForm from "../../components/projects/EditProjectForm"

export default function EditProjectView(){

    const params = useParams()
    const projectId = params.projectId!

    const { data, isError, isLoading } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => ProjectService.getProjectById(projectId),
        retry: false
    })
    
    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404'></Navigate>
    if(data) return <EditProjectForm data={data} projectId={projectId} />

}