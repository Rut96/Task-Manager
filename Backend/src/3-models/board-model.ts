import mongoose, { Document, model, ObjectId, Schema } from "mongoose";

export interface IBoardModel extends Document {
    name: string;
    workspaceId: ObjectId;
    columns: {
        _id: ObjectId;
        name: string;
        tasksId: ObjectId[];
        order: number;
    }[];
    members: ObjectId[];
    createdBy: ObjectId;
    createdAt: Date;
}

export const BoardSchema = new Schema<IBoardModel>({
    name: {
        type: String,
        required: [true, "Missing board name."],
        minlength: [2, "Name too short"],
        trim: true
    },
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkspaceModel',
        required: true
    },
    columns: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        tasksId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TypeModel',
        }],
        order: {
            type: Number,
            required: true
        }
    }],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }],
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

export const BoardModel = model<IBoardModel>("BoardModel", BoardSchema, "Boards");