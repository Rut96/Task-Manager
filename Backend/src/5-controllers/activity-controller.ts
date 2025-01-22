import express, { NextFunction, Request, Response } from "express";
import { activityService } from "../4-services/activity-service";

class ActivityController {
    public readonly router = express.Router();

    public constructor() {
        this.router.get("/activities", this.getAllActivities);
        this.router.get("/activities/recent", this.getRecentActivities);
        this.router.get("/workspaces/:workspaceId/activities", this.getActivitiesByWorkspace);
        this.router.get("/boards/:boardId/activities", this.getActivitiesByBoard);
        this.router.get("/users/:userId/activities", this.getActivitiesByUser);
    }

    private async getAllActivities(req: Request, res: Response, next: NextFunction) {
        try {
            const activities = await activityService.getAllActivities();
            res.json(activities);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async getRecentActivities(req: Request, res: Response, next: NextFunction) {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
            const activities = await activityService.getRecentActivities(limit);
            res.json(activities);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async getActivitiesByWorkspace(req: Request, res: Response, next: NextFunction) {
        try {
            const workspaceId = req.params.workspaceId;
            const activities = await activityService.getActivitiesByWorkspace(workspaceId);
            res.json(activities);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async getActivitiesByBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const boardId = req.params.boardId;
            const activities = await activityService.getActivitiesByBoard(boardId);
            res.json(activities);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async getActivitiesByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const activities = await activityService.getActivitiesByUser(userId);
            res.json(activities);
        }
        catch (err: any) {
            next(err);
        }
    }
}

export const activityController = new ActivityController();