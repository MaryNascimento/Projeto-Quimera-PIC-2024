import express from "express";
import connectMongoDB from "./database/mongoDb";
import teacherRoutes from "./routes/teacherRoutes";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());

//conexão banco
connectMongoDB();

//rotas
app.use("/teacher", teacherRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
