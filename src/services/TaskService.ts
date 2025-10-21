import { isAxiosError } from "axios";
import api from "../lib/axios";
import { type TaskFormData, type Task, type Project, taskSchema } from "../types";

type TaskAPI = {
    formData: TaskFormData
    projectId: Project['_id']
    taskId: Task['_id']
    status: Task['status']
}

class TaskService {
    async createTask({formData, projectId}: Pick<TaskAPI, 'formData' | 'projectId'>){
        try {
            const url = `/projects/${projectId}/tasks`
            const { data } = await api.post<string>(url, formData)
            return data
        } catch (error) {
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error)
            }
        }
    }

    async getTaskById({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>){
        try {
            const url = `/projects/${projectId}/tasks/${taskId}`
            const { data } = await api(url)
            const response = taskSchema.safeParse(data)
            if(response.success) return response.data
        } catch (error) {
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error)
            }
        }
    }

    async updateTask({ projectId, taskId, formData }: Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>){
        try {
            const url = `/projects/${projectId}/tasks/${taskId}`
            const { data } = await api.put<string>(url, formData)
            return data
        } catch (error) {
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error)
            }
        }
    }

    async deleteTask({projectId, taskId}: Pick<TaskAPI, 'projectId' | 'taskId'>){
        try {
            const url = `/projects/${projectId}/tasks/${taskId}`
            const { data } = await api.delete<string>(url)
            return data
        } catch (error) {
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error)
            }
        }
    }

        async updateStatus({ projectId, taskId, status }: Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>){
        try {
            const url = `/projects/${projectId}/tasks/${taskId}/status`
            const { data } = await api.post<string>(url, {status})
            return data
        } catch (error) {
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error)
            }
        }
    }
}

export default new TaskService