import mongoose, { Document, model, ObjectId, Schema } from "mongoose";

export interface IWorkspaceModel extends Document {
    name: string;
    description?: string;
    owner: ObjectId;
    members: {
        userId: ObjectId;
        role: 'admin' | 'member';
    }[];
    createdAt: Date;
}

export const WorkspaceSchema = new Schema<IWorkspaceModel>({
    name: {
        type: String,
        required: [true, "Missing workspace name."],
        minlength: [2, "Name too short"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    members: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
            required: true
        },
        role: {
            type: String,
            enum: ['admin', 'member'],
            default: 'member'
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

export const WorkspaceModel = model<IWorkspaceModel>("WorkspaceModel", WorkspaceSchema, "Workspaces");