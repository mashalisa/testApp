const  userService = require ('../services/userServices')


const userController = {
    async createUser(req, res) {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser) //201 Created
        }catch(error) {
            res.status(400).json({error: error.message}) //400 Bad Request
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch(error) {
            res.status(500).json({error: error.message}) //Internal Server Error
        }
    },

    async getUserById(req, res) {
        try {
         const user = await userService.getUserById(req.params.id)
        res.status(200).json(user)
        } catch (error) {
            res.status(404).json({error: error.message}) //404 Not Found
        }
       
    },

    async updateUser(req, res) {
        try {
            const updatedUser = await userService.updateUser(req.params.id, req.body)
             res.status(200).json(updatedUser);
        }catch (error) {
             res.status(400).json({ error: error.message });
         }
    },
     async deleteUser(req, res) {
        try {
         const user = await userService.deleteUser(req.params.id)
        res.status(200).json(user)
        } catch (error) {
            res.status(404).json({error: error.message})
        }
       
    },

}

module.exports  = userController