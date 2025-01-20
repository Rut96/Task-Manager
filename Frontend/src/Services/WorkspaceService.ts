import axios from "axios";
import { WorkspaceModel } from "../Models/WorkspaceModel";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../Redux/Store";
import { workspaceActions } from "../Redux/WorkspaceSlice";

class WorkspaceService {

	public async getAllWorkspaces(): Promise<WorkspaceModel[]> {
        const response = await axios.get(appConfig.workspacesUrl);
        const workspaces = response.data;

        const action = workspaceActions.initWorkspaces(workspaces);
        store.dispatch(action);

        return workspaces;
    }

	public async getOneWorkspace(workspaceId: string): Promise<WorkspaceModel> {
        const response = await axios.get(appConfig.workspacesUrl + workspaceId);
        const workspace = response.data;
        return workspace;
    }

	public async getWorkspacesByUser(userId: string): Promise<WorkspaceModel[]> {
        const response = await axios.get(`${appConfig.usersUrl}${userId}/workspaces`);
        const workspaces = response.data;

        const action = workspaceActions.initWorkspaces(workspaces);
        store.dispatch(action);

        return workspaces;
    }

	public async addWorkspace(workspace: WorkspaceModel): Promise<WorkspaceModel> {
        const response = await axios.post(appConfig.workspacesUrl, workspace);
        const dbWorkspace = response.data;

        const action = workspaceActions.addWorkspace(dbWorkspace);
        store.dispatch(action);

        return dbWorkspace;
    }

	public async updateWorkspace(workspace: WorkspaceModel): Promise<WorkspaceModel> {
        const response = await axios.put(appConfig.workspacesUrl + workspace._id, workspace);
        const dbWorkspace = response.data;

        const action = workspaceActions.updateWorkspace(dbWorkspace);
        store.dispatch(action);

        return dbWorkspace;
    }

	public async deleteWorkspace(workspaceId: string): Promise<void> {
        await axios.delete(appConfig.workspacesUrl + workspaceId);

        const action = workspaceActions.deleteWorkspace(workspaceId);
        store.dispatch(action);
    }

    public async addMember(workspaceId: string, userId: string, role: 'admin' | 'member' = 'member'): Promise<WorkspaceModel> {
        const response = await axios.post(`${appConfig.workspacesUrl}${workspaceId}/members`,{userId, role});
        const dbWorkspace = response.data;

        const action = workspaceActions.updateWorkspace(dbWorkspace);
        store.dispatch(action);

        return dbWorkspace;
    }

    public async removeMember(workspaceId: string, userId: string): Promise<WorkspaceModel> {
        const response = await axios.post(`${appConfig.workspacesUrl}${workspaceId}/members/${userId}`);
        const dbWorkspace = response.data;

        const action = workspaceActions.updateWorkspace(dbWorkspace);
        store.dispatch(action);

        return dbWorkspace;
    }
    
}

export const workspaceService = new WorkspaceService();
