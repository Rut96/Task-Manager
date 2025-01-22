import axios from "axios";
import { BoardModel } from "../Models/BoardModel";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../Redux/Store";
import { boardActions } from "../Redux/BoardSlice";
import { TaskModel } from "../Models/TaskModel";

class BoardService {

    public async getAllBoards(): Promise<BoardModel[]> {
        const response = await axios.get(appConfig.boardsUrl);
        const boards = response.data;

        const action = boardActions.initBoards(boards);
        store.dispatch(action);
        console.log('boards', boards);
        return boards;
    }

    public async getOneBoard(boardId: string): Promise<BoardModel> {
        const response = await axios.get(appConfig.boardsUrl + boardId);
        const boards = response.data;
        // Don't need to update the entire boards array for a single board
        return boards;
    }

    public async getBoardsByWorkspace(workspaceId: string): Promise<BoardModel[]> {
        const response = await axios.get(`${appConfig.workspacesUrl}${workspaceId}/boards`);
        const boards = response.data;

        const action = boardActions.initBoards(boards);
        store.dispatch(action);

        return boards;
    }

    public async addBoard(board: BoardModel): Promise<BoardModel> {
        const response = await axios.post(appConfig.boardsUrl, board);
        const dbBoard = response.data;

        const action = boardActions.addBoard(dbBoard);
        store.dispatch(action);

        return dbBoard;
    }

    public async updateBoard(board: BoardModel): Promise<BoardModel> {
        const response = await axios.put(appConfig.boardsUrl + board._id, board);
        const dbBoard = response.data;

        const action = boardActions.updateBoard(dbBoard);
        store.dispatch(action);

        return dbBoard;
    }

    public async deleteBoard(boardId: string): Promise<void> {
        await axios.delete(appConfig.boardsUrl + boardId);

        const action = boardActions.deleteBoard(boardId);
        store.dispatch(action);
    }

    // public async updateColumns(boardId: string, columns: { name: string; order: number; tasksId?: string[]; }[]): Promise<BoardModel> {
    //     const response = await axios.patch(`${appConfig.boardsUrl}/${boardId}`, { columns });
    //     const dbBoard = response.data;

    //     const action = boardActions.updateBoardColumns({
    //         boardId: boardId,
    //         columns: dbBoard.columns
    //     });
    //     store.dispatch(action);

    //     return dbBoard;
    // }

    public async updateColumns(boardId: string, columns: { name: string; order: number; tasksId?: string[]; }[]): Promise<BoardModel> {
        const response = await axios.patch(`${appConfig.boardsUrl}${boardId}/columns`, { columns });
        const dbBoard = response.data;

        store.dispatch(boardActions.updateBoardColumns({
            boardId,
            columns: dbBoard.columns
        }));

        return dbBoard;
    }

    public async getColumnTasks(boardId: string, columnId: string): Promise<TaskModel[]> {
        const response = await axios.get(`${appConfig.boardsUrl}${boardId}/columns/${columnId}/tasks`);
        return response.data;
    }

    public async getAllBoardTasks(boardId: string): Promise<TaskModel[]> {
        const response = await axios.get(`${appConfig.boardsUrl}${boardId}/tasks`);
        const boardTasks = response.data;
        return boardTasks;
    }

}

export const boardService = new BoardService();
