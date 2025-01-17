import axios from "axios";
import { WorkspaceModel } from "../Models/WorkspaceModel";
import { appConfig } from "../Utils/AppConfig";

class WorkspaceService {

    // Without Redux for now
	public async getAllWorkspaces(): Promise<WorkspaceModel[]> {
        const response = await axios.get(appConfig.workspacesUrl);
        const workspaces = response.data;
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
        return workspaces;
    }

	public async addWorkspace(workspace: WorkspaceModel): Promise<WorkspaceModel> {
        const response = await axios.post(appConfig.workspacesUrl, workspace);
        const dbWorkspace = response.data;
        return dbWorkspace;
    }

	public async updateWorkspace(workspace: WorkspaceModel): Promise<WorkspaceModel> {
        const response = await axios.put(appConfig.workspacesUrl + workspace._id, workspace);
        const dbWorkspace = response.data;
        return dbWorkspace;
    }

	public async deleteWorkspace(workspaceId: string): Promise<void> {
        await axios.delete(appConfig.workspacesUrl + workspaceId);
    }

    public async addMember(workspaceId: string, userId: string, role: 'admin' | 'member' = 'member'): Promise<WorkspaceModel> {
        const response = await axios.post(`${appConfig.workspacesUrl}${workspaceId}/members`,{userId, role});
        const dbWorkspace = response.data;
        return dbWorkspace;
    }

    public async removeMember(workspaceId: string, userId: string): Promise<WorkspaceModel> {
        const response = await axios.post(`${appConfig.workspacesUrl}${workspaceId}/members/${userId}`);
        const dbWorkspace = response.data;
        return dbWorkspace;
    }
    
}

export const workspaceService = new WorkspaceService();
