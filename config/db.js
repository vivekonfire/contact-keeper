const mongoose = require('mongoose');
const config = require('config');
const dbz = require('./default.json');
const db = dbz.mongoURI;

const connectDB = async() => {
    try{
        await mongoose.connect(db , {
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false,
            useUnifiedTopology: true
        });

        console.log('mongodb connected');
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;