import { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controller";


export const UserRoutes = (router:Router)=>{
    const route ='/api/users'
    router
        .route(`${route}/`)
            .get(getUsers)//Fetch All Users => GET /api/users => protected: @admin

    router
        .route(`${route}/:id`)
            .get(getUser)//Fetch Single User => GET /api/users/:id => protected: @user/@admin
            .put(updateUser)//Update Single User => PUT /api/users/:id => protected: @user/@admin
            .delete(deleteUser)//Delete Single User => DELETE /api/users/:id => protected: @admin
}