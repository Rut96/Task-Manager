import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardModel, Column } from "../Models/BoardModel";

// Init Boards
export function initBoards(currentState: BoardModel[], action: PayloadAction<BoardModel[]>): BoardModel[] {
    return action.payload;
}

// Add Board
export function addBoard(currentState: BoardModel[], action: PayloadAction<BoardModel>): BoardModel[] {
    const newState = [...currentState];
    newState.push(action.payload);
    return newState;
}

// Update Board
export function updateBoard(currentState: BoardModel[], action: PayloadAction<BoardModel>): BoardModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(b => b._id === action.payload._id);
    if (index !== -1) {
        newState[index] = action.payload;
    }
    return newState;
}

// Delete Board
export function deleteBoard(currentState: BoardModel[], action: PayloadAction<string>): BoardModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(b => b._id === action.payload);
    if (index !== -1) {
        newState.splice(index, 1);
    }
    return newState;
}

// Update Board Columns
export function updateBoardColumns(
    currentState: BoardModel[], 
    action: PayloadAction<{ boardId: string; columns: Column[] }>  
): BoardModel[] {
    const newState = [...currentState];
    const index = newState.findIndex(b => b._id === action.payload.boardId);
    if (index !== -1) {
        newState[index] = {
            ...newState[index],
            columns: action.payload.columns
        };
    }
    return newState;
}

// Clear Boards
export function clearBoards(currentState: BoardModel[], action: PayloadAction): BoardModel[] {
    return [];
}

export const boardSlice = createSlice({
    name: "boards",
    initialState: [],
    reducers: { 
        initBoards, 
        addBoard, 
        updateBoard, 
        deleteBoard, 
        updateBoardColumns, 
        clearBoards 
    }
});

export const boardActions = boardSlice.actions;