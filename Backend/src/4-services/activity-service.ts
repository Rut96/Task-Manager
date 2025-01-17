import { ActivityModel, IActivityModel } from "../3-models/activity-model";

class ActivityService {
    
    public async getAllActivities(): Promise<IActivityModel[]> {
        return ActivityModel.find()
            .populate('userId')
            .sort({ createdAt: -1 })
            .exec();
    }

    public async getActivitiesByWorkspace(workspaceId: string): Promise<IActivityModel[]> {
        return ActivityModel.find({ workspaceId })
            .populate('userId')
            .sort({ createdAt: -1 })
            .exec();
    }

    public async getActivitiesByBoard(boardId: string): Promise<IActivityModel[]> {
        return ActivityModel.find({ boardId })
            .populate('userId')
            .sort({ createdAt: -1 })
            .exec();
    }

    public async getActivitiesByUser(userId: string): Promise<IActivityModel[]> {
        return ActivityModel.find({ userId })
            .populate('userId')
            .sort({ createdAt: -1 })
            .exec();
    }

    public async addActivity(activity: IActivityModel): Promise<IActivityModel> {
        const newActivity = new ActivityModel(activity);
        return newActivity.save();
    }

    public async getRecentActivities(limit: number = 20): Promise<IActivityModel[]> {
        return ActivityModel.find()
            .populate('userId')
            .sort({ createdAt: -1 })
            .limit(limit)
            .exec();
    }
}

export const activityService = new ActivityService();