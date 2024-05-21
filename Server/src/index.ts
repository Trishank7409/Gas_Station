import express, { Express, Request, Response, query } from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRoutes from "./routes/router.routes";
import Database from "./config/database.config";
import { before as beforeMiddleware, after as afterMiddleware } from "./middleware/index";
import path from 'path';
import http from 'http';
import { corsConfig} from './config/cors.config';


configDotenv();

const expressPort: number = Number(process.env.EXPRESS_PORT) || 8000;

const app: Express = express();


console.log(corsConfig);
// Setting for CORS
app.use(cors<Request>(corsConfig));

//Setting for Cookie Parser
app.use(cookieParser());

// Setting for JSON acceptence
app.use(express.json());


// Applying before middlewares
if (beforeMiddleware.length !== 0)
    app.use(beforeMiddleware);


// Setting routes
app.use('/api', apiRoutes);


// client
app.use(express.static(path.join(__dirname, '..', 'react', 'dist')));
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'react', 'dist', 'index.html'));
});


//Applying after middlewares
if (afterMiddleware.length !== 0)
    app.use(afterMiddleware);


const server = http.createServer(app);


(new Database).connect()
    .then(() => {

        console.log("Database Connected!");

        server.listen(expressPort, (): void => {
            console.log('Express Server Connected at Port : ' + expressPort);
        });

    }).catch((err) => {

        console.log("Database Connection Error : " + err);

    })







// import express from 'express'
// import path from 'path';
// import {configDotenv} from "dotenv";

// configDotenv();

// const app = express()

// app.get('/api', (req, res) => {
//   res.send('This is API')
// })
// app.get('/api/get-user', (req, res) => {
//   res.send('This is get user API nono!')
// })


// app.use(express.static(path.join(__dirname,'..', 'client')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname,  '..', 'client','index.html'));
// })

// app.listen(process.env.PORT ?? 8000, () => {
//   console.log('Example app listening on port 3000!')
// })
