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
            })
     )
     
})

// Update
router.put('/:id', isLoggedIn, async(req,res) => {
    const { username } = req.user
    req.body.username = username
    
    res.json(
        await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(log.green("DATABASE STATUS","Document Updated"))
        .catch((error) => {
            res.status(400).json({ error })
        })
    
    )
})

// Delete
router.delete('/:id', isLoggedIn, async(req,res) => {
    const { username } = req.user
    req.body.username = username

    res.json(
        await Todo.findByIdAndDelete(req.params.id)
        .then(log.yellow("DATABASE STATUS","Document Deleted"))
        .catch((error) => {
            res.status(400).json({ error })
        })
    )
})

module.exports = router