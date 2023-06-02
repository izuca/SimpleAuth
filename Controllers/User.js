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
        if( await User.find({username: req.body.username}))
            res.status(400).json({ error: 'Usuário já existente' })
        else{ // Cria a senha com hash e o usuário
            req.body.password = await bcrypt.hash(req.body.password,10)
            const user = await User.create(req.body)
            log.green('AUTHENTICATION STATUS','Usuário criado com sucesso')
            res.json(user)
        }
    } catch (error){ //Erro na conexão
        res.status(400).json(error)
    }
})


//Login
router.post('/login', async (req,res) =>{
    try {
        //Checa se o usuário existe
        const user = User.findOne({ username: req.body.username })
        if(user){
            //Checa se a senha confere
            if(await bcrypt.compare(req.body.password, user.password)){
                //Gera o token
                const token = jwt.sign({ username: user.username }, process.env.SECRET)
                log.green('AUTHENTICATION STATUS',`Usuário autenticado! Seja bem-vindo ${ user.username }`)
                res.json({ token })
            } else  //Se a senha não confere
                res.status(400).json({ error: 'Senha incorreta'})
            
        } else { //Se o usuário não existe
            res.status(400).json({ error: 'Usuário incorreto'})
        }
    } catch (error) { //Erro de conexão
        res.status(400).json({ error })
    }
})

module.exports = router