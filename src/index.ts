// import ('dotenv/config');
import express from 'express';
import { DbConnection } from './configs/db';
//Routes
import { ProductRoutes } from './routes/product.routes';
import { AuthRoutes } from './routes/auth.routes';
import { UserRoutes } from './routes/user.routes';


//application configs
const app = express();
const port = process.env.PORT || 3300;

app.use(express.json());


//mount routers
app.use('/api/products', ProductRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);



//application running
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

       

       
    


