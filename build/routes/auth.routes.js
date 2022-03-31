"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const auth_controller_1 = require("../controllers/auth.controller");
const AuthRoutes = (router) => {
    const route = '/api/auth';
    router.post(`${route}/signup`, auth_controller_1.signUp); //Create A User => POST /auth/signup
    router.post(`${route}/login`, auth_controller_1.login); //Login User => POST /auth/login
};
exports.AuthRoutes = AuthRoutes;
