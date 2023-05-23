import { userModel } from "../models/user.models.js";

class UserDao {
  async getUsers() {
    return await userModel.find();
  }

  async getUserById(id) {
    return await userModel.findOne({ _id: id });
  }

  async getUserByEmail(email) {
    return await userModel.findOne({ email });
  }

  async createUser(data) {
    return await userModel.create(data);
  }

  async updateUser(id, data) {

    console.log('Actualizando informacion del Usuario')

    if (data.name) { // Si estamos actualizando el rol del usuario
      console.log("Actualizando rol de usuario")
      await userModel.findOneAndUpdate(
        { _id: id },
        { $pull: { documents: { name: data.name } } },
        { new: true },
        async (err, userActualizado) => {
          if (err) {
            console.error(err);
            // Manejar el error
          } else {
            // Buscar si ya existe un objeto con el mismo nombre
            const objetoExistente = userActualizado.documents.find(doc => doc.name === data.name);

            // Si existe, reemplazarlo; de lo contrario, agregarlo al arreglo
            if (objetoExistente) {
              objetoExistente.reference = data.reference;
            } else {
              userActualizado.documents.push(data);
            }

            // Guardar los cambios en la base de datos
            try {
              const resultado = await userActualizado.save();
              console.log(resultado);
              // El usuario ha sido actualizado correctamente
            } catch (error) {
              console.error(error);
              // Manejar el error al guardar los cambios
            }
          }
        }
      );
    } else {
      await userModel.updateOne({ _id: id }, { $set: data });
    }

  }

  async deleteUser(id) {
    return await userModel.deleteOne({ _id: id });
  }

  async getUserByToken(token) {
    try {
      return await userModel.find({ token: token },
        {
          password: 0, role: 0, username: 0, _v: 0, restoreToken: 0, age: 0, __v
            : 0
        }
      )

    } catch (error) {
      return error;

    }

  }

}

export default new UserDao()
