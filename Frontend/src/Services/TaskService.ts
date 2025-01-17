import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { TaskModel } from "../Models/TaskModel";

class TaskService {
	
    // Without Redux for now
    public async getAllTasks(): Promise<TaskModel[]> {
        const response = await axios.get(appConfig.tasksUrl);
        const tasks = response.data;
        return tasks;
    }
    
    public async getOneTask(taskId: string): Promise<TaskModel> {
        const response = await axios.get(appConfig.tasksUrl + taskId);
        const task = response.data;
        return task;
    }

    public async getTasksByBoard(boardId: string): Promise<TaskModel[]> {
        const response = await axios.get(`${appConfig.boardsUrl}/${boardId}/tasks`);
        const tasks = response.data;
        return tasks;
    }

    public async addTask(task: TaskModel): Promise<TaskModel> {
        const response = await axios.post(appConfig.tasksUrl, task);
        const dbTask = response.data;
        return dbTask;
    }

    public async updateTask(task: TaskModel): Promise<TaskModel> {
        const response = await axios.put(appConfig.tasksUrl + task._id, task);
        const dbTask = response.data;
        return dbTask;
    }

    public async deleteTask(taskId: string): Promise<void> {
        await axios.delete(appConfig.tasksUrl + taskId);
    }

    public async addAssignee(taskId: string, userId: string): Promise<TaskModel> {
        const response = await axios.post(`${appConfig.tasksUrl}${taskId}/assignees`, { userId });
        const dbTask = response.data;
        return dbTask;
    }

    public async removeAssignee(taskId: string, userId: string): Promise<TaskModel> {
        const response = await axios.delete(`${appConfig.tasksUrl}${taskId}/assignees/${userId}`);
        const dbTask = response.data;
        return dbTask;
    }

}

export const taskService = new TaskService();
