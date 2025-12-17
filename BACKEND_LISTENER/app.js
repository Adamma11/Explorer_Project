const dbConfig = require('./config/db.conf');
const mongoose = require('mongoose');
const express = require('express');
const authenticateToken = require('../BACKEND-LISTENER/shared/authenticate_token');
const getAllRoutes = require('../BACKEND-LISTENER/routes/all_app_routes.routes')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')

const app = express();
const timeout = require('connect-timeout')
const haltOnTimedout = (req,res,next)=>{
    if(!req.timedout){
        next()
    }
}

app.use(timeout('7200s'))

app.use(bodyParser.urlencoded({ extended: false }));
mongoose.Promise = global.Promise;

// 14 10 2025
// Connecting to the database
/*mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});*/
// 14 10 2025
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  // Added for better connection handling
    maxPoolSize: 500,          // Adjusting the max connection pool size
    socketTimeoutMS: 360000,   // Setting socket timeout (for inactivity)
    connectTimeoutMS: 360000   // Setting connect timeout (for slow network)
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
 app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '200mb',
    extended: true
  }));
app.use(bodyParser());

var corsOptions = {
   // origin:"http://localhost:4200"
   origin: ["http://localhost:4200", "http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(fileUpload({
	limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath:true
}));
app.use(express.json({limit:'2000mb'}));

//app.use(express.urlencoded({extended:true}));
/*app.get('/api/pins',(req,res)=>{
    res.json(pins)
})*/
getAllRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server Started on Port ${PORT}`));
// 14 10 2025
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
    // Try reconnecting if the connection is lost
    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(err => {
        console.log('Error reconnecting to MongoDB:', err);
    });
});

// To ensure reconnection attempts during application startup, also handle errors:
mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

// 14 10 2025
