// import ('dotenv/config');
import express from 'express';
const app = express();
// import  cors from 'cors';
// import  {router}  from './routes/product.routes';
import { db } from './configs/db';

const port = process.env.PORT || 3300;

app.use(express.json());


//mount routers



db
    .then(() =>{
        console.log('Connected To DB Successfully!');

        app.listen(port, ()=>{
            console.log(`App is listening on ${port}`);
        })
    }

    )
    .catch(err=>{
        console.log('error connecting to database');

    }) 


