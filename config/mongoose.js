const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/todoApp');


const db=mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',function(){
    console.log('Successsfully connected to database');
})