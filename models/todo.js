const mongoose = require('mongoose');

//creating schema
const todoSchema = new mongoose.Schema({
    desc:{
        type:String,
        required:true
    },
    cate:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
})

//modeling 
const todo = mongoose.model('Todo',todoSchema);

//exporting todo Repo.
module.exports = todo;