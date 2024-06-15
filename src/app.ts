import "reflect-metadata";
import express from "express";
import {AppDataSource} from "./data-source";
import routes from "./routes";

AppDataSource.initialize().then(async () => {
    const app = express();

    app.use(express.json());
    app.use("/api", routes);

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}).catch(error => console.error(error));
