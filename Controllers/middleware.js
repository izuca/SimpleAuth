require('dotenv').config()
const jwt = require('jsonwebtoken')

//Middleware para autorização
const isLoggedIn = async (req,res,next) => {
    try {
        //Checa se há um header chamado authorization
        if(req.headers.authorization){
            //Parsing o token
            const token = req.headers.authorization.split(" ")[1]
            if(token){
                //Verifica se o token confere
                const payload = jwt.verify(token,process.env.SECRET)
                if(payload){
                    //Armazena os dados do usuário no objeto
                    req.user = payload

                    //Passa para o próximo middleware
                    next()
                } else {
                    res.status(400).json({ error: 'token verification failed'})
                }
            } else {
                res.status(400).json({ error: "malformed auth header"})
            }
        } else {
            res.status(400).json({ error: "No authorization header"})
        }
    } catch (error) {
        res.status.json({ error })
    }
}

//Exportando middleware

module.export = isLoggedIn