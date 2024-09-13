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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("../models/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
class loginService {
    constructor() {
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exitUser = new UserModel_1.UserModel({ email: body.email, password: body.password });
                if (!exitUser) {
                    return { success: false, message: "User not found" };
                }
                const user = yield UserModel_1.UserModel.findOne({ email: body.email });
                if (!user) {
                    return { success: false, message: "Invalid password or email" };
                }
                const { email, photo, employees } = user;
                const isMatch = yield bcrypt_1.default.compare(body.password, user.password);
                if (!isMatch) {
                    console.log("Invalid password or email");
                    return { success: false, message: "Invalid password or email" };
                }
                return { success: true, message: "Login success", email, photo, employees };
            }
            catch (err) {
                console.error("Login error:", err);
                return { success: false, message: "Login failed" };
            }
        });
    }
}
exports.default = loginService;
