import { dashboradProjectSchema, projectSchema, type Project, type ProjectFormData } from "../types"
import api from "../lib/axios"
import { isAxiosError } from "axios"

type ProjectUpdateDataType = {
    formData: ProjectFormData,
    projectId: Project['_id']
}

class ProjectService {
    async createProject(formData: ProjectFormData){
        try {
            const { data } = await api.post('/projects', formData)
            return data
        } catch (error) {
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error)
            }
        }
    }

    async getProjects(){
        try {
            const { data } = await api('/projects')
            const response = dashboradProjectSchema.safeParse(data)
            if(response.success){
                return response.data
            }
        } catch (error) {
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error)
            }
        }
    }

    async getProjectById(id: Project['_id']){
        try {
            const { data } = await api(`/projects/${id}`)
            const response = projectSchema.safeParse(data)
            if(response.success){
                return response.data
            }
        } catch (error) {
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error)
            }
        }
    }

    async updateProject({ formData, projectId }: ProjectUpdateDataType){
        try {
            const { data } = await api.put<string>(`/projects/${projectId}`, formData)
            return data
        } catch (error) {
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error)
            }
        }
    }

    async deleteProject(projectId: Project['_id']){
        try {
            const { data } = await api.delete<string>(`/projects/${projectId}`)
            return data
        } catch (error) {
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error)
            }
        }
    }
}

export default new ProjectService