import express, { NextFunction, Request, Response } from "express";
import { taskService } from "../4-services/task-service";

class TaskController {
    public readonly router = express.Router();

    public constructor() {
        this.router.get("/tasks", this.getAllTasks);
        this.router.get("/tasks/:id", this.getOneTask);
        this.router.get("/boards/:boardId/tasks", this.getTasksByBoard);
        this.router.post("/tasks", this.addTask);
        this.router.put("/tasks/:id", this.updateTask);
        this.router.delete("/tasks/:id", this.deleteTask);
        
        this.router.post("/tasks/:id/assignees", this.addAssignee);
        this.router.delete("/tasks/:id/assignees/:userId", this.removeAssignee);
        this.router.patch("/tasks/:id/status", this.updateStatus);
    }

    private async getAllTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const tasks = await taskService.getAllTasks();
            res.json(tasks);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async getOneTask(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const task = await taskService.getTaskById(id);
            res.json(task);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async getTasksByBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const boardId = req.params.boardId;
            const tasks = await taskService.getTasksByBoard(boardId);
            res.json(tasks);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async addTask(req: Request, res: Response, next: NextFunction) {
        try {
            const task = req.body;
            const addedTask = await taskService.addTask(task);
            res.status(201).json(addedTask);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async updateTask(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const task = req.body;
            const updatedTask = await taskService.updateTask(id, task);
            res.json(updatedTask);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            await taskService.deleteTask(id);
            res.sendStatus(204);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async addAssignee(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const { userId } = req.body;
            const updatedTask = await taskService.addAssignee(id, userId);
            res.json(updatedTask);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async removeAssignee(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, userId } = req.params;
            const updatedTask = await taskService.removeAssignee(id, userId);
            res.json(updatedTask);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async updateStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const { status } = req.body;
            const updatedTask = await taskService.updateStatus(id, status);
            res.json(updatedTask);
        }
        catch (err: any) {
            next(err);
        }
    }
}

export const taskController = new TaskController();