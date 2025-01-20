export class WorkspaceModel {
    public _id?: string;
    public name: string;
    public description?: string;
    public owner: string;
    public members: { userId: string; role: 'admin' | 'member'; }[] = [];
    public createdAt?: Date;

}
 