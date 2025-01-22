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



    public async addTaskToColumn(boardId: string, columnId: string, task: ITaskModel): Promise<ITaskModel> {

        // First save the task
        const savedTask = await task.save();

        // Add task ID to the column
        await BoardModel.findOneAndUpdate(
            {
                _id: boardId,
                "columns._id": columnId
            },
            {
                $push: { "columns.$.tasksId": savedTask._id }
            }
        ).exec();

        return savedTask;
    }

    public async moveTaskBetweenColumns(boardId: string, fromColumnId: string, toColumnId: string, taskId: string): Promise<void> {
       
        // Remove from old column and add to new column in one operation
        await BoardModel.findOneAndUpdate(
            { _id: boardId },
            {
                $pull: { "columns.$[from].tasksId": taskId },
                $push: { "columns.$[to].tasksId": taskId }
            },
            {
                arrayFilters: [
                    { "from._id": fromColumnId },
                    { "to._id": toColumnId }
                ]
            }
        ).exec();
    }

    // public async updateTask(_id: string, task: Partial<ITaskModel>): Promise<ITaskModel> {
    // }

    public async updateTask(
        boardId: string, 
        columnId: string,
        taskId: string, 
        task: Partial<ITaskModel> // Makes all properties of type T optional
    ): Promise<ITaskModel> {
        
        // Verify task exists in the specified column
        const board = await BoardModel.findOne({
            _id: boardId,
            "columns._id": columnId,
            "columns.tasksId": taskId
        });
        
        if (!board) {
            throw new NotFoundError(`Task ${taskId} not found in column ${columnId} of board ${boardId}`);
        }
    
        // Update the task
        const updatedTask = await TaskModel.findByIdAndUpdate(
            taskId,
            task,
            { 
                new: true,
                runValidators: true 
            }
        )
        .populate('assignees')
        .exec();
    
        if (!updatedTask) {
            throw new NotFoundError(`Task ${taskId} not found`);
        }
    
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

    public async deleteTaskFromColumn(boardId: string, columnId: string, taskId: string): Promise<void> {
        // Remove task from column
        await BoardModel.findOneAndUpdate(
            { _id: boardId, "columns._id": columnId },
            { $pull: { "columns.$.tasksId": taskId } }
        ).exec();

        // Delete the actual task
        await this.deleteTask(taskId);
    }

    private async deleteTask(_id: string): Promise<void> {
        const deletedTask = await TaskModel.findByIdAndDelete(_id).exec();
        if (!deletedTask) throw new NotFoundError(`_id ${_id} not found`);
    }

}

export const taskService = new TaskService();