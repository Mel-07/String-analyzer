import express from 'express';
import http from 'http';
import "dotenv/config";
import cors from "cors";
import router from './src/router/index';
import { errorMiddleware } from './src/Middleware';
const app = express();

const server = http.createServer(app);
const PORT = process.env.NODE_DEV === "development" ? process.env.PORT : 3000;
const url = `http://localhost:${PORT}`

app.use(cors());
app.use(express.json());
app.use("/strings",router);
app.use(errorMiddleware)

server.listen(PORT,() =>{
    console.log(`Server is Running on Port:${PORT}`)
    console.info(`\x1b]8;;' + ${url} + '\x1b\\${url}\x1b]8;;\x1b\\`);
})


