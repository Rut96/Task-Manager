import mongoose, { Document, model, ObjectId, Schema } from "mongoose";

export interface IActivityModel extends Document {
    userId: ObjectId;
    action: string;
    taskId?: ObjectId;
    boardId?: ObjectId;
    workspaceId: ObjectId;
    details?: Record<string, any>;
    createdAt: Date;
}

export const ActivitySchema = new Schema<IActivityModel>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    action: {
        type: String,
        required: [true, "Missing action description."],
        trim: true
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskModel'
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BoardModel'
    },
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkspaceModel',
        required: true
    },
    details: {
        type: Schema.Types.Mixed
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

export const ActivityModel = model<IActivityModel>("ActivityModel", ActivitySchema, "Activities");