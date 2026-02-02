const teacherServices = require('../services/teacherServices')


const teacherController = {
    async createTeacher(req, res) {
        try {
            const newTeacher = await teacherServices.createTeacher(req.validatedBody)
            res.status(201).json({
                success: true,
                message: 'Teacher created successfully',
                data: newTeacher,
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message })
        }
    },

    async getAllTeachers(req, res) {
        try {
            const teachers = await teacherServices.getAllTeachers()
            res.status(200).json({
                success: true,
                data: teachers,
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async getTeacherById(req, res) {
        try {
            const teacher = await teacherServices.getTeacherById(req.validatedParams.id)
            res.status(200).json({
                success: true,
                data: teacher,
            });
        } catch (error) {
            res.status(404).json({ success: false, message: error.message });
        }
    },
      async getTeacherNameById(req, res) {
        try {
            const teacher = await teacherServices.getTeacherNameById(req.validatedParams.id)
            res.status(200).json({
                success: true,
                data: teacher,
            });
        } catch (error) {
            res.status(404).json({ success: false, message: error.message });
        }
    },
    async updateTeacherById(req, res) {
        try {
            const updatedTeacher = await teacherServices.updateTeacher(req.validatedParams.id, req.validatedBody)
            res.status(200).json({
                success: true,
                message: 'Teacher updated successfully',
                data: updatedTeacher,
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }

    },
        async assignGradesToTeacher(req, res) {
        try {
            const gradesToTeacher = await teacherServices.assignGradesToTeacher(req.validatedParams.id, req.validatedBody)
            res.status(200).json({
                success: true,
                message: 'grades assigned successfully',
                data: gradesToTeacher,
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }

    },
    async assignStudentsToTeacher (req, res) {
        try {
            const assigning =  await teacherServices.assignStudentsToTeacher(req.validatedParams.id, req.validatedBody) 
            res.status(200).json({
                success: true,
                message: 'Students assigned successfully',
                data: assigning,
            });
        }catch(error) {
              res.status(400).json({ success: false, message: error.message });
        }
    },
    async reassignStudentsToTeacher (req, res) {
        try {
            const reassigning =  await teacherServices.removeAssignStudentFromTeacher(req.validatedParams.id, req.validatedBody) 
            res.status(200).json({
                success: true,
                message: 'Students unassigned successfully',
                data: reassigning,
            });
        }catch(error) {
              res.status(400).json({ success: false, message: error.message });
        }
    },
    async getAllStudentsByTeacher(req, res) {
        try {
              const students =  await teacherServices.getAllStudentsByTeacher(req.validatedParams.id) 
        res.status(200).json({
                success: true,
                data: students,
            });
        }catch(error) {
              res.status(400).json({ success: false, message: error.message });
        }
    }

}

module.exports = teacherController 