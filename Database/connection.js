require ('dotenv').config()
const mongoose = require('mongoose')
const {log} = require('mercedlogger')

//Conectando ao MONGO
try {
   await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
} catch (error) {
    log.red("DATABASE STATE", error)
}

//Log do Mongo
mongoose.connection
    .on("open", () => log.green("DATABASE STATUS", "Connection Open"))
    .on("close", () => log.magenta("DATABASE STATUS", "Connection Closed"))
    .on("error", (error) => log.red("DATABASE STATUS", error))

module.exports = mongoose
    

