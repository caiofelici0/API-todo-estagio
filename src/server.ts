import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";
import todoRouter from "./routes/todo.routes";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.ORIGIN_CORS,
        credentials: true,
    })
);
app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
