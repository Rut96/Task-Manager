import mongoose, { ObjectId } from "mongoose";
import { BoardModel, IBoardModel } from "../3-models/board-model";
import { NotFoundError } from "../3-models/error-models";
import { ITaskModel, TaskModel } from "../3-models/task-model";

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

    public async getColumnTasks(boardId: string, columnId: string): Promise<ITaskModel[]> {

        const board = await BoardModel.findOne(
            { _id: boardId, "columns._id": columnId },
            { "columns.$": 1 }
        ).exec();

        if (!board || !board.columns[0]) {
            throw new NotFoundError(`Column ${columnId} not found in board ${boardId}`);
        }

        return TaskModel.find({ _id: { $in: board.columns[0].tasksId } })
            .populate('assignees')
            .exec();
    }

    public async getAllBoardTasks(boardId: string): Promise<Record<string, ITaskModel[]>> { // Creates an object type with keys of type string and values of type ITaskModel[]
        const board = await BoardModel.findById(boardId).exec();
        if (!board) throw new NotFoundError(`Board ${boardId} not found`);

        const result: Record<string, ITaskModel[]> = {};

        for (const column of board.columns) {
            result[column._id.toString()] = await TaskModel.find({
                _id: { $in: column.tasksId }
            })
                .populate('assignees')
                .exec();
        }

        return result;
    }
    
    public async updateColumns(_id: string, columns: { 
        name: string; 
        order: number;
        tasksId?: ObjectId[];
    }[]): Promise<IBoardModel> {
        const board = await BoardModel.findById(_id);
        if (!board) throw new NotFoundError(`Board ${_id} not found`);
    
        // Preserve existing tasksId if not provided in update
        const updatedColumns = columns.map(newCol => {
            const existingCol = board.columns.find(col => col.name === newCol.name);
            return {
                _id: existingCol?._id || new mongoose.Types.ObjectId(),
                name: newCol.name,
                order: newCol.order,
                tasksId: newCol.tasksId || existingCol?.tasksId || []
            };
        });
    
        const updatedBoard = await BoardModel.findByIdAndUpdate(
            _id,
            { columns: updatedColumns },
            { new: true }
        )
        .populate('members')
        .populate('createdBy')
        .exec();
    
        if (!updatedBoard) throw new NotFoundError(`Board ${_id} not found`);
        return updatedBoard;
    }
}

export const boardService = new BoardService();