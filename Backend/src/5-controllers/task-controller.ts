import express, { NextFunction, Request, Response } from "express";
import { taskService } from "../4-services/task-service";
import { TaskModel } from "../3-models/task-model";

class TaskController {
    public readonly router = express.Router();

    public constructor() {

        this.router.get("/tasks", this.getAllTasks);
        this.router.get("/tasks/:id", this.getOneTask);

        this.router.post("/boards/:boardId/columns/:columnId/tasks", this.addTaskToColumn);
        this.router.put("/boards/:boardId/columns/:columnId/tasks/:taskId", this.updateTask);
        this.router.delete("/boards/:boardId/columns/:columnId/tasks/:taskId", this.deleteTaskFromColumn);
        
        this.router.post("/tasks/:id/assignees", this.addAssignee);
        this.router.delete("/tasks/:id/assignees/:userId", this.removeAssignee);
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


    private async addTaskToColumn(req: Request, res: Response, next: NextFunction) {
        try {
            const { boardId, columnId } = req.params;
            const task = new TaskModel(req.body);
            const savedTask = await taskService.addTaskToColumn(boardId, columnId, task);
            res.json(savedTask);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async updateTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { boardId, columnId, taskId } = req.params;
            const task = req.body;
            const updatedTask = await taskService.updateTask(boardId, columnId, taskId, task);
            res.json(updatedTask);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async deleteTaskFromColumn(req: Request, res: Response, next: NextFunction) {
        try {
            const { boardId, columnId, taskId } = req.params;
            await taskService.deleteTaskFromColumn(boardId, columnId, taskId);
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


}

export const taskController = new TaskController();