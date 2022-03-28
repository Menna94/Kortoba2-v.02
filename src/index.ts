// import ('dotenv/config');
import express from 'express';
import { DbConnection } from './configs/db';
const app = express();
// import  cors from 'cors';
// import  {router}  from './routes/product.routes';
// import { db } from './configs/db';
import { router } from './routes/product.routes';

const port = process.env.PORT || 3300;

app.use(express.json());


//mount routers
app.use('/products', router);



DbConnection()
.then(()=>{
    console.log('from app listening');
    
    app.listen(port, ()=>{
        console.log(`App is listening on ${port}`);
    })

})
.catch(err=>{
    console.log('Error Connecting to DB');
    
})

       

       
    


