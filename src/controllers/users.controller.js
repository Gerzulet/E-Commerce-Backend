import usersValidators from '../validators/users.validators.js'
import usersValidator from '../validators/users.validators.js'

class usersController {


  async getDocumentsPage(req, res) {
    req.logger.info("Documents page")
    let user = req.user
    res.render('documents', { title: "Users", username: user.user, user: user.userID, style: `<link hrel="stylesheet" ref="../styles/register.css" >` })
  }

  async changeRolePage(req, res) {
    const users = await usersValidator.getUsers()

    res.render('changerole', { users, style: `<link href="/styles/users.css" rel="stylesheet">` })
  }

  async changeRole(req, res) {
    const uid = req.params.uid
    const { role } = req.body

    try {
      const users = await usersValidator.getUsers()
      await usersValidator.changeRole(role, uid)
      res.render('changerole', { users })
    } catch (error) {
      console.log(error.message)
      res.status(400).json({ message: "An error as occurred" })




    }




  }

  async uploadDocs(req, res) {
    req.logger.debug("Uploading documents... ")


    const uid = req.params.uid
    const data = req.files


    try {
      const response = await usersValidator.updateUserDocuments(uid, data)
      res.render('documents', { message: "Perfil actualizado" })
    } catch (error) {
      res.json({ error: error.message })

    }
  }

}


export default new usersController()


