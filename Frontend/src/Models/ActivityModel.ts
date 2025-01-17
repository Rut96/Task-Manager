export class ActivityModel {
	public _id?: string;
    public userId: string;
    public action: string;
    public taskId?: string;
    public boardId?: string;
    public workspaceId: string;
    public details?: Record<string, any>;
    public createdAt?: Date;

    // public constructor(activity: ActivityModel) {
    //     this._id = activity._id;
    //     this.userId = activity.userId;
    //     this.action = activity.action;
    //     this.taskId = activity.taskId;
    //     this.boardId = activity.boardId;
    //     this.workspaceId = activity.workspaceId;
    //     this.details = activity.details;
    //     this.createdAt = activity.createdAt;
    // }
}
