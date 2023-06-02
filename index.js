require("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const {log} = require('mercedlogger')
const cors = require('cors')
const userRouter = require('./Controllers/User')

//Objeto da Aplicação
const app = express()

//Definindo a Porta da Aplicação
const port = 3000

//Middleware global
app.use(cors()) // Adiciona os headers do CORS
app.use(morgan('Request')) // Loga o Request
app.use(express.json()) // Tipo o bodyparser 

// Rotas
app.get('/', (req, res) => {
  console.log("to na home")
  res.send('Hello World!')
})

// Envia todas as requisições do /user pro userRouter pra roteamento
app.use('/user', userRouter)


// App Listener
app.listen(port, () => {
  console.log(`Aplicativo rodando na porta ${port}`)
})
