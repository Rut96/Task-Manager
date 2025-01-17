import dotenv from "dotenv";
dotenv.config();

class AppConfig {
    public readonly port = 4000;
    public readonly mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;
}

export const appConfig = new AppConfig();
