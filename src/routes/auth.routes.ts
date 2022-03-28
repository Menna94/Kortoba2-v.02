import { Router } from 'express';
import { login, signUp } from '../controllers/auth.controller';


export const AuthRoutes = (router:Router) =>{
    router.post('/signup', signUp);
    router.post('/login', login);
}
