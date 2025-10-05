import mongoose from 'mongoose'
import ENVIRONMENT from './environment.js'

//console.log(ENVIRONMENT)

async function connectMongoDb(){
    try{
        await mongoose.connect(ENVIRONMENT.MONGO_DB_CONNECTION_STRING)
        console.log("Conexión exitosa con MongoDB")
    }
    catch(error){
        console.error("Falló la conexión a MongoDB")
        console.log(error)
    }
    
} export default connectMongoDb