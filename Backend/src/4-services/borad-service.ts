import { BoardModel, IBoardModel } from "../3-models/board-model";
import { NotFoundError } from "../3-models/error-models";

class BoardService {

    public async getAllBoards(): Promise<IBoardModel[]> {
        return BoardModel.find()
            .populate('members')
            .populate('createdBy')
            .exec();
    }

    public async getBoardById(_id: string): Promise<IBoardModel> {
        const board = await BoardModel.findById(_id)
            .populate('members')
            .populate('createdBy')
            .exec();
        if (!board) throw new NotFoundError(`_id ${_id} not found`);
        return board;
    }

    public async getBoardsByWorkspace(workspaceId: string): Promise<IBoardModel[]> {
        return BoardModel.find({ workspaceId })
            .populate('members')
            .populate('createdBy')
            .exec();
    }

    public async addBoard(board: IBoardModel): Promise<IBoardModel> {
        return board.save();
    }

    public async updateBoard(_id: string, board: Partial<IBoardModel>): Promise<IBoardModel> {
        const updatedBoard = await BoardModel.findByIdAndUpdate(_id, board, { new: true })
            .populate('members')
            .populate('createdBy')
            .exec();
        if (!updatedBoard) throw new NotFoundError(`_id ${_id} not found`);
        return updatedBoard;
    }

    public async deleteBoard(_id: string): Promise<void> {
        const deletedBoard = await BoardModel.findByIdAndDelete(_id).exec();
        if (!deletedBoard) throw new NotFoundError(`_id ${_id} not found`);
    }

    public async updateColumns(_id: string, columns: { name: string; order: number; }[]): Promise<IBoardModel> {
        const updatedBoard = await BoardModel.findByIdAndUpdate(
            _id,
            { columns },
            { new: true }
        ).populate('members').populate('createdBy').exec();
        if (!updatedBoard) throw new NotFoundError(`_id ${_id} not found`);
        return updatedBoard;
    }
}

export const boardService = new BoardService();