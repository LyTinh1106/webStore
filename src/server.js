const express = require('express');
require('dotenv').config();
const configViewEngine = require('./config/ViewEngine');
const webRouters = require('./routes/web');
const connection = require('./config/database');

const app = express();
const port = process.env.PORT || 9000;
const hostname = process.env.HOST_NAME || 'localhost'

// Config view engine
configViewEngine(app);
//config req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', webRouters);



// Check database connection
// connection.query(
//     'select * from account',
//     function(err,results,fields){
//       console.log(results)
      
//     }
//   )
  
  
  
  app.listen(port,hostname,()=>{
    console.log(`Server is running on port ${port}`)
  })