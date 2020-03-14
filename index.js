const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');

const Todo=require('./models/todo');


const app=express();
//const moment=require('moment');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));

//moment.calendarFormat();
// app.use(function(req,res,next){
//    console.log('middleware 1 called');
//    next();
// });
// app.use(function(req,res,next){
//    console.log('middleware 2 called');
//    next();
// });
var TodoList=[
    { 
        name:"Rahul"

    },
    {
        name:"aajtak"
    }
]

app.get('/',function(req,res){
    // console.log(TodoList);
    
    Todo.find({},function(err,todos){
        if(err){
            console.log('error in fetching details');
            return;
        }
       
        return res.render('home',{
            title: "My Todo App",
            todo_list:todos,
             });
    });

   
});

app.post('/create-todo',function(req,res){
    // return res.redirect('/');
    // TodoList.push({
    //     name:req.body.name
    // })

    // TodoList.push(req.body);
    Todo.create({
        name:req.body.name,
        date:req.body.date,
        category:req.body.category
    },function(err,newTodo){
        if(err){
            console.log('err in creating the contact');
            return;
        }

        console.log('*******',newTodo);
        console.log(newTodo);
        return res.redirect('back');
    });


   
})

app.get('/delete-todo',function(req,res){
      
    let id=req.query.id;

    //   console.log(req.query);
    //   let name=req.query.name;
    //   let todoIndex=TodoList.findIndex(todo=>todo.name==name);
    //   if(todoIndex!=-1){
    //     TodoList.splice(todoIndex,1);
    //   }
    Todo.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
  

});
app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);
    }

    console.log('Yup! My express server is running on port:',port);
})