"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.waiter2 = exports.waiter1 = exports.oven = exports.ToppingChef3 = exports.ToppingChef2 = exports.ToppingChef1 = exports.doughChef2 = exports.doughChef1 = void 0;
var express_1 = __importDefault(require("express"));
var Manufactor_1 = require("./Manufactorers/Manufactor");
var mongoose_1 = __importDefault(require("mongoose"));
var app = (0, express_1.default)();
mongoose_1.default.connect("mongodb://localhost/pizza_orders");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var port = process.env.PORT || 8005;
var ordersRouter = require('./routes/ordersRouter');
exports.doughChef1 = new Manufactor_1.DoughChef('Albert');
exports.doughChef2 = new Manufactor_1.DoughChef('Avi');
exports.ToppingChef1 = new Manufactor_1.ToppingChef('Liron');
exports.ToppingChef2 = new Manufactor_1.ToppingChef('Yoav');
exports.ToppingChef3 = new Manufactor_1.ToppingChef('Romi');
exports.oven = new Manufactor_1.Oven('oven');
exports.waiter1 = new Manufactor_1.Waiter('Jhon');
exports.waiter2 = new Manufactor_1.Waiter('Snow');
app.get('/', function (req, res) {
    res.send('Express + TypeScript Server!!!!!');
});
app.use("/set-order", ordersRouter);
app.listen(port, function () {
    console.log("[server]: Server is running at https://localhost:".concat(port));
});
