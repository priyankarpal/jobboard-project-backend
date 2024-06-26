import bodyParser from 'body-parser';
import "dotenv/config";
import express, { Application } from 'express';
import { limiter } from '../src/middleware/ratelimit';
import routes from "./routes/routes";

const app: Application = express();

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use("/", limiter);

app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).json({ message: "Hello World!" });
});

app.listen(process.env.PORT!, () => {
    console.log(`Server running on localhost:${process.env.PORT}`);
});