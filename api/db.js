var mongoose = require('mongoose');

var gracefulShutdown;
mongodb://localhost/stockdeal
//mongodb://admin:admin@ds055485.mongolab.com:55485/stockdeal
var dbURI = 'mongodb://localhost/stockdeal'

mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
    console.log('Mongoose connection to ' + dbURI);
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error ' + err);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
});

gracefulShutdown = function(msg, callback){
    mongoose.connection.close(function(){
        console.log('Monngoose disconnected through '+ msg);
        callback();
    })
}

process.once('SIGUSR2', function(){
    gracefulShutdown('nodemon restart',  function(){
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function(){
    gracefulShutdown('app termination', function(){
        process.exit(0);
    })
})
