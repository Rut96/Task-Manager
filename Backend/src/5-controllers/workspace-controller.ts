import express, { NextFunction, Request, Response } from "express";
import { workspaceService } from "../4-services/workspace-service";

class WorkspaceController {
    public readonly router = express.Router();

    public constructor() {
        this.router.get("/workspaces", this.getAllWorkspaces);
        this.router.get("/workspaces/:id", this.getOneWorkspace);
        this.router.get("/users/:userId/workspaces", this.getWorkspacesByUser);
        this.router.post("/workspaces", this.addWorkspace);
        this.router.put("/workspaces/:id", this.updateWorkspace);
        this.router.delete("/workspaces/:id", this.deleteWorkspace);
        this.router.post("/workspaces/:id/members", this.addMember);
        this.router.delete("/workspaces/:id/members/:userId", this.removeMember);
    }

    private async getAllWorkspaces(req: Request, res: Response, next: NextFunction) {
        try {
            const workspaces = await workspaceService.getAllWorkspaces();
            res.json(workspaces);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async getOneWorkspace(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const workspace = await workspaceService.getWorkspaceById(id);
            res.json(workspace);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async getWorkspacesByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const workspaces = await workspaceService.getWorkspacesByUser(userId);
            res.json(workspaces);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async addWorkspace(req: Request, res: Response, next: NextFunction) {
        try {
            const workspace = req.body;
            const addedWorkspace = await workspaceService.addWorkspace(workspace);
            res.status(201).json(addedWorkspace);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async updateWorkspace(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const workspace = req.body;
            const updatedWorkspace = await workspaceService.updateWorkspace(id, workspace);
            res.json(updatedWorkspace);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async deleteWorkspace(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            await workspaceService.deleteWorkspace(id);
            res.sendStatus(204);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async addMember(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const { userId, role } = req.body;
            const updatedWorkspace = await workspaceService.addMember(id, userId, role);
            res.json(updatedWorkspace);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async removeMember(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, userId } = req.params;
            const updatedWorkspace = await workspaceService.removeMember(id, userId);
            res.json(updatedWorkspace);
        }
        catch (err: any) {
            next(err);
        }
    }
}

export const workspaceController = new WorkspaceController();