import Workspaces from "../models/workspaces.model.js"
import serverError from "../utils/customError.utils.js"


class workspacesRepository {

        static async getAll() {
                //Uso find para buscar todo
                const workspaces = Workspaces.find()
                return workspaces
        }
        static async getById(id) {
                const workspace = Workspaces.findById(id)
                return workspace
        }
        static async getByName(name) {
                const workspace = Workspaces.findOne({name:name})
                console.log(workspace)
                return workspace
        }
        static async createWorkspace(name, url_image) {

                try {
                        await Workspaces.insertOne(
                                {
                                        name: name,
                                        url_image: url_image,
                                }
                        )
                } catch (error) {
                        throw new serverError(401, 'Error al crear el workspace en la base de datos: ' + error)
                }


                return true
        }

}

export default workspacesRepository