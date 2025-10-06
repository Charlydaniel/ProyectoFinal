import workspace_member from "../models/workspace_members.model.js"
import serverError from "../utils/customError.utils.js"

class MemberWokspaceRepository {

    static async getAllWorkspacesByUserId(user_id) {
        //Traer todos los workspaces de los cuales es miembro el usuario
        //USAMOS POPULATE PARA EXPANDIR LA CONSULTA HACIA LA TABLA WORKSPACE
        const workspace_are_member = await workspace_member.find({ user: user_id })
        .populate(
            {
              path:'workspace',
             match:{active:true}
            }
        )
        console.log(workspace_are_member)
    }
    static async getMemberWorkspaceByUserIdAndWorkspaceId(user_id, workspace_id) {
        const member_workspace = await workspace_member.findOne({ user: user_id, workspace: workspace_id })
        return member_workspace
    }
    static async create(user_id, workspace_id, role = 'member') {

        is_member_prev = await member_workspace.MemberWokspaceRepository.
            getMemberWorkspaceByUserIdAndWorkspaceId(user_id, workspace_id)

        if (is_member_prev) {
            throw new serverError(400, `El usuario ya es miembro del workspace`)
        }
        await workspace_member.insertOne({
            user: user_id,
            workspace: workspace_id,
            role: role
        })
    }
}
export default MemberWokspaceRepository