"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = exports.Room = exports.Hotel = void 0;
__exportStar(require("./interfaces"), exports);
var Hotels_1 = require("./Hotels");
Object.defineProperty(exports, "Hotel", { enumerable: true, get: function () { return __importDefault(Hotels_1).default; } });
var Rooms_1 = require("./Rooms");
Object.defineProperty(exports, "Room", { enumerable: true, get: function () { return __importDefault(Rooms_1).default; } });
var Reservations_1 = require("./Reservations");
Object.defineProperty(exports, "Reservation", { enumerable: true, get: function () { return __importDefault(Reservations_1).default; } });
