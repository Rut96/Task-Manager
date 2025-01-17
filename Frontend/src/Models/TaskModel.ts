export class TaskModel {
    public _id?: string;
    public title: string;
    public description?: string;
    public status: 'backlog' | 'todo' | 'in_progress' | 'done';
    public priority: 'low' | 'medium' | 'high';
    public assignees: string[] = [];
    public dueDate?: Date;
    public workspaceId: string;
    public boardId: string;
    public attachments: { name: string; url: string; }[] = [];
    public comments: { userId: string; content: string; createdAt: Date; }[] = [];
    public labels: string[] = [];
    public createdBy: string;
    public createdAt?: Date;
}
