import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import http from 'http';
import 'dotenv/config';
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import DailySchedule from './models/schedule.model.js';

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import settlementRouter from './routes/Settlement.route.js'
import allMealsRouter from './routes/allMeals.route.js'
import loginRouter from './routes/login.route.js'
import signupRouter from './routes/signup.route.js'
import ordersRouter from './routes/orders.route.js'
import mealAmountRouter from './routes/mealAmount.route.js'
import customerRouter from './routes/customer.route.js'

import orderMealRouter from './routes/OrderMeal.route.js'
import ShopCartRouter from './routes/ShopCart.route.js'
import vendorRouter from './routes/vendor.route.js'

import k8sTestRouter from './routes/k8sTest.route.js'

import promClient from 'prom-client'
import wsServer from './models/websocket.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const server = http.createServer();
const dailySchedule = DailySchedule();
app.use(cors());
app.set('port', process.env.PORT);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
server.on('request', app);
const wsserver = new wsServer(server);

// Router set up
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/allMeals', allMealsRouter);
app.use('/mealAmount', mealAmountRouter);
app.use('/settlement', settlementRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/orders', ordersRouter);
app.use('/orderMeal',orderMealRouter);
app.use('/shopCart',ShopCartRouter);
app.use('/vendor',vendorRouter);
app.use('/customer', customerRouter)
app.use('/orderMeal',orderMealRouter)
app.use('/k8sTest', k8sTestRouter)

const Registry = promClient.collectDefaultMetrics;
const register = new Registry();

// expose our metrics at the default URL for Prometheus
app.get('/metrics', (async (request, response) => {
  response.set('Content-Type', promClient.register.contentType);
  response.send(await promClient.register.metrics());
}));

server.listen(process.env.PORT, () => {
  console.log(`WebSocket server is running on port ${process.env.PORT}`)
})

export default app;