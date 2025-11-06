const authServices = require('../services/authServices')

const authController = {
    async registerUser(req, res, allowedRole) {
        try {
            const user = await authServices.registerUser(req.body, allowedRole)
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
            // console.log(allowedRoles,'allowedRoles')
            const user = await authServices.loginUser(req.body, allowedRoles)
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