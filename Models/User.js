const { Schema,model } = require('../Database/connection')


//Criando o Schema
const userSchema = new Schema({
    username: {type: String, unique: true , required: true},
    password: {type: String, required: true}
})

//Criando o model User
const User = model("User", userSchema)

module.exports = User
