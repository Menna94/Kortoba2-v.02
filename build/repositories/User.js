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
exports.User = void 0;
const db_1 = require("../configs/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class User {
    constructor(user) {
        this.user = user;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
        INSERT INTO 
            user (name, email, password, role_id) 
        VALUES 
            (?, ?, ?, ?)
      `;
            const params = [
                this.user.name,
                this.user.email,
                this.user.password,
                1
            ];
            return (0, db_1.DbConnection)()
                .then((conn) => __awaiter(this, void 0, void 0, function* () {
                const [rows, fields] = yield conn.execute(query, params);
            }));
        });
    }
    static signJWT(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jsonwebtoken_1.default.sign({
                id
            }, 'process.env.JWT_SECRET', {
                expiresIn: 'process.env.JWT_EXPIRATION'
            });
        });
    }
    static find() {
        return (0, db_1.DbConnection)()
            .then((conn) => __awaiter(this, void 0, void 0, function* () {
            const [rows, fields] = yield conn.execute('SELECT * FROM user');
            return rows;
        }));
    }
    static findBy(field, data) {
        return (0, db_1.DbConnection)()
            .then((conn) => __awaiter(this, void 0, void 0, function* () {
            const [rows, fields] = yield conn.execute(`SELECT * FROM user WHERE ${field} = '${data}'`);
            return rows;
        }));
    }
    static update(id, data) {
        console.log(typeof data);
        let params = [];
        let query = `UPDATE user SET `;
        //set 
        for (const [key, value] of Object.entries(data)) {
            query += `? = ? `;
            params.push(key);
            params.push(value);
        }
        query += `WHERE id = ?`;
        params.push(id);
        console.log(params);
        console.log(query);
        return (0, db_1.DbConnection)()
            .then((conn) => __awaiter(this, void 0, void 0, function* () {
            const [rows, fields] = yield conn.execute(query, params);
            return rows;
        }));
    }
    static delete(id) {
        const query = 'DELETE FROM user WHERE id = ?';
        return (0, db_1.DbConnection)()
            .then((conn) => __awaiter(this, void 0, void 0, function* () {
            const [rows, fields] = yield conn.execute(query, [id]);
            return rows;
        }));
    }
}
exports.User = User;
