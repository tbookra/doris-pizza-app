"use strict";
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
exports.randomId = exports.sleep = exports.handle_bulk_order_finished_report = exports.serve = exports.startBaking = exports.startTopping = exports.startPreparing = void 0;
var __1 = require("..");
var OrderDB = require('../model/Orders');
var IsWorking = require('../model/Current_working');
var startPreparing = function () { return __awaiter(void 0, void 0, void 0, function () {
    var waiting_jobs, uncompleteOrders, now_working;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                waiting_jobs = 0;
                return [4 /*yield*/, flag_work_inProgress()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [4 /*yield*/, OrderDB.where("status").equals("ordered").sort({ createdAt: 1 })];
            case 3:
                uncompleteOrders = _a.sent();
                if (!((uncompleteOrders === null || uncompleteOrders === void 0 ? void 0 : uncompleteOrders.length) > 0)) return [3 /*break*/, 8];
                waiting_jobs = uncompleteOrders.length;
                if (!!__1.doughChef1.busy) return [3 /*break*/, 4];
                __1.doughChef1.prepare(uncompleteOrders[0]);
                return [3 /*break*/, 7];
            case 4:
                if (!!__1.doughChef2.busy) return [3 /*break*/, 5];
                __1.doughChef2.prepare(uncompleteOrders[0]);
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, sleep(50)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [3 /*break*/, 11];
            case 8:
                waiting_jobs = 0;
                return [4 /*yield*/, IsWorking.find()];
            case 9:
                now_working = _a.sent();
                return [4 /*yield*/, IsWorking.update({ _id: now_working[0].id }, { doughChefs_is_working: false })];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11:
                if (waiting_jobs > 0) return [3 /*break*/, 2];
                _a.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.startPreparing = startPreparing;
var startTopping = function () { return __awaiter(void 0, void 0, void 0, function () {
    var waiting_jobs, uncompleteOrders, now_working;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                waiting_jobs = 0;
                return [4 /*yield*/, flag_topping_work_inProgress()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [4 /*yield*/, OrderDB.where("status").equals("dough ready").sort({ createdAt: 1 })];
            case 3:
                uncompleteOrders = _a.sent();
                if (!((uncompleteOrders === null || uncompleteOrders === void 0 ? void 0 : uncompleteOrders.length) > 0)) return [3 /*break*/, 9];
                waiting_jobs = uncompleteOrders.length;
                if (!!__1.ToppingChef1.busy) return [3 /*break*/, 4];
                __1.ToppingChef1.prepare(uncompleteOrders[0]);
                return [3 /*break*/, 8];
            case 4:
                if (!!__1.ToppingChef2.busy) return [3 /*break*/, 5];
                __1.ToppingChef2.prepare(uncompleteOrders[0]);
                return [3 /*break*/, 8];
            case 5:
                if (!!__1.ToppingChef3.busy) return [3 /*break*/, 6];
                __1.ToppingChef3.prepare(uncompleteOrders[0]);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, sleep(50)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [3 /*break*/, 12];
            case 9:
                waiting_jobs = 0;
                return [4 /*yield*/, IsWorking.find()];
            case 10:
                now_working = _a.sent();
                return [4 /*yield*/, IsWorking.update({ _id: now_working[0].id }, { toppingChefs_is_working: false })];
            case 11:
                _a.sent();
                _a.label = 12;
            case 12:
                if (waiting_jobs > 0) return [3 /*break*/, 2];
                _a.label = 13;
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.startTopping = startTopping;
var startBaking = function () { return __awaiter(void 0, void 0, void 0, function () {
    var waiting_jobs, uncompleteOrders, now_working;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                waiting_jobs = 0;
                return [4 /*yield*/, flag_oven_inProgress()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [4 /*yield*/, OrderDB.where("status").equals("topping ready").sort({ createdAt: 1 })];
            case 3:
                uncompleteOrders = _a.sent();
                if (!((uncompleteOrders === null || uncompleteOrders === void 0 ? void 0 : uncompleteOrders.length) > 0)) return [3 /*break*/, 7];
                waiting_jobs = uncompleteOrders.length;
                if (!!__1.oven.busy) return [3 /*break*/, 4];
                __1.oven.prepare(uncompleteOrders[0]);
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, sleep(50)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [3 /*break*/, 10];
            case 7:
                waiting_jobs = 0;
                return [4 /*yield*/, IsWorking.find()];
            case 8:
                now_working = _a.sent();
                return [4 /*yield*/, IsWorking.update({ _id: now_working[0].id }, { baking: false })];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                if (waiting_jobs > 0) return [3 /*break*/, 2];
                _a.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.startBaking = startBaking;
var serve = function () { return __awaiter(void 0, void 0, void 0, function () {
    var waiting_jobs, uncompleteOrders, now_working;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                waiting_jobs = 0;
                return [4 /*yield*/, flag_serving_inProgress()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [4 /*yield*/, OrderDB.where("status").equals("pizza ready!").sort({ createdAt: 1 })];
            case 3:
                uncompleteOrders = _a.sent();
                if (!((uncompleteOrders === null || uncompleteOrders === void 0 ? void 0 : uncompleteOrders.length) > 0)) return [3 /*break*/, 8];
                waiting_jobs = uncompleteOrders.length;
                if (!!__1.waiter1.busy) return [3 /*break*/, 4];
                __1.waiter1.prepare(uncompleteOrders[0]);
                return [3 /*break*/, 7];
            case 4:
                if (!!__1.waiter2.busy) return [3 /*break*/, 5];
                __1.waiter2.prepare(uncompleteOrders[0]);
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, sleep(50)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [3 /*break*/, 11];
            case 8:
                waiting_jobs = 0;
                return [4 /*yield*/, IsWorking.find()];
            case 9:
                now_working = _a.sent();
                return [4 /*yield*/, IsWorking.update({ _id: now_working[0].id }, { serving: false })];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11:
                if (waiting_jobs > 0) return [3 /*break*/, 2];
                _a.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.serve = serve;
var handle_bulk_order_finished_report = function (bulkId) { return __awaiter(void 0, void 0, void 0, function () {
    var completed, total_time;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, OrderDB.where("bulk_order_id").equals(bulkId).where("reported").equals(false).sort({ createdAt: 1 })];
            case 1:
                completed = _a.sent();
                if (!!completed.map(function (order) { return order.completed; }).includes(false)) return [3 /*break*/, 3];
                total_time = (Date.now() - completed[0].createdAt) / 1000;
                console.log("bulk order: ".concat(bulkId, " is completed. it took ").concat(total_time, " seconds"));
                return [4 /*yield*/, OrderDB.updateMany({ bulk_order_id: bulkId }, { reported: true, bulk_completed: Date.now() })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.handle_bulk_order_finished_report = handle_bulk_order_finished_report;
var flag_serving_inProgress = function () { return __awaiter(void 0, void 0, void 0, function () {
    var working;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, IsWorking.find()];
            case 1:
                working = _a.sent();
                if (!(working.length === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, IsWorking.create({ serving: true })];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, IsWorking.update({ _id: working[0].id }, { serving: true })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
var flag_oven_inProgress = function () { return __awaiter(void 0, void 0, void 0, function () {
    var working;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, IsWorking.find()];
            case 1:
                working = _a.sent();
                if (!(working.length === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, IsWorking.create({ baking: true })];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, IsWorking.update({ _id: working[0].id }, { baking: true })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
var flag_work_inProgress = function () { return __awaiter(void 0, void 0, void 0, function () {
    var working;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, IsWorking.find()];
            case 1:
                working = _a.sent();
                if (!(working.length === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, IsWorking.create({ doughChefs_is_working: true })];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, IsWorking.update({ _id: working[0].id }, { doughChefs_is_working: true })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
var flag_topping_work_inProgress = function () { return __awaiter(void 0, void 0, void 0, function () {
    var working;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, IsWorking.find()];
            case 1:
                working = _a.sent();
                if (!(working.length === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, IsWorking.create({ toppingChefs_is_working: true })];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, IsWorking.update({ _id: working[0].id }, { toppingChefs_is_working: true })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
var randomId = function () {
    return Math.random().toString(36).substr(2, 5);
};
exports.randomId = randomId;
