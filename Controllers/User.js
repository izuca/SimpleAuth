require('dotenv').config()
const { Router } = require('express')
const User = require('../Models/User')
const bcrypt =  require('bcryptjs')
const jwt = require('jsonwebtoken')
const { log } = require('mercedlogger')

//Instanciando o router
const router = Router()

//Cadastro
router.post('/signup', async (req,res) =>{
    try {
        //Checa se o usuário já existe
        const checkUser = await User.find({username: req.body.username})
        if( checkUser == [] ){
            res.status(400).json({ error: 'Usuário já existente' })
        }else{ // Cria a senha com hash e o usuário
            req.body.password = await bcrypt.hash(req.body.password,10)
            const user = await User.create(req.body)
            log.green('AUTHENTICATION STATUS','Usuário criado com sucesso')
            res.json(user)
        }
    } catch (error){ //Erro na conexão
        console.log("deu merda")
        res.status(400).json(error)
    }
})


//Login
router.post('/login', async (req,res) =>{
    try {
        //Checa se o usuário existe
        const user = await User.findOne({ username: req.body.username })
        
        if(user != []){
            //Checa se a senha confere
            const result = await bcrypt.compare(req.body.password, user.password)
            
            if(result){
                //Gera o token
                const token = jwt.sign({ username: user.username }, process.env.SECRET)
                log.green('AUTHENTICATION STATUS',`Usuário autenticado! Seja bem-vindo ${ user.username }`)
                console.log(req.headers.authorization)
                return res.json({ token })
            } else  //Se a senha não confere
                return res.status(400).json({ error: 'Senha incorreta' })
            
        } else { //Se o usuário não existe
            console.log('usuario incorreto')
            return res.status(400).json({ error: 'Usuário incorreto' })
        }
    } catch (error) { //Erro de conexão
        res.status(400).json({ error:error })
    }
})

module.exports = router