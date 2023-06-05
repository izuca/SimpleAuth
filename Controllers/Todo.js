const { Router } = require('express')
const Todo = require("../Models/Todo")
const { isLoggedIn }  = require('./middleware')
const { log } = require('mercedlogger')

//Instanciando o roteamento
const router = Router()

// Read
router.get('/', isLoggedIn, async(req,res) => {
    //pega o username do middleware
    const { username } = req.user
    //envia o todo list desse usuário
    res.json(
        await Todo.find({ username })
            .catch((error) => res.status(400).json({ error: "error" }))
    )
})

//Read id
router.get('/:id', isLoggedIn, async(req,res) => {
    //Busca o id da task
    res.json( 
        await Todo.findById(req.params.id)
        .catch((error) => res.status(400).json({ error }))
    )
        
})

// Create
router.post('/', isLoggedIn, async (req,res) => {
    const { username } = req.user
    req.body.username = username
     res.json(
         await Todo.create( req.body )
            .then(log.green("DATABASE STATUS","New Document"))
            .catch((error) => {
                res.status(400).json({ error })
            }),
     )
     
})

// router.update('/:id', isLoggedIn, async(req,res) => {
//     //checar se a task existe
//     const taskId = Todo.findById(req.headers.id)

// })
// Update
// Delete


module.exports = router