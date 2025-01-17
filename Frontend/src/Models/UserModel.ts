export class UserModel {
	public _id?: string;
    public email: string;
    public password: string;
    public fullName: string;
    public avatar?: string;
    public role: 'admin' | 'member';
    public workspaces: string[] = [];
    public createdAt?: Date;

    // public constructor(user: UserModel) {
    //     this._id = user._id;
    //     this.email = user.email;
    //     this.password = user.password;
    //     this.fullName = user.fullName;
    //     this.avatar = user.avatar;
    //     this.role = user.role;
    //     this.workspaces = user.workspaces;
    //     this.createdAt = user.createdAt;
    // }
}
