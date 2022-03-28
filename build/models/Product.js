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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const db_1 = require("../configs/db");
// import { Connect, DbConnection as db, Query } from "../configs/db"
class Product {
    constructor(product) {
        this.product = product;
    }
    save() {
        return (0, db_1.DbConnection)()
            .then((conn) => __awaiter(this, void 0, void 0, function* () {
            const [rows, fields] = yield conn.execute(`
                INSERT INTO 
                    product (title, price, shortDescription, imgURL) 
                  VALUES 
                    (? , ?, ?, ?)
              `, [
                this.product.title,
                this.product.price,
                this.product.shortDescription,
                this.product.imgURL,
            ]);
        }));
    }
    static find() {
        return (0, db_1.DbConnection)()
            .then((conn) => __awaiter(this, void 0, void 0, function* () {
            const [rows, fields] = yield conn.execute('SELECT * FROM product');
            return rows;
        }));
    }
    static findBy(field, data) {
        return (0, db_1.DbConnection)()
            .then((conn) => __awaiter(this, void 0, void 0, function* () {
            const [rows, fields] = yield conn.execute(`SELECT * FROM product WHERE ${field} = ${data}`);
            return rows;
        }));
    }
}
exports.Product = Product;
