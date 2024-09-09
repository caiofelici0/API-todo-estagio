import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3001",
        credentials: true,
    })
);
app.use("/user", userRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
