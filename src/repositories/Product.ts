import { DbConnection } from "../configs/db";
import { IProduct } from "../models/Product"

export class Product{
    constructor(public product: IProduct){}

    save(){
      return DbConnection()
          .then(async conn=>{
            const [rows, fields] = await conn.execute(`
                INSERT INTO 
                    product (title, price, shortDescription, imgURL) 
                  VALUES 
                    (? , ?, ?, ?)
              `, 
              [
                this.product.title,
                this.product.price,
                this.product.shortDescription,
                this.product.imgURL,
              ]);
          })
    }

    static find(){
        return DbConnection()
                .then(async conn=>{
                  const [rows, fields] = await conn.execute('SELECT * FROM product');
                  return rows;
                })
    }

    static findBy(field:string, data: any){
      return DbConnection()
      .then(async conn=>{
        const [rows, fields] = await conn.execute(`SELECT * FROM product WHERE ${field} = ${data}`);
        return rows;
      })
    }

    static update(id:number, data:any){
      console.log(typeof data);

      let params = []
      let query = `UPDATE product SET `;


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
      const query = 'DELETE FROM product WHERE id = ?'
      return DbConnection()
      .then(async conn=>{
        const [rows, fields] = await conn.execute(query, [id]);
        return rows;
      })
    } 

}
