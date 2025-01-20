import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskModel } from "../Models/TaskModel";

// Init Tasks
export function initTasks(currentState: TaskModel[], action: PayloadAction<TaskModel[]>): TaskModel[] {
    return action.payload;
}

// Add Task
export function addTask(currentState: TaskModel[], action: PayloadAction<TaskModel>): TaskModel[] {
    const newState = [...currentState];
    newState.push(action.payload);
    return newState;
}

// Update Task
export function updateTask(currentState: TaskModel[], action: PayloadAction<TaskModel>): TaskModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(t => t._id === action.payload._id);
    if (index !== -1) {
        newState[index] = action.payload;
    }
    return newState;
}

// Delete Task
export function deleteTask(currentState: TaskModel[], action: PayloadAction<string>): TaskModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(t => t._id === action.payload);
    if (index !== -1) {
        newState.splice(index, 1);
    }
    return newState;
}

// Update Task Status
export function updateTaskStatus(currentState: TaskModel[], action: PayloadAction<{ taskId: string; status: string }>): TaskModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(t => t._id === action.payload.taskId);
    if (index !== -1) {
        newState[index] = {
            ...newState[index],
            status: action.payload.status
        };
    }
    return newState;
}

// Clear Tasks
export function clearTasks(currentState: TaskModel[], action: PayloadAction): TaskModel[] {
    return [];
}

export const taskSlice = createSlice({
    name: "tasks",
    initialState: [],
    reducers: { 
        initTasks, 
        addTask, 
        updateTask, 
        deleteTask, 
        updateTaskStatus, 
        clearTasks 
    }
});

export const taskActions = taskSlice.actions;