// La capa de control se va a encargar de manejar la consulta y la respuesta

import validarID from "../utils/validations.utils.js"
import serverError from "../utils/customError.utils.js"
import workspacesRepository from "../Repositories/workspaces.repository.js"


class workspaceController {


    static async post(request, response) {
        //request.body es un objeto donde estará la carga útil enviada por el cliente:
        //Si aplicamos express.json a nuestro body va a estar llegando con el body siempre un objeto

        const name = request.body.name
        const url_image = request.body.image
        let msg = 'Nombre de Workspace invalido: '
        let ok = false
        let status = 201
        const ok_message = 'Workspace creado'
        try {
            if (typeof (name) !== 'string') {
                msg = msg + 'Tipo de dato incorrecto para el workspace'
                status = 400
                throw new serverError(status, msg)
            }
            else if (!name) {
                msg = msg + 'El nombre no puede ser vacio'
                status = 400
                throw new serverError(status, msg)
            }
            else if (name.length > 30) {
                msg = msg + 'No puede superar los 30 caracteres'
                status = 400
                throw new serverError(status, msg)
            }
            else if (await workspacesRepository.getByName(name)) {
                msg = msg + 'El workspace ya existe: No se puede crear un workspace repetido'
                status = 400
                throw new serverError(status, msg)
            }
            else {
                msg = ok_message
                await workspacesRepository.createWorkspace(name, url_image)
                status = 201
                ok = true

                return response.status(status).json(
                    {
                        ok: ok,
                        status: status,
                        message: msg
                    }
                )
            }
        }
        catch (error) {

            console.log(error)

            //Evaluamos si es un error que nosotros definimos
            if (error.status) {
                return response.status(error.status).json(
                    {
                        ok: ok,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            else {

            }
            return response.status(500).json(
                {
                    ok: false,
                    status: 500,
                    message: 'Error interno del servidor'
                }
            )
        }

    }

    static async getAll(request, response) {
        const workspaces = await workspacesRepository.getAll()
        response.json(
            {
                workspaces: workspaces
            }
        )
    }

    static async getById(request, response) {

        const workspace_id = request.params.workspace_id

        try {
            if (validarID(workspace_id)) {

                const workspace = workspacesRepository.getById(workspace_id)

                if (!workspace) {
                    throw new serverError(400, `Workspace_id: ${workspace_id} no encontrado`)
                }
                else {
                    return response.json(
                        {
                            ok: true,
                            message: `Workspace: ${workspace_id} encontrado`,
                            data: {
                                workspace: workspace
                            }
                        }
                    )
                }
            }
            else {

                return response.json(
                    {
                        ok: false,
                        message: `Workspace_id: ${workspace_id} no es correcto`
                    }
                )

            }
        }
        catch (error) {

        }

    }

}

export default workspaceController