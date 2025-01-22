import axios from "axios";
import { appConfig } from "../Utils/AppConfig";

class ActivityService {

    public async getAllActivities(): Promise<ActivityService[]> {
        const response = await axios.get(appConfig.activitiesUrl);
        const activities = response.data;
        return activities;
    }

    public async getRecentActivities(): Promise<ActivityService[]> {
        const response = await axios.get(`${appConfig.activitiesUrl}/recent`);
        const activities = response.data;
        return activities;
    }

    public async getActivitiesByWorkspace(workspaceId: string): Promise<ActivityService[]> {
        const response = await axios.get(`${appConfig.workspacesUrl}${workspaceId}/activities`);
        const activities = response.data;
        return activities;
    }

    public async getActivitiesByBoard(boardId: string): Promise<ActivityService[]> {
        const response = await axios.get(`${appConfig.boardsUrl}${boardId}/activities`);
        const activities = response.data;
        return activities;
    }
    
    public async getActivitiesByUser(userId: string): Promise<ActivityService[]> {
        const response = await axios.get(`${appConfig.usersUrl}${userId}/activities`);
        const activities = response.data;
        return activities;
    }
}

export const activityService = new ActivityService();
