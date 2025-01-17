export class WorkspaceModel {
    public _id?: string;
    public name: string;
    public description?: string;
    public owner: string;
    public members: { userId: string; role: 'admin' | 'member'; }[] = [];
    public createdAt?: Date;

    // public constructor(workspace: WorkspaceModel) {
    //     this._id = workspace._id;
    //     this.name = workspace.name;
    //     this.description = workspace.description;
    //     this.owner = workspace.owner;
    //     this.members = workspace.members;
    //     this.createdAt = workspace.createdAt;
    // }
}
