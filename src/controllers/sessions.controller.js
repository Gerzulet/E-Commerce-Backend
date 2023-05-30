import sessionValidator from '../validators/session.validator.js'
import jwt from "jsonwebtoken";
import currentUserDTO from '../dao/DTO/currentUser.dto.js';
import { UserService as sessionServices } from '../repositories/index.js'
import config from "../config/config.js";
import nodemailer from 'nodemailer'



const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 3000,
  auth: {
    user: config.mail_account,
    pass: config.mail_pass
  }
})


class sessionsController {

  async getLoginPage(req, res) {
    res.render('login', { styleRoute: `<link href="/styles/login.css" rel="stylesheet">` })
  }

  async getCurrentProfile(req, res) {
    res.render('current', { user: req.user })
  }

  async getRegisterPage(req, res) {
    res.render('register', { styleRoute: `<link href="/styles/register.css" rel="stylesheet">` })
  }

  async postToRegister(req, res) {
    console.log("Intentando registrar")
    if (req.user.message === "Usuario ya existe") {
      res.status(409).json({ message: "Usuaro ya existe" })
    } else {
      res.status(201).json({ message: "Usuario creado exitosamente" })

    }
  }



  async logout(req, res) {
    req.logger.info("Session terminated")
    res.clearCookie('coderCokieToken')
    res.redirect("/api")
  }


  async failedRegister(req, res) {
    req.logger.error("Register did not work")
    res.send({ status: 'failure', message: "Ha ocurrido un problema en la registracion" })
  }

  async postToLogin(req, res) {
    const { email, password } = req.body;
    req.logger.debug(`Mail : ${email}`)
    req.logger.debug(`Password: ${password}`)

    const checkedAccount = await sessionValidator.checkAccount(email, password)
    const userToSign = new currentUserDTO(checkedAccount)

    if (checkedAccount === 'NoMailNorPassword') return res.status(404).json({ message: "No mail or password " })
    if (checkedAccount === 'NoUser') return res.status(404).json({ message: "No User found" })
    if (checkedAccount === 'IncorrectPassword') return res.status(404).json({ message: "Incorrect password" })
    if (checkedAccount) {
      await sessionServices.updateUser(checkedAccount._id, { last_connection: new Date() })
      const token = jwt.sign({ user: userToSign.email, role: userToSign.role, phone: userToSign.phone, userID: checkedAccount._id, userName: checkedAccount.username }, 'coderSecret');
      res.cookie('coderCokieToken', token, { maxAge: 60 * 60 * 60 * 60, httpOnly: false, withCredentials: false });
      req.logger.info("User is logged in ")
      res.redirect('/api')


    }

  }

  async getFailedRegisterPage(req, res) {
    req.logger.error("Register did not work")
    res.json({ status: 'failure', message: 'Ha ocurrido un error en el registro' })

  }
  async getRestorePage(req, res) {
    req.logger.info("To restore password")
    res.render('restore', { styleRoute: `<link href="/styles/restore.css" rel="stylesheet">` })

  }


  async restore(req, res) {
    req.logger.info("To restore password")
    const { email } = req.body;
    req.logger.debug(`Email enviado para restaurar contraseña: ${email}`)



    try {
      const token = await sessionValidator.restore(email)
      if (token) {
        await transport.sendMail({
          from: 'German <german.alejandrozulet@gmail.com>',
          to: email,
          subject: 'Restore password',
          html: `
         <div>
          <h1> Hi! You can restore your password, follow this link</h1>
<h3>http://localhost:${config.PORT}/api/session/updateUser/${token}</h3>

        </div> 
`, attachments: []

        })

        res.status(200).json({ message: "Se te ha enviado un mail, abrelo y restaura tu contraseña" })

      } else {
        res.status(404).json({ message: "No se ha encontrado el usuario" })
      }


    } catch (error) {
      res.status(404).json({ message: error.message, error: error })

    }


  }



  async getUpdateUserPage(req, res) {

    const token = (req.params.token)
    req.logger.debug(`El token enviado por mail es ${token}`)
    const response = await sessionValidator.validateToken(token)
    console.log(response)
    if (!response.token) {
      res.render('restore', {
        update: false,
        message: "Token inexistente",
        styleRoute: `<link href="/styles/restore.css" rel="stylesheet">`

      })
    }
    req.logger.debug(`La respuesta del servidor con respecto al token ha sido ${response}`)
    if (response === 'token caducado') {

      res.render('restore', {
        update: false, message: 'Token caducado'
      })



    } else if (response) {
      res.render('restore', {
        update: true,
        token: response.token,
        message: "",
        styleRoute: `<link href="/styles/restore.css" rel="stylesheet">`
      })

    }
    else {
      res.render('restore', { message: "Debes estar logueado en esta cuenta para realizar cambios" })
    }
  }

  async updateUser(req, res) {


    const { newPassword } = req.body
    const token = (req.params.token)
    req.logger.http("Entrando en ruta updateUser")
    req.logger.debug(`El token es ${token} y la nueva contraseña es ${newPassword}`)



    try {
      const response = await sessionValidator.updateUser(token, newPassword)
      req.logger.debug("Updated!")
      res.json({ message: "Updated" })

    } catch (error) {
      req.logger.error("Contraseña Repetida")
      if (error === "No Token found") res.status(404).json({ error: error.message })
      res.status(401).json({ error: error.message })

    }


  }



}



export default new sessionsController()
