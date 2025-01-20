// src/store/ActivitySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivityModel } from "../Models/ActivityModel";

// Init Activities
export function initActivities(currentState: ActivityModel[], action: PayloadAction<ActivityModel[]>): ActivityModel[] {
    return action.payload;
}

// Add Activity
export function addActivity(currentState: ActivityModel[], action: PayloadAction<ActivityModel>): ActivityModel[] {
    const newState = [...currentState];
    newState.push(action.payload);
    return newState;
}

// Clear Activities
export function clearActivities(currentState: ActivityModel[], action: PayloadAction): ActivityModel[] {
    return [];
}

// Set Recent Activities
export function setRecentActivities(currentState: ActivityModel[], action: PayloadAction<ActivityModel[]>): ActivityModel[] {
    return action.payload;
}

export const activitySlice = createSlice({
    name: "activities",
    initialState: [],
    reducers: { 
        initActivities, 
        addActivity, 
        clearActivities, 
        setRecentActivities 
    }
});

export const activityActions = activitySlice.actions;