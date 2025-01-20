export class ActivityModel {
	public _id?: string;
    public userId: string;
    public action: string;
    public taskId?: string;
    public boardId?: string;
    public workspaceId: string;
    public details?: Record<string, any>;
    public createdAt?: Date;

}
