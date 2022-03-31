import { DbConnection } from "../configs/db";
import { IUser } from "../models/User"
import  JWT  from "jsonwebtoken";

export class User{
    constructor(public user:IUser){}

    async save(){
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
      ]

      return DbConnection()
          .then(async conn=>{
            const [rows, fields] = await conn.execute(query, params);
          })
    }

    static async signJWT(id:number){
      return await JWT.sign({
          id
      }, 
      'process.env.JWT_SECRET',{
          expiresIn: 'process.env.JWT_EXPIRATION'
      })
    }


    static find(){
        return DbConnection()
                .then(async conn=>{
                  const [rows, fields] = await conn.execute('SELECT * FROM user');
                  return rows;
                })
    }

    static findBy(field:string, data: any){
      return DbConnection()
      .then(async conn=>{
        const [rows, fields] = await conn.execute(`SELECT * FROM user WHERE ${field} = '${data}'`);
        return rows;
      })
    }

    static update(id:number, data:any){
      console.log(typeof data);

      let params = []
      let query = `UPDATE user SET `;


          //set 
      for(const [key, value] of Object.entries(data)){
        query += `? = ? `
        params.push(key)
        params.push(value)
      }

      query += `WHERE id = ?`
      params.push(id);
      console.log(params);
      console.log(query);
      

      return DbConnection()
      .then(async conn=>{
        const [rows, fields] = await conn.execute(query, params)

        return rows;
      })

    }

    static delete(id:number){
      const query = 'DELETE FROM user WHERE id = ?'
      return DbConnection()
      .then(async conn=>{
        const [rows, fields] = await conn.execute(query, [id]);
        return rows;
      })
    } 

}
