const {userModel} = require("./models/users.model")

class UserManagerMongo{

    getUsers = async () => await userModel.find()

    getUserById = (id) => {

    }

    addUser = async (newItem) => {
        return await userModel.create(newItem)
    }

    updateUser = async (uid, userToReplace) => {
        return await userModel.updateOne({_id: uid}, userToReplace)
    }

    deleteUser = async (uid) => {
        return await userModel.deleteOne({_id: uid})
    }
}


module.exports = {UserManagerMongo}