import { Router } from 'express';
import { login, logout, signUp } from '../controllers/auth.controller';


export const AuthRoutes = (router:Router) =>{
    const route = '/api/auth';
    router.post(`${route}/signup`, signUp);//Create A User => POST /auth/signup
    router.post(`${route}/login`, login);//Login User => POST /auth/login
    router.get(`${route}/logout`, logout);//Logout User => GET /auth/logout

}
