import axios from "axios";
import { UserModel } from "../Models/UserModel";
import { appConfig } from "../Utils/AppConfig";
import { CredentialsModel } from "../Models/CredentialsModel";

class UserService {

    public async getAllUsers(): Promise<UserModel[]> {
        const response = await axios.get(appConfig.usersUrl);
        const users = response.data;
        return users;
    }

    public async getOneUser(userId: string): Promise<UserModel> {
        const response = await axios.get(appConfig.usersUrl + userId);
        const user = response.data;
        return user;
    }

    public async register(user: UserModel): Promise<UserModel> {
        const response = await axios.post(`${appConfig.usersUrl}/register`, user);
        const dbUser = response.data;
        return dbUser;
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post(`${appConfig.usersUrl}/login`, credentials);
        const dbUser = response.data;
        return dbUser;
    }

    public async updateUser(user: UserModel): Promise<UserModel> {
        const response = await axios.put(appConfig.usersUrl + user._id, user);
        const dbUser = response.data;
        return dbUser;
    }

    public async deleteUser(userId: string): Promise<void> {
        await axios.delete(appConfig.usersUrl + userId);
    }

    public async getUserByEmail(email: UserModel): Promise<UserModel> {
        const response = await axios.put(`${appConfig.usersUrl}/email/${email}`);
        const dbUser = response.data;
        return dbUser;
    }



}

export const userService = new UserService();
