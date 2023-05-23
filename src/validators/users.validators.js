import { UserService } from "../repositories/index.js"

class usersValidator {

  async getUsers() {
    const users = await UserService.getUsers()
    return users
  }


  async changeRole(role, uid) {
    if (!role) throw new Error("Missing role")
    if (!uid) throw new Error("Missing UID")
    if (!await UserService.getUserById(uid)) throw new Error("User not found")

    try {
      await UserService.updateUser(uid, { role: role })
    } catch (error) {
      return error
    }

  }




  async updateUserDocuments(uid, data) {
    if (!uid) throw new Error("Missing UID")
    if (!data) throw new Error("Missing DATA")
    if (!await UserService.getUserById(uid)) throw new Error("User not found")
    console.log("uploading user")
    const nombreArr = Object.keys(data)[0]
    const documents = []
    documents.push({ name: data[nombreArr][0].fieldname, reference: data[nombreArr][0].path })
    const document = ({ name: data[nombreArr][0].fieldname, reference: data[nombreArr][0].path })


    try {
      await UserService.updateUser(uid, document)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }





  }
}

export default new usersValidator()
