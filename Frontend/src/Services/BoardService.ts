import axios from "axios";
import { BoardModel } from "../Models/BoardModel";
import { appConfig } from "../Utils/AppConfig";

class BoardService {

    public async getAllBoards(): Promise<BoardModel[]> {
        const response = await axios.get(appConfig.boardsUrl);
        const boards = response.data;
        return boards;
    }

    public async getOneBoard(boardId: string): Promise<BoardModel> {
        const response = await axios.get(appConfig.boardsUrl + boardId);
        const boards = response.data;
        return boards;
    }

    public async getBoardsByWorkspace(workspaceId: string): Promise<BoardModel[]> {
        const response = await axios.get(appConfig.getWorkspaceBoardsUrl(workspaceId));
        const boards = response.data;
        return boards;
    }

    public async addBoard(board: BoardModel): Promise<BoardModel> {
        const response = await axios.post(appConfig.boardsUrl, board);
        const dbBoard = response.data;
        return dbBoard;
    }

    public async updateBoard(board: BoardModel): Promise<BoardModel> {
        const response = await axios.put(appConfig.boardsUrl + board._id, board);
        const dbBoard = response.data;
        return dbBoard;
    }
    
    public async deleteBoard(boardId: string): Promise<void> {
        await axios.put(appConfig.boardsUrl + boardId);
    }

    public async updateColumns(boardId: string, columns: { name: string; order: number; }[]): Promise<BoardModel> {
        const response = await axios.put(`${appConfig.boardsUrl}/${boardId}`,{ columns });
        const dbBoard = response.data;
        return dbBoard;
    }

}

export const boardService = new BoardService();
