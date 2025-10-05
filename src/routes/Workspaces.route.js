import express from 'express'
import workspaceController from '../controllers/workspace.controller.js'


//Aca estamos creando un enrutador desde express:

const workspace_router = express.Router()

//Cuando me consulten a esta direccion respondere con la lista de espacios de trabajo guardada en mi DB
workspace_router.get('/', workspaceController.getAll)
workspace_router.get('/test', (request, response) => {
    response.send('mensaje recibido en /api/workspaces/test')
})

//Endpoint para crear workspaces:
workspace_router.post('/new_workspace',workspaceController.post)

//Route param o URL param
//Usamos esta vez request, la propiedad params es donde estan los valores de parametros de busqueda
//EJEMPLO: Si la ruta es /workspaces/:workspace_id, entonces request.params será un objeto
// que va a tener la propiedad workspace_id:valor_workspace_id, siempre será un string

workspace_router.get('/:workspace_id',workspaceController.getById)

export default workspace_router


