import { Document, model, Schema } from "mongoose";

// 1. Interface
export interface ICredentialsModel extends Document {
    email: string;
    password: string;
}

// 2. Schema
export const CredentialsSchema = new Schema<ICredentialsModel>({
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
    }
}, {
    versionKey: false,
    id: false
});

// 3. Model
export const CredentialsModel = model<ICredentialsModel>("CredentialsModel", CredentialsSchema, "Credentials");