import { createHash } from "crypto";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../3-models/error-models";
import { IUserModel, UserModel } from "../3-models/user-model";
import { CredentialsModel, ICredentialsModel } from "../3-models/credentials-model";

class UserService {

    public async getAllUsers(): Promise<IUserModel[]> {
        return UserModel.find().exec();
    }

    public async getUserById(_id: string): Promise<IUserModel> {
        const user = await UserModel.findById(_id).exec();
        if (!user) throw new NotFoundError(`_id ${_id} not found`);
        return user;
    }

    public async getUserByEmail(email: string): Promise<IUserModel> {
        const user = await UserModel.findOne({ email }).exec();
        if (!user) throw new NotFoundError(`Email ${email} not found`);
        return user;
    }

    // public async register(user: IUserModel): Promise<IUserModel> {
    //     const existingUser = await UserModel.findOne({ email: user.email }).exec();
    //     if (existingUser) {
    //         throw new NotFoundError(`Email ${user.email} already exists`);
    //     }
    //     user.password = this.hashPassword(user.password);
    //     return user.save();
    // }

    // public async login(email: string, password: string): Promise<IUserModel> {
    //     const user = await this.getUserByEmail(email);
    //     const hashedPassword = this.hashPassword(password);

    //     if (user.password !== hashedPassword) {
    //         throw new Error("Incorrect password");
    //     }

    //     return user;
    // }

    public async login(credentials: ICredentialsModel): Promise<IUserModel> {
        // Get user by email
        const user = await UserModel.findOne({ email: credentials.email }).exec();
        if (!user) throw new NotFoundError(`Email ${credentials.email} not found`);

        // Validate password
        const hashedPassword = this.hashPassword(credentials.password);
        if (user.password !== hashedPassword) {
            throw new UnauthorizedError("Incorrect password");
        }

        return user;
    }


    public async register(user: IUserModel): Promise<IUserModel> {
        // Validate email doesn't exist
        const existingUser = await UserModel.findOne({ email: user.email }).exec();
        if (existingUser) {
            throw new BadRequestError(`Email ${user.email} already exists`);
        }

        // Create new user
        const newUser = new UserModel(user);

        // Validate model
        BadRequestError.validateSync(newUser);

        // Hash password and save
        newUser.password = this.hashPassword(newUser.password);
        return newUser.save();
    }

    
    public async updateUser(_id: string, user: Partial<IUserModel>): Promise<IUserModel> {
        if (user.password) {
            user.password = this.hashPassword(user.password);
        }
        const updatedUser = await UserModel.findByIdAndUpdate(_id, user, { new: true }).exec();
        if (!updatedUser) throw new NotFoundError(`_id ${_id} not found`);
        return updatedUser;
    }

    public async deleteUser(_id: string): Promise<void> {
        const deletedUser = await UserModel.findByIdAndDelete(_id).exec();
        if (!deletedUser) throw new NotFoundError(`_id ${_id} not found`);
    }

    private hashPassword(password: string): string {
        return createHash("sha256").update(password).digest("hex");
    }
}

export const userService = new UserService();