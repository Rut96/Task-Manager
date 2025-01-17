import { NotFoundError } from "../3-models/error-models";
import { ITaskModel, TaskModel } from "../3-models/task-model";

class TaskService {

    public async getAllTasks(): Promise<ITaskModel[]> {
        return TaskModel.find().populate('assignees').exec();
    }

    public async getTaskById(_id: string): Promise<ITaskModel> {
        const task = await TaskModel.findById(_id).populate('assignees').exec();
        if (!task) throw new NotFoundError(`_id ${_id} not found`);
        return task;
    }

    public async getTasksByBoard(boardId: string): Promise<ITaskModel[]> {
        return TaskModel.find({ boardId }).populate('assignees').exec();
    }

    public async addTask(task: ITaskModel): Promise<ITaskModel> {
        return task.save();
    }

    public async updateTask(_id: string, task: Partial<ITaskModel>): Promise<ITaskModel> {
        const updatedTask = await TaskModel.findByIdAndUpdate(_id, task, { new: true })
            .populate('assignees')
            .exec();
        if (!updatedTask) throw new NotFoundError(`_id ${_id} not found`);
        return updatedTask;
    }

    public async deleteTask(_id: string): Promise<void> {
        const deletedTask = await TaskModel.findByIdAndDelete(_id).exec();
        if (!deletedTask) throw new NotFoundError(`_id ${_id} not found`);
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

    public async updateStatus(_id: string, status: string): Promise<ITaskModel> {
        const updatedTask = await TaskModel.findByIdAndUpdate(
            _id,
            { status },
            { new: true }
        ).populate('assignees').exec();
        if (!updatedTask) throw new NotFoundError(`_id ${_id} not found`);
        return updatedTask;
    }
}

export const taskService = new TaskService();