"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: __dirname + './configs/.env' });
const express_1 = __importDefault(require("express"));
const db_1 = require("./configs/db");
//Routes
const product_routes_1 = require("./routes/product.routes");
const auth_routes_1 = require("./routes/auth.routes");
const user_routes_1 = require("./routes/user.routes");
//application configs
const app = (0, express_1.default)();
const port = process.env.PORT || 3300;
app.use(express_1.default.json());
console.log('hi');
console.log(`${__dirname + './configs/.env'}`);
console.log(process.env.PORT);
//mount routers
(0, product_routes_1.ProductRoutes)(app);
(0, user_routes_1.UserRoutes)(app);
(0, auth_routes_1.AuthRoutes)(app);
//application running
(0, db_1.DbConnection)()
    .then(() => {
    console.log('from app listening');
    app.listen(port, () => {
        console.log(`App is listening on ${port}`);
    });
})
    .catch(err => {
    console.log('Error Connecting to DB');
});
