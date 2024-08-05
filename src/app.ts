import express from "express";
import connectMongoDB from "./database/mongoDb";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT;

connectMongoDB();

app.get("/", (req, res) => res.send("hello world"));

app.listen(port, () => console.log(`Server is running on port ${port}`));
