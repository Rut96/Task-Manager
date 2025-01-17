interface Column {
    name: string;
    order: number;
    color?: string; 
}

export class BoardModel {
	public _id?: string;
    public name: string;
    public workspaceId: string;
    // public columns: { name: string; order: number; }[] = [];
    public columns: Column[];
    public members: string[] = [];
    public createdBy: string;
    public createdAt?: Date;
}
