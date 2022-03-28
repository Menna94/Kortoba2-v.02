import { Router } from 'express';
import { login, signUp } from '../controllers/auth.controller';


export const AuthRoutes = (router:Router) =>{
    router.post('/signup', signUp);//Create A User => POST /auth/signup
    router.post('/login', login);//Login User => POST /auth/login
}
