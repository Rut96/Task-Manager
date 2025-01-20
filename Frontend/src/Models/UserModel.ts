export class UserModel {
	public _id?: string;
    public email: string;
    public password: string;
    public fullName: string;
    public avatar?: string;
    public role: 'admin' | 'member';
    public workspaces: string[] = [];
    public createdAt?: Date;

}
