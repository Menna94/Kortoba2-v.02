export interface Product {
  id?:number,
  title:string;
  price:number;
  shortDescription:string;
  imgURL:string;
  user_id?: number
}

import { DbConnection } from "../configs/db";

// import { Connect, DbConnection as db, Query } from "../configs/db"

export class Product{
    constructor(public product:Product){}

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

    // update(){}

    // delete(){} 

}
