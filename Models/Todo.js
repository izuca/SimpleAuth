const { Schema,model } = require('../Database/connection')

//Criando o Schema
const todoSchema = new Schema({
    username: { type: String , required: true},
    reminder: { type: String, required: true},
    completed: { type: Boolean, required: true, default: false}
})

//Criando o model Todo
const Todo = model('Todo', todoSchema)

module.exports = Todo