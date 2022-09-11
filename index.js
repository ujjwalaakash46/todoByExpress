const express = require('express');
const bodyParser =  require('body-parser');
const port = 6060;

const db = require('./config/mongoose');
const Todo = require('./models/todo');


const app = express();

//views setting
app.set('view engine', 'ejs');
app.set('views', "./views");

//adding assets
app.use(express.static("assets"));


//BodyParser to read body.
app.use(bodyParser.urlencoded({extended:false}));

//routing
app.get('/todo',function(req,res){
    Todo.find({},function(err, data){
        if(err){
            console.error(err);
            return;
        }
        
        return res.render('todo',{
            todoList: data
        })
    })
})

//routing to add.
app.post('/add', function(req,res){
    Todo.create({
        desc:req.body.desc,
        cate:req.body.cate,
        date:req.body.date
    },function(err, newTodo){
        if(err){
            console.error(err);
            return;
        }
    })
    return res.redirect('back');
})

//routing to delete
app.get('/delete/',function(req,res){
    console.log(req.query);
    let id= req.query.id;
    Todo.findByIdAndDelete(id, (err,doc,res)=>{
        if(err){console.error(err)};

        return res.redirect('back');
    })

})

//Starting server
app.listen(port,function(err){
    if(err){
        console.error(`Error: ${err}`);
        return;
    }

    console.log(`App started on port: ${port}`);

}) 