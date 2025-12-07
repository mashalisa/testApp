const authServices = require('../services/authServices')

const authController = {
    async registerUser(req, res, allowedRole) {
        try {
            const user = await authServices.registerUser(req.validatedBody, allowedRole)
            res.status(201).json({
                success: true,
                data: user
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }

    },
        async login(req, res, allowedRoles) {
        try {
            console.log(req,'req')
            const user = await authServices.loginUser(req.validatedBody, allowedRoles)
            res.status(200).json({
                success: true,
                data: user
            })
        } catch (error) {
            res.status(401).json({
                success: false,
                error: error.message
            })
        }

    }
}

module.exports = authController