const { Schema,model } = require('../Database/connection')

//Criando o Schema
const todoSchema = new Schema({
    content: { type: String , required: true},
    date: Date.now
})

//Criando o model Todo
const Todo = model('Todo', todoSchema)

module.exports = Todo