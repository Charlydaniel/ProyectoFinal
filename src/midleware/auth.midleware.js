import ENVIRONMENT from "../config/environment"
import serverError from "../utils/customError.utils"
import jwt from 'jsonwebtoken'

//Funcion que se ejecuta antes de nuestros controladores.
export const authMidleware = (request, response, next) => {
    //El token de autorizacion se suele pasar por Header.
    //Especificamente por el header autorization
    //Formato esperado: 'Bearer token_value'

    try {

        authorization_header = request.headers.authorization
        const auth_token = authorization_header.split(' ').pop()

        if (authorization_header) {
            new serverError(400, 'No hay Header de autorizacion')
        }
        if (auth_token) {
            new serverError(400, 'No hay token de autorizacion')
        }
        const user_data= jwt.verify(auth_token,ENVIRONMENT.JWT_SECRET_KEY)
        //Guardamos los datos del token en la request.
        //Para que otros controladores puedan acceder a quien es el usuario
        //ESTAMOS HACIENDO UNA SESION.

        request.user=user_data
        next()
    }
    catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
            return response.stat(401).json(
                {
                    ok:false,
                    status:401,
                    message: 'Token invalido'
                }
            )
        }
          if(error instanceof jwt.TokenExpiredError){
            return response.stat(401).json(
                {
                    ok:false,
                    status:401,
                    message: 'Token Token expirado'
                }
            )
        }
        if (error.status) {
            return response.status(error.status).json(
                {
                    ok: false,
                    message: error.message
                }
            )
        }
        else {
            return response.status(500).json(
                {
                    ok: false,
                    message: 'Error interno del servidor' + error
                }
            )
        }
    }


}