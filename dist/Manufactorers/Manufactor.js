"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Waiter = exports.Oven = exports.ToppingChef = exports.DoughChef = void 0;
var OrderDB = require('../model/Orders');
var IsWorking = require('../model/Current_working');
var utils_functions_1 = require("../utils/utils_functions");
var Manufactorer = /** @class */ (function () {
    function Manufactorer(name) {
        this.name = name;
    }
    return Manufactorer;
}());
var DoughChef = /** @class */ (function (_super) {
    __extends(DoughChef, _super);
    function DoughChef(name) {
        var _this = _super.call(this, name) || this;
        _this.busy = false;
        _this.time = 7000;
        return _this;
    }
    DoughChef.prototype.prepare = function (orderObj) {
        return __awaiter(this, void 0, void 0, function () {
            var isCurrentWorking;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.busy = true;
                        return [4 /*yield*/, OrderDB.update({ _id: orderObj._id }, { $set: { status: "preparing dough", procces_started_at: Date.now() } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, utils_functions_1.sleep)(this.time)];
                    case 2:
                        _a.sent();
                        this.busy = false;
                        return [4 /*yield*/, OrderDB.update({ _id: orderObj._id }, { $set: { status: "dough ready" } })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, IsWorking.find()];
                    case 4:
                        isCurrentWorking = _a.sent();
                        if (isCurrentWorking.length === 0 || !isCurrentWorking[0].toppingChefs_is_working)
                            (0, utils_functions_1.startTopping)();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return DoughChef;
}(Manufactorer));
exports.DoughChef = DoughChef;
var ToppingChef = /** @class */ (function (_super) {
    __extends(ToppingChef, _super);
    function ToppingChef(name) {
        var _this = _super.call(this, name) || this;
        _this.busy = false;
        _this.jobs = [];
        _this.time = 4000;
        return _this;
    }
    ToppingChef.prototype.isbusy = function () {
        if (this.jobs.length > 1) {
            this.busy = true;
        }
        else {
            this.busy = false;
        }
    };
    ToppingChef.prototype.prepare = function (orderObj) {
        return __awaiter(this, void 0, void 0, function () {
            var isCurrentWorking;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.jobs.push(true);
                        this.isbusy();
                        return [4 /*yield*/, OrderDB.update({ _id: orderObj._id }, { $set: { status: "preparing topping" } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, utils_functions_1.sleep)(this.time)];
                    case 2:
                        _a.sent();
                        this.jobs.pop();
                        this.isbusy();
                        return [4 /*yield*/, OrderDB.update({ _id: orderObj._id }, { $set: { status: "topping ready" } })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, IsWorking.find()];
                    case 4:
                        isCurrentWorking = _a.sent();
                        if (isCurrentWorking.length === 0 || !isCurrentWorking[0].baking)
                            (0, utils_functions_1.startBaking)();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ToppingChef;
}(Manufactorer));
exports.ToppingChef = ToppingChef;
var Oven = /** @class */ (function (_super) {
    __extends(Oven, _super);
    function Oven(name) {
        var _this = _super.call(this, name) || this;
        _this.busy = false;
        _this.time = 10000;
        return _this;
    }
    Oven.prototype.prepare = function (orderObj) {
        return __awaiter(this, void 0, void 0, function () {
            var isCurrentWorking;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.busy = true;
                        return [4 /*yield*/, OrderDB.update({ _id: orderObj._id }, { $set: { status: "baking..." } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, utils_functions_1.sleep)(this.time)];
                    case 2:
                        _a.sent();
                        this.busy = false;
                        return [4 /*yield*/, OrderDB.update({ _id: orderObj._id }, { $set: { status: "pizza ready!" } })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, IsWorking.find()];
                    case 4:
                        isCurrentWorking = _a.sent();
                        if (isCurrentWorking.length === 0 || !isCurrentWorking[0].serving)
                            (0, utils_functions_1.serve)();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Oven;
}(Manufactorer));
exports.Oven = Oven;
var Waiter = /** @class */ (function (_super) {
    __extends(Waiter, _super);
    function Waiter(name) {
        var _this = _super.call(this, name) || this;
        _this.busy = false;
        _this.time = 5000;
        return _this;
    }
    Waiter.prototype.prepare = function (orderObj) {
        return __awaiter(this, void 0, void 0, function () {
            var process_total_time;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.busy = true;
                        return [4 /*yield*/, OrderDB.update({ _id: orderObj._id }, { $set: { status: "serving..." } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, (0, utils_functions_1.sleep)(this.time)];
                    case 2:
                        _a.sent();
                        this.busy = false;
                        return [4 /*yield*/, OrderDB.update({ _id: orderObj._id }, { $set: { status: "served", completed_at: Date.now(), completed: true } })
                            // @ts-ignore: Object is possibly 'null'.
                        ];
                    case 3:
                        _a.sent();
                        process_total_time = (Date.now() - orderObj.procces_started_at) / 1000;
                        console.log("pizza served!! it took ".concat(process_total_time, " seconds"));
                        (0, utils_functions_1.handle_bulk_order_finished_report)(orderObj.bulk_order_id);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Waiter;
}(Manufactorer));
exports.Waiter = Waiter;
// export class DowChefsList{
//     public workQue: Order[]
//     constructor(){
//         this.workQue = []
//     }
//     addToQue(order:string[]):Order[]{
//         const orderItem: Order = {
//             order_id: randomId(),
//             topings: order,
//             startTime: Date.now(),
//             finishedTime: null
//         }
//         this.workQue.push(orderItem)
//         return this.workQue
//     }
//     removeFromQue(orderId:string):Order[]{
//         const orderIndex = this.workQue.map((order) => {return order.order_id}).indexOf(orderId)
//         this.workQue.splice(orderIndex,1)
//         return this.workQue
//     }
// }
