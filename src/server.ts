import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app: express.Application = express();
const address: string = "127.0.0.1:3000";

const corsOptions = {
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

import apiRoutes from "./routes/api";
import errorHandler from "./middleware/errorHandler";

/* App Routes */
app.use("/api", apiRoutes);
app.use(errorHandler);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
