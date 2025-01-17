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
        const response = await axios.get(appConfig.getWorkspaceActivitiesUrl(workspaceId));
        const activities = response.data;
        return activities;
    }

    public async getActivitiesByBoard(workspaceId: string): Promise<ActivityService[]> {
        const response = await axios.get(appConfig.getActivitiesByBoard(workspaceId));
        const activities = response.data;
        return activities;
    }
    
    public async getActivitiesByUser(userId: string): Promise<ActivityService[]> {
        const response = await axios.get(appConfig.getUserActivitiesUrl(userId));
        const activities = response.data;
        return activities;
    }
}

export const activityService = new ActivityService();
