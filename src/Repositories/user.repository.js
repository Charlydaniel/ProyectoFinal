import Users from "../models/user.model.js";

class userRepository{
    //Los metodos estaticos se guardan en la clase y pueden ser instanciados dentro de la misma clase,
    // Sin necesidad de instanciar la clase. Algo similar a una función.
    //No es necesario hacer new userRepository()
    //Se usa Static para no tener mas de una instancia, ya que no necesitamos que se instancie mas de una 
    //vez en este caso particular.

    static async createUser(name,email,password){
       
       const new_user= await Users.insertOne({
            name:name,
            email:email,
            password:password
        })
        return new_user
    } 

    static async getAll(){
        //Uso find para buscar todo
       const users= Users.find()
       return users
    }

    static async deleteBiId(user_id){
       await Users.findByIdAndDelete(user_id)
       return true
    }
    static async getById(user_id){
        const user= await Users.findById(user_id)
        return user

    }
    static async updateById(user_id,new_values){
       const user_updated= await Users.findByIdAndUpdate(user_id, new_values,
                                { new:true, runValidators: true} //Se hace para que cuando se haga la upd nos traiga el objeto actualizado
                                )
        return user_updated

    }
    static async getByEmail(email){
   
        const user_found= await Users.findOne({email:email})
     
        return user_found
    }
}

export default userRepository
