import { BoardModel, IBoardModel } from "../3-models/board-model";
import { NotFoundError } from "../3-models/error-models";
import { ITaskModel, TaskModel } from "../3-models/task-model";

class TaskService {

    public async getAllTasks(): Promise<ITaskModel[]> {
        return TaskModel.find()
            .populate('assignees')
            .populate('status', 'name')
            .exec();
    }

    public async getTaskById(_id: string): Promise<ITaskModel> {
        const task = await TaskModel.findById(_id)
            .populate('assignees')
            .populate('status', 'name')
            .exec();
        if (!task) throw new NotFoundError(`_id ${_id} not found`);
        return task;
    }

    public async getTasksByBoard(boardId: string): Promise<ITaskModel[]> {
        return TaskModel.find({ boardId })
            .populate('assignees')
            .populate('status', 'name')
            .exec();
    }

    public async getTasksByColumn(boardId: string, columnId: string): Promise<ITaskModel[]> {
        return TaskModel.find({
            boardId,
            status: columnId
        })
            .populate('assignees')
            .populate('status', 'name')
            .exec();
    }

    public async addTask(task: ITaskModel): Promise<ITaskModel> {

        // Verify that the column exists in the board
        const board = await BoardModel.findById(task.boardId);
        if (!board) throw new NotFoundError(`Board ${task.boardId} not found`);
        const columnExists = board.columns.some(col => col._id.toString() === task.status.toString());
        if (!columnExists) throw new NotFoundError(`Column ${task.status} not found in board ${task.boardId}`);

        return task.save();
    }

    public async updateTask(_id: string, task: Partial<ITaskModel>): Promise<ITaskModel> {
        // If status is being updated, verify the column exists
        if (task.status && task.boardId) {
            const board = await BoardModel.findById(task.boardId);
            if (!board) throw new NotFoundError(`Board ${task.boardId} not found`);
            const columnExists = board.columns.some(col => col._id.toString() === task.status.toString());
            if (!columnExists) throw new NotFoundError(`Column ${task.status} not found in board ${task.boardId}`);
        }

        const updatedTask = await TaskModel.findByIdAndUpdate(_id, task, {
            new: true,
            runValidators: true
        })
            .populate('assignees')
            .populate('status', 'name')
            .exec();
        if (!updatedTask) throw new NotFoundError(`_id ${_id} not found`);

        return updatedTask;
    }

    public async updateStatus(_id: string, columnId: string): Promise<ITaskModel> {
        // First get the task to check its board
        const task = await TaskModel.findById(_id);
        if (!task) throw new NotFoundError(`Task ${_id} not found`);

        // Verify the column exists in the board
        const board = await BoardModel.findById(task.boardId);
        if (!board) throw new NotFoundError(`Board ${task.boardId} not found`);

        const columnExists = board.columns.some(col => col._id.toString() === columnId);
        if (!columnExists) throw new NotFoundError(`Column ${columnId} not found in board ${task.boardId}`);

        const updatedTask = await TaskModel.findByIdAndUpdate(
            _id,
            { status: columnId },
            { new: true, runValidators: true }
        )
            .populate('assignees')
            .populate('status', 'name')
            .exec();

        if (!updatedTask) throw new NotFoundError(`_id ${_id} not found`);
        return updatedTask;
    }
    
    public async addAssignee(_id: string, userId: string): Promise<ITaskModel> {
        const updatedTask = await TaskModel.findByIdAndUpdate(
            _id,
            { $addToSet: { assignees: userId } },
            { new: true }
        ).populate('assignees').exec();
        if (!updatedTask) throw new NotFoundError(`_id ${_id} not found`);
        return updatedTask;
    }

    public async removeAssignee(_id: string, userId: string): Promise<ITaskModel> {
        const updatedTask = await TaskModel.findByIdAndUpdate(
            _id,
            { $pull: { assignees: userId } },
            { new: true }
        ).populate('assignees').exec();
        if (!updatedTask) throw new NotFoundError(`_id ${_id} not found`);
        return updatedTask;
    }

    public async deleteTask(_id: string): Promise<void> {
        const deletedTask = await TaskModel.findByIdAndDelete(_id).exec();
        if (!deletedTask) throw new NotFoundError(`_id ${_id} not found`);
    }

    // private async verifyBoard(boardId: string): Promise<IBoardModel> {
    //     const board = await BoardModel.findById(boardId);
    //     if (!board) throw new NotFoundError(`Board ${boardId} not found`);
    //     return board;
    // }

    // private async verifyColumnInBoard(boardId: string, columnId: string): Promise<void> {
    //     const board = await this.verifyBoard(boardId);
    //     const columnExists = board.columns.some(col => col._id.toString() === columnId.toString());
    //     if (!columnExists) throw new NotFoundError(`Column ${columnId} not found in board ${boardId}`);
    // }

    // private async verifyTask(_id: string): Promise<ITaskModel> {
    //     const task = await TaskModel.findById(_id);
    //     if (!task) throw new NotFoundError(`Task ${_id} not found`);
    //     return task;
    // }
}

export const taskService = new TaskService();