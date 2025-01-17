import mongoose, { Document, model, ObjectId, Schema } from "mongoose";

export interface IUserModel extends Document {
    email: string;
    password: string;
    fullName: string;
    avatar?: string;
    role: 'admin' | 'member';
    workspaces: ObjectId[];
    createdAt: Date;
}

export const UserSchema = new Schema<IUserModel>({
    email: {
        type: String,
        required: [true, "Missing email."],
        unique: true,
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"]
    },
    password: {
        type: String,
        required: [true, "Missing password."],
        minlength: [6, "Password too short"],
        trim: true
    },
    fullName: {
        type: String,
        required: [true, "Missing full name."],
        minlength: [2, "Name too short"],
        trim: true
    },
    avatar: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
    },
    workspaces: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkspaceModel'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false, // Don't add a __v to added documents.
    toJSON: { virtuals: true }, // Convert to JSON any virtual field if requested from the database.
    id: false // Don't duplicate _id into id
});

export const UserModel = model<IUserModel>("UserModel", UserSchema, "Users");

