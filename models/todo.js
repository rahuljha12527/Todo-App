const mongoose=require('mongoose');

const todoSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true   
    }
});

const Todo=mongoose.model('todo',todoSchema);
module.exports=Todo;