import express, { Express, Request, Response } from 'express';
import { DoughChef, ToppingChef, Oven, Waiter } from './Manufactorers/Manufactor';
import mongoose from 'mongoose';

const app: Express = express();
mongoose.connect("mongodb://localhost/pizza_orders")

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const port = process.env.PORT || 8005;

const ordersRouter = require('./routes/ordersRouter')
export const doughChef1 = new DoughChef('Albert')
export const doughChef2 = new DoughChef('Avi')
export const ToppingChef1 = new ToppingChef('Liron')
export const ToppingChef2 = new ToppingChef('Yoav')
export const ToppingChef3 = new ToppingChef('Romi')
export const oven = new Oven('oven')
export const waiter1 = new Waiter('Jhon')
export const waiter2 = new Waiter('Snow')

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server!!!!!');
  });

app.use("/set-order", ordersRouter)

  app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
  });
