"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CompanyRoutes_1 = __importDefault(require("./routes/CompanyRoutes"));
//
const companyRoutes = new CompanyRoutes_1.default();
companyRoutes.listen();
