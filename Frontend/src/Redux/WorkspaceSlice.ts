// src/store/WorkspaceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkspaceModel } from "../Models/WorkspaceModel";

// Init Workspaces
export function initWorkspaces(currentState: WorkspaceModel[], action: PayloadAction<WorkspaceModel[]>): WorkspaceModel[] {
    return action.payload;
}

// Add Workspace
export function addWorkspace(currentState: WorkspaceModel[], action: PayloadAction<WorkspaceModel>): WorkspaceModel[] {
    const newState = [...currentState];
    newState.push(action.payload);
    return newState;
}

// Update Workspace
export function updateWorkspace(currentState: WorkspaceModel[], action: PayloadAction<WorkspaceModel>): WorkspaceModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(w => w._id === action.payload._id);
    if (index !== -1) {
        newState[index] = action.payload;
    }
    return newState;
}

// Delete Workspace
export function deleteWorkspace(currentState: WorkspaceModel[], action: PayloadAction<string>): WorkspaceModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(w => w._id === action.payload);
    if (index !== -1) {
        newState.splice(index, 1);
    }
    return newState;
}

// Add Workspace Member
export function addWorkspaceMember(
    currentState: WorkspaceModel[], 
    action: PayloadAction<{ workspaceId: string; userId: string; role: 'admin' | 'member' }>
): WorkspaceModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(w => w._id === action.payload.workspaceId);
    if (index !== -1) {
        newState[index] = {
            ...newState[index],
            members: [...newState[index].members, { userId: action.payload.userId, role: action.payload.role }]
        };
    }
    return newState;
}

// Remove Workspace Member
export function removeWorkspaceMember(
    currentState: WorkspaceModel[], 
    action: PayloadAction<{ workspaceId: string; userId: string }>
): WorkspaceModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(w => w._id === action.payload.workspaceId);
    if (index !== -1) {
        newState[index] = {
            ...newState[index],
            members: newState[index].members.filter(m => m.userId !== action.payload.userId)
        };
    }
    return newState;
}

// Clear Workspaces
export function clearWorkspaces(currentState: WorkspaceModel[], action: PayloadAction): WorkspaceModel[] {
    return [];
}

export const workspaceSlice = createSlice({
    name: "workspaces",
    initialState: [],
    reducers: { 
        initWorkspaces, 
        addWorkspace, 
        updateWorkspace, 
        deleteWorkspace, 
        addWorkspaceMember, 
        removeWorkspaceMember, 
        clearWorkspaces 
    }
});

export const workspaceActions = workspaceSlice.actions;