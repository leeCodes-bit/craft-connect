import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { createArtisanTable, createArtisanToken} from './auth/artisans.model.auth';
import { createCraftTable } from './auth/craft.model.auth';

import indexRouter from './routes/Homepage';
import craftsRouter from './routes/Crafts';
import  artisansRouter from './routes/Artisans'

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.use('/', indexRouter);
app.use('/crafts', craftsRouter);
app.use('/artisans', artisansRouter)



//for creating tables
app.get('/createArtisan', createArtisanTable);
app.get('/createCraft', createCraftTable);
app.get('/createToken', createArtisanToken);


export default app;
