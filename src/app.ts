import "reflect-metadata";
import "./containers";
import express from "express";
import connectMongoDB from "./database/mongoDb";
import teacherRoutes from "./routes/teacherRoutes";
import authRoutes from "./routes/authRoutes";
import waterExperimentRoutes from "./routes/waterExperimentRoutes";
import waterOptionRoutes from "./routes/waterOptionRoutes";
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
app.use("/auth", authRoutes);
app.use("/water-experiment", waterExperimentRoutes);
app.use("/water-option", waterOptionRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));

//questão (situação problema), gráfico, tabelas, imagens, dados, comando da questão, 5 itens(multipla escolha), gerar histograma
