import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

// Init user
export function initUser(currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    return action.payload;
}

// Update user
export function updateUser(currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    return action.payload;
}

// Logout user
export function logoutUser(currentState: UserModel, action: PayloadAction): UserModel {
    return null;
}

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: { 
        initUser, 
        updateUser, 
        logoutUser 
    }
});

export const userActions = userSlice.actions;