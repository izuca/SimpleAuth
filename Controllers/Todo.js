const { Router } = require('express')
const Todo = require("../Models/Todo")
const { isLoggedIn } = require('./middleware')


//Instanciando o roteamento
const router = Router()

// Read
router.get('/', isLoggedIn, async(req,res) => {
    //pega o username do middleware
    const { username } = req.user
    console.log(req.user)
    //envia o todo list desse usuário
    res.json(
        await Todo.find({ username })
            .catch((error) => res.status(400).json({ error }))
    )
})

//Read id
router.get('/:id', isLoggedIn, async(req,res) => {
    //Busca o id da task
    res.json( await Todo.findById(req.params.id))
        .catch((error) => res.status(400).json({ error }))
})

// Create
router.post('/', isLoggedIn, async (req,res) => {
    //
    const newTask = new Todo({ 
        username: req.params.username,
        reminder: req.params.reminder
     })
     try {
         await newTask.save
         console.log("Task salva")
         console.log(newTask)
     } catch (error) {
        res.status(400).json({ error })
     }
     
})

// router.update('/:id', isLoggedIn, async(req,res) => {
//     //checar se a task existe
//     const taskId = Todo.findById(req.headers.id)

// })
// Update
// Delete


module.exports = router