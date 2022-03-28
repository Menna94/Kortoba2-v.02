// import ('dotenv/config');
import express from 'express';
import { DbConnection } from './configs/db';
//Routes
import { router as ProductRoutes } from './routes/product.routes';
import { AuthRoutes } from './routes/auth.routes';

//application configs
const app = express();
const port = process.env.PORT || 3300;

app.use(express.json());


//mount routers
app.use('/api/products', ProductRoutes);
app.use('/api/auth', AuthRoutes);




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

       

       
    


