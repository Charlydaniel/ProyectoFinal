import transporter from "../config/mailer.config.js"
import userRepository from "../Repositories/user.repository.js"
import serverError from "../utils/customError.utils.js"
import jwt from 'jsonwebtoken'

//Libreria para encriptacion.
import bcrypt, { compare } from 'bcrypt'
import ENVIRONMENT from "../config/environment.js"

class AuthService {

    static async register(username, password, email) {

        //1-Verificar que el usuario no este repetido
        const user_found = await userRepository.getByEmail(email)

        if (user_found) {
            throw new serverError(409, `No se puede registrar al usuario ${email}: Usuario ya registrado anteriormente`)
        }
        //2-Encriptar la contraseña
        //Hashear la contraseña
        //Parametros: Contraseña y cantidad de rondas, mientras mas rondas mas tardara en procesarse
        const hash_pass = await bcrypt.hash(password, 12)


        //Guardarlo en la base de datos.
        const user_created = await userRepository.createUser(username, email, hash_pass)

        const verification_token = jwt.sign(
            {
                email: email,
                user_id: user_created._id
            },
            ENVIRONMENT.JWT_SECRET_KEY
        )
        //Enviar un mail de verificación
        await transporter.sendMail(
            {
                from: 'utntestmaildev@gmail.com',
                to: 'utntestmaildev@gmail.com',
                subject: 'Correo de verificacion UTN validacion de usuario',
                html: `<h1>Hola desde Node.js<h1/>
                <p>Este es un mail de verificacion<p/>
                <a href='${ENVIRONMENT.URL_API_BACKEND}api/auth/verify-email/${verification_token}'>Click para verificar<a/>`

            }
        )

    }
    static async verifyEmail(verification_token) {
        try {
            const payload = jwt.verify(verification_token, ENVIRONMENT.JWT_SECRET_KEY)

            userRepository.updateById(payload.user_id, {
                verified: true
            })
        }
        catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new serverError(400, 'Token inválido')
            }
            throw error
        }
    }
    static async login(user_found) {

        const authorization_token = jwt.sign({
            id: user_found._id,
            name: user_found.name,
            email: user_found.email,
            created_at: user_found.created_at
        },
            ENVIRONMENT.JWT_SECRET_KEY,
            {
                expiresIn: '7d'
            })

        userRepository.updateById(user_found._id, { last_session: 
            new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" }) })
            
            return authorization_token
    }
}

export default AuthService