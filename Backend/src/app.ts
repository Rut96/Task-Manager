import express, { Express } from "express";
import { appConfig } from "./2-utils/app-config";
import { dal } from "./2-utils/dal";
import { errorMiddleware } from "./6-middleware/error-middleware";
import { loggerMiddleware } from "./6-middleware/logger-middleware";
import { userController } from "./5-controllers/user-controller";
import { taskController } from "./5-controllers/task-controller";
import { boardController } from "./5-controllers/board-controller";
import { workspaceController } from "./5-controllers/workspace-controller";
import { activityController } from "./5-controllers/activity-controller";
import cors from "cors";

class App {

    private server: Express;

    public async start(): Promise<void> {

        // Create the server: 
        this.server = express();

        // Configure CORS  
        const corsOptions = {
            origin: "http://localhost:3000", 
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
            allowedHeaders: ["Content-Type", "Authorization"]
        };
        this.server.use(cors(corsOptions));

        // Tell express to create a request.body object from the body json:
        this.server.use(express.json());

        // Register custom middleware:
        this.server.use(loggerMiddleware.consoleLogRequest);

        // Connect controllers to the server:
        this.server.use("/api", userController.router, taskController.router, boardController.router, workspaceController.router, activityController.router);

        // Register route not found middleware: 
        this.server.use("*", errorMiddleware.routeNotFound);

        // Register catch-all middleware: 
        this.server.use(errorMiddleware.catchAll);

        // Connect to MongoDB once:
        await dal.connect();

        // Run server: 
        this.server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
    }

}

const app = new App();
app.start();

