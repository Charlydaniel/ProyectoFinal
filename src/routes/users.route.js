import express from 'express'
import User_controller from '../controllers/user.controller.js'


const user_router = express.Router()


// ENTONCES PODEMOS USAR .JSON, ES LA FORMA MAS CORRECTA:
//Si vamos a ejecutar funciones async debemos pasar una funcion async como parametro tambien:

user_router.get('/', User_controller.getAll)

user_router.get('/:user_id', User_controller.getBiId)

//Ahora se va a manejar desde el auth controller para la autenticacion con clave hasheada
//user_router.post('/', User_controller.createUser)

user_router.put('/:user_id',User_controller.updateBiId)

export default user_router

