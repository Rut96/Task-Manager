import { NotFoundError } from "../3-models/error-models";
import { IWorkspaceModel, WorkspaceModel } from "../3-models/workspace-model";

class WorkspaceService {

    public async getAllWorkspaces(): Promise<IWorkspaceModel[]> {
        return WorkspaceModel.find()
            .populate('owner')
            .populate('members.userId')
            .exec();
    }

    public async getWorkspaceById(_id: string): Promise<IWorkspaceModel> {
        const workspace = await WorkspaceModel.findById(_id)
            .populate('owner')
            .populate('members.userId')
            .exec();
        if (!workspace) throw new NotFoundError(`_id ${_id} not found`);
        return workspace;
    }

    public async getWorkspacesByUser(userId: string): Promise<IWorkspaceModel[]> {
        return WorkspaceModel.find({
            $or: [
                { owner: userId },
                { 'members.userId': userId }
            ]
        })
            .populate('owner')
            .populate('members.userId')
            .exec();
    }

    public async addWorkspace(workspace: IWorkspaceModel): Promise<IWorkspaceModel> {
        return workspace.save();
    }

    public async updateWorkspace(_id: string, workspace: Partial<IWorkspaceModel>): Promise<IWorkspaceModel> {
        const updatedWorkspace = await WorkspaceModel.findByIdAndUpdate(_id, workspace, { new: true })
            .populate('owner')
            .populate('members.userId')
            .exec();
        if (!updatedWorkspace) throw new NotFoundError(`_id ${_id} not found`);
        return updatedWorkspace;
    }

    public async deleteWorkspace(_id: string): Promise<void> {
        const deletedWorkspace = await WorkspaceModel.findByIdAndDelete(_id).exec();
        if (!deletedWorkspace) throw new NotFoundError(`_id ${_id} not found`);
    }

    public async addMember(_id: string, userId: string, role: 'admin' | 'member' = 'member'): Promise<IWorkspaceModel> {
        const updatedWorkspace = await WorkspaceModel.findByIdAndUpdate(
            _id,
            { $addToSet: { members: { userId, role } } },
            { new: true }
        )
            .populate('owner')
            .populate('members.userId')
            .exec();
        if (!updatedWorkspace) throw new NotFoundError(`_id ${_id} not found`);
        return updatedWorkspace;
    }

    public async removeMember(_id: string, userId: string): Promise<IWorkspaceModel> {
        const updatedWorkspace = await WorkspaceModel.findByIdAndUpdate(
            _id,
            { $pull: { members: { userId } } },
            { new: true }
        )
            .populate('owner')
            .populate('members.userId')
            .exec();
        if (!updatedWorkspace) throw new NotFoundError(`_id ${_id} not found`);
        return updatedWorkspace;
    }
}

export const workspaceService = new WorkspaceService();