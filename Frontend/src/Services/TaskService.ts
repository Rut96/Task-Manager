import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { TaskModel } from "../Models/TaskModel";
import { store } from "../Redux/Store";
import { taskActions } from "../Redux/TaskSlice";

class TaskService {

    // Without Redux for now
    public async getAllTasks(): Promise<TaskModel[]> {
        const response = await axios.get<TaskModel[]>(appConfig.tasksUrl);

        const action = taskActions.initTasks(response.data)
        store.dispatch(action);

        return response.data;
    }

    public async getOneTask(taskId: string): Promise<TaskModel> {
        const response = await axios.get<TaskModel>(`${appConfig.tasksUrl}/${taskId}`);
        return response.data;
    }

    public async getTasksByBoard(boardId: string): Promise<TaskModel[]> {
        const response = await axios.get<TaskModel[]>(`${appConfig.boardsUrl}/${boardId}/tasks`);

        const action = taskActions.initTasks(response.data)
        store.dispatch(action);

        return response.data;
    }

    public async getTasksByColumn(boardId: string, columnId: string): Promise<TaskModel[]> {
        const response = await axios.get<TaskModel[]>(`${appConfig.boardsUrl}${boardId}/columns/${columnId}/tasks`);

        const action = taskActions.initTasks(response.data)
        store.dispatch(action);
        console.log('Tasks', response.data);
        return response.data;
    }

    public async addTask(task: TaskModel): Promise<TaskModel> {
        const response = await axios.post<TaskModel>(appConfig.tasksUrl, task);

        const action = taskActions.addTask(response.data)
        store.dispatch(action);

        return response.data;
    }

    public async updateTask(task: Partial<TaskModel>): Promise<TaskModel> {
        const response = await axios.put<TaskModel>(`${appConfig.tasksUrl}/${task._id}`, task); // Here, 'task' is the request body

        const action = taskActions.updateTask(response.data)
        store.dispatch(action);

        return response.data;
    }

    public async updateStatus(taskId: string, columnId: string): Promise<TaskModel> {
        const response = await axios.patch<TaskModel>(
            `${appConfig.tasksUrl}/${taskId}/status`,
            { columnId } //  This creates an object: { columnId: "someColumnId" }
        );

        const action = taskActions.updateTask(response.data)
        store.dispatch(action);

        return response.data;
    }

    public async addAssignee(taskId: string, userId: string): Promise<TaskModel> {
        const response = await axios.post<TaskModel>(
            `${appConfig.tasksUrl}/${taskId}/assignees`,
            { userId }
        );

        const action = taskActions.updateTask(response.data)
        store.dispatch(action);

        return response.data;
    }

    public async removeAssignee(taskId: string, userId: string): Promise<TaskModel> {
        const response = await axios.delete<TaskModel>(
            `${appConfig.tasksUrl}/${taskId}/assignees/${userId}`
        );

        const action = taskActions.updateTask(response.data)
        store.dispatch(action);

        return response.data;
    }

    public async deleteTask(taskId: string): Promise<void> {
        await axios.delete(`${appConfig.tasksUrl}/${taskId}`);

        const action = taskActions.deleteTask(taskId)
        store.dispatch(action);
    }
}

export const taskService = new TaskService();