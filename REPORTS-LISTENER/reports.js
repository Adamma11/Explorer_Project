/*const dbConfig = require('./config/db.conf');
const mongoose = require('mongoose');
const express = require('express');
// const authenticateToken = require('../REPORTS-LISTENER/shared/authenticate_token');
const authenticateToken = require('../REPORTS-LISTENER/shared/authenticate_token')

// const getAllRoutes = require('../REPORTS-LISTENER/routes/all_app_routes.routes')
const  getAllRoutes = require('../REPORTS-LISTENER/routes/all_app_routes.routes')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
const timeout = require('connect-timeout')
const haltOnTimedout = (req,res,next)=>{
    if(!req.timedout){
        next()
    }
}

app.use(timeout('7200s'))


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


var corsOptions = {
    origin:"http://localhost:4200"
};
app.use(cors(corsOptions));
app.use(fileUpload({
    createParentPath:true
}));
app.use(express.json());

//app.use(express.urlencoded({extended:true}));

getAllRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`Server Started on Port ${PORT}`));*/
const dbConfig = require('./config/db.conf');
const mongoose = require('mongoose');
const express = require('express');
// const authenticateToken = require('../REPORTS-LISTENER/shared/authenticate_token');
const authenticateToken = require('../REPORTS-LISTENER/shared/authenticate_token')

// const getAllRoutes = require('../REPORTS-LISTENER/routes/all_app_routes.routes')
const  getAllRoutes = require('../REPORTS-LISTENER/routes/all_app_routes.routes')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
const timeout = require('connect-timeout')
const haltOnTimedout = (req,res,next)=>{
    if(!req.timedout){
        next()
    }
}

app.use(timeout('7200s'))


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


var corsOptions = {
    origin:"http://localhost:4200"
};
app.use(cors(corsOptions));
app.use(fileUpload({
    createParentPath:true
}));
app.use(express.json());

//app.use(express.urlencoded({extended:true}));
/*app.get('/api/pins',(req,res)=>{
    res.json(pins)
})*/
getAllRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`Server Started on Port ${PORT}`));

