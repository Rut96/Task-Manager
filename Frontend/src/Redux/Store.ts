import { ActivityModel } from "../Models/ActivityModel";
import { BoardModel } from "../Models/BoardModel";
import { TaskModel } from "../Models/TaskModel";
import { UserModel } from "../Models/UserModel";
import { WorkspaceModel } from "../Models/WorkspaceModel";
import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "./TaskSlice";
import { workspaceSlice } from "./WorkspaceSlice";
import { boardSlice } from "./BoardSlice";
import { activitySlice } from "./ActivitySlice";
import { userSlice } from "./UserSlice";

export type AppState = {
    tasks: TaskModel[];
    workspaces: WorkspaceModel[];
    boards: BoardModel[];
    activities: ActivityModel[];
    user: UserModel;
};

export const store = configureStore<AppState>({
    reducer: {
        tasks: taskSlice.reducer,
        workspaces: workspaceSlice.reducer,
        boards: boardSlice.reducer,
        activities: activitySlice.reducer,
        user: userSlice.reducer
    }
});
