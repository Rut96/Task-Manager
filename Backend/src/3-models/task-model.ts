import mongoose, { Document, model, ObjectId, Schema } from "mongoose";

export interface ITaskModel extends Document {
    title: string;
    description?: string;
    status: 'backlog' | 'todo' | 'in_progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    assignees: ObjectId[];
    dueDate?: Date;
    workspaceId: ObjectId;
    boardId: ObjectId;
    attachments: { name: string; url: string; }[];
    comments: { userId: ObjectId; content: string; createdAt: Date; }[];
    labels: string[];
    createdBy: ObjectId;
    createdAt: Date;
}

export const TaskSchema = new Schema<ITaskModel>({
    title: {
        type: String,
        required: [true, "Missing title."],
        minlength: [2, "Title too short"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['backlog', 'todo', 'in_progress', 'done'],
        default: 'todo',
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    assignees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }],
    dueDate: {
        type: Date
    },
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkspaceModel',
        required: true
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BoardModel',
        required: true
    },
    attachments: [{
        name: String,
        url: String
    }],
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
            required: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    labels: [String],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

export const TaskModel = model<ITaskModel>("TaskModel", TaskSchema, "Tasks");