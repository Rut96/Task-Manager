import express, { NextFunction, Request, Response } from "express";
import { boardService } from "../4-services/borad-service";

class BoardController {
    public readonly router = express.Router();

    public constructor() {
        this.router.get("/boards", this.getAllBoards);
        this.router.get("/boards/:id", this.getOneBoard);
        this.router.get("/workspaces/:workspaceId/boards", this.getBoardsByWorkspace);
        this.router.post("/boards", this.addBoard);
        this.router.put("/boards/:id", this.updateBoard);
        this.router.delete("/boards/:id", this.deleteBoard);

        this.router.patch("/boards/:id/columns", this.updateColumns);

        this.router.get("/boards/:boardId/columns/:columnId/tasks", this.getColumnTasks);
        this.router.get("/boards/:boardId/tasks", this.getAllBoardTasks);
    }

    private async getAllBoards(req: Request, res: Response, next: NextFunction) {
        try {
            const boards = await boardService.getAllBoards();
            res.json(boards);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async getOneBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const board = await boardService.getBoardById(id);
            res.json(board);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async getBoardsByWorkspace(req: Request, res: Response, next: NextFunction) {
        try {
            const workspaceId = req.params.workspaceId;
            const boards = await boardService.getBoardsByWorkspace(workspaceId);
            res.json(boards);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async addBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const board = req.body;
            const addedBoard = await boardService.addBoard(board);
            res.status(201).json(addedBoard);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async updateBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const board = req.body;
            const updatedBoard = await boardService.updateBoard(id, board);
            res.json(updatedBoard);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async deleteBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            await boardService.deleteBoard(id);
            res.sendStatus(204);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async updateColumns(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const { columns } = req.body;
            const updatedBoard = await boardService.updateColumns(id, columns);
            res.json(updatedBoard);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async getColumnTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const { boardId, columnId } = req.params;
            const tasks = await boardService.getColumnTasks(boardId, columnId);
            res.json(tasks);
        }
        catch (err: any) {
            next(err);
        }
    }
    
    private async getAllBoardTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const { boardId } = req.params;
            const tasks = await boardService.getAllBoardTasks(boardId);
            res.json(tasks);
        }
        catch (err: any) {
            next(err);
        }
    }
}

export const boardController = new BoardController();