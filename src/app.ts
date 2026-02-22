import "reflect-metadata";
import "./containers";
import express from "express";
import connectMongoDB from "./database/mongoDb";

import { AuthRoutes } from "./modules/auth/auth.routes";

import { config } from "dotenv";
import { TeacherRoutes } from "./modules/teacher/teacher.routes";
import { WaterExperimentRoutes } from "./modules/water-experiment/experiment/water-experiment.routes";
import { WaterResponseRoutes } from "./modules/water-experiment/response/water-response.routes";
import { WaterOptionsRoutes } from "./modules/water-experiment/options/water-options.routes";

config();

const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());

//conexão banco
connectMongoDB();

//rotas
app.use("/teacher", TeacherRoutes());
app.use("/auth", AuthRoutes());

app.use("/water-experiment", WaterExperimentRoutes());
app.use("/water-option", WaterOptionsRoutes());
app.use("/water-response", WaterResponseRoutes());

app.listen(port, () => console.log(`Server is running on port ${port}`));

//questão (situação problema), gráfico, tabelas, imagens, dados, comando da questão, 5 itens(multipla escolha), gerar histograma
