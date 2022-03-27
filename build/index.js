"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import ('dotenv/config');
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// import  cors from 'cors';
// import  {router}  from './routes/product.routes';
const db_1 = require("./configs/db");
const port = process.env.PORT || 3300;
app.use(express_1.default.json());
//mount routers
db_1.db
    .then(() => {
    console.log('Connected To DB Successfully!');
    app.listen(port, () => {
        console.log(`App is listening on ${port}`);
    });
})
    .catch(err => {
    console.log('error connecting to database');
});
