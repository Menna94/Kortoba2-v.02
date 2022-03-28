"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import ('dotenv/config');
const express_1 = __importDefault(require("express"));
const db_1 = require("./configs/db");
//Routes
const product_routes_1 = require("./routes/product.routes");
const auth_routes_1 = require("./routes/auth.routes");
//application configs
const app = (0, express_1.default)();
const port = process.env.PORT || 3300;
app.use(express_1.default.json());
//mount routers
app.use('/api/products', product_routes_1.router);
app.use('/api/auth', auth_routes_1.router);
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
