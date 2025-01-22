class AppConfig {
    private readonly baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:4000/";

    public readonly usersUrl = this.baseUrl + "api/users/";
    public readonly boardsUrl = this.baseUrl + "api/boards/";
    public readonly tasksUrl = this.baseUrl + "api/tasks/";
    public readonly workspacesUrl = this.baseUrl + "api/workspaces/";
    public readonly activitiesUrl = this.baseUrl + "api/activities/";

    public readonly userLoginUrl = this.baseUrl + "api/users/login/";
    public readonly userRegisterUrl = this.baseUrl + "api/users/register/";
    public readonly recentActivitiesUrl = this.baseUrl + "api/activities/recent/";

    // public getActivitiesByBoard(boardId: string): string {
    //     return `${this.baseUrl}api/boards/${boardId}/workspaceId/`;
    // }

    // public getWorkspaceBoardsUrl(workspaceId: string): string {
    //     return `${this.baseUrl}api/workspaces/${workspaceId}/boards/`;
    // }

    // public getWorkspaceActivitiesUrl(workspaceId: string): string {
    //     return `${this.baseUrl}api/workspaces/${workspaceId}/activities/`;
    // }

    // public getUserActivitiesUrl(userId: string): string {
    //     return `${this.baseUrl}api/users/${userId}/activities/`;
    // }
}

export const appConfig = new AppConfig();