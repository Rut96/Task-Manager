export interface Column {
    _id: string;
    name: string;
    order: number;
    color?: string; 
}

export class BoardModel {
	public _id?: string;
    public name: string;
    public workspaceId: string;
    public columns: Column[];
    public members: string[] = [];
    public createdBy: string;
    public createdAt?: Date;
}
