import mongoose from "mongoose"
import Users from "./user.model.js"

const workspacesMemberSchemma = new mongoose.Schema(
    {
        id:{
            type:String,
            required:true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
        workspace:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Workspaces",
            required:true
        },
        created_at:{
            type:Date,
            default: Date.now,
        },
        role:{
            type:String,
            enum:['admin','member'],
            default:'member',
            created_at:{
                type:Date,
                default:Date.now
            }
        }
    }
)
const workspace_member=mongoose.model('member_workspace', workspacesMemberSchemma);
export default workspace_member