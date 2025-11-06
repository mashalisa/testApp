const testServices = require('../services/testServices')

const testController = {



    async getAllTest(req, res) {
        try {
            const tests = await testServices.getAllTest()
            res.status(200).json({
                success: true,
                data: tests
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                data: error.message
            })
        }

    },
    async getTestById(req, res) {
        try {
            const test = await testServices.getTestById(req.params.id, req.body)
            res.status(200).json({
                success: true,
                data: test
            })
        } catch (error) {
            res.status(404).json({
                success: false,
                data: error.message
            })
        }

    },
    async createTest(req, res) {
        try {
            const test = await testServices.createTest(req.params.teacherId, req.body)
            res.status(201).json({
                success: true,
                data: test
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                data: error.message
            })
        }

    },
    async updateTest(req, res) {
        try {
            const updateTest = await testServices.updateTestById(req.params.id, req.body)
            res.status(200).json({
                success: true,
                data: updateTest
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                data: error.message
            })
        }

    },
    async deleteTest(req, res) {
        try {
            const deletedtest = await testServices.deleteTestById(req.params.id, req.body)
            res.status(200).json({
                success: true,
                data: deletedtest
            })
        } catch (error) {
            res.status(404).json({
                success: false,
                data: error.message
            })
        }

    }
}
module.exports = testController