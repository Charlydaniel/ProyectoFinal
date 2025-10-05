import nodemailer from 'nodemailer'
import ENVIRONMENT from './environment.js'

//va a transportar la configuracion para nuestra mailer
const transporter=nodemailer.createTransport(
    {
        service:'gmail',
        auth:{
            user:'utntestmaildev@gmail.com',
            pass:ENVIRONMENT.GMAIL_PASSWORD
        }
    }
)
export default transporter