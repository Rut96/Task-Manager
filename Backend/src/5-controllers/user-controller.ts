import express, { NextFunction, Request, Response } from "express";
import { userService } from "../4-services/user-service";

class UserController {
    public readonly router = express.Router();

    public constructor() {
        this.router.get("/users", this.getAllUsers);
        this.router.get("/users/:id", this.getOneUser);
        this.router.put("/users/:id", this.updateUser);
        this.router.delete("/users/:id", this.deleteUser);
        this.router.get("/users/email/:email", this.getUserByEmail);

        this.router.post("/users/register", this.register);
        this.router.post("/users/login", this.login);
    }

    private async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async getOneUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const user = await userService.getUserById(id);
            res.json(user);
        }
        catch (err: any) {
            next(err);
        }
    }


    private async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body;
            const addedUser = await userService.register(user);
            res.status(201).json(addedUser);
        }
        catch (err: any) {
            next(err);
        }
    }
    
    private async login(req: Request, res: Response, next: NextFunction) {
        try {
            const credentials = req.body;
            const user = await userService.login(credentials);
            res.json(user);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const user = req.body;
            const updatedUser = await userService.updateUser(id, user);
            res.json(updatedUser);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            await userService.deleteUser(id);
            res.sendStatus(204);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.params.email;
            const user = await userService.getUserByEmail(email);
            res.json(user);
        }
        catch (err: any) {
            next(err);
        }
    }
}

export const userController = new UserController();