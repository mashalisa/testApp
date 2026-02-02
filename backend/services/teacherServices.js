const { Grade, CoreSubjects, Subjects, User, Test } = require('../models')


const getAllTeachers = async () => {
    const teachers = await User.findAll({ where: { role: 'teacher' } });

    if (!teachers || teachers.length === 0) {
        throw new Error('teahcers not founded')
    }

    return teachers
}

const getTeacherById = async (id) => {
    const teacher = await User.findOne({
        where: { id, role: 'teacher' },
        include: [
            {
                model: Grade,
                as: 'grades',
                attributes: ['id', 'name'],
                through: { attributes: [] }
            },
            {
                model: CoreSubjects,
                as: 'coreSubjects',
                attributes: ['id', 'name'],
                through: { attributes: [] }
            },
            {
                model: Subjects,
                as: 'subjects',
                attributes: ['id', 'name'],
                through: { attributes: [] }
            },
            {
                model: Test,
                as: 'tests',
                attributes: ['id', 'name']

            },
        ],
    });
    if (!teacher) {
        throw new Error('Teacher not found');
    }

    return teacher
}
const getTeacherNameById = async (id) => {
    const teacher = await User.findOne({
        where: { id, role: 'teacher' },
        attributes: {
            exclude: [
                'username',
                'role',
                'password',
                'phoneNumber',
                'address',
                'birthDate',
                'profilePicture',
                'createdAt',
                'updatedAt'
            ]
        }
    });
    if (!teacher) {
        throw new Error('Teacher not found');
    }

    return teacher
}
const assignGradesToTeacher = async (id, data) => {
    const { grades, coreSubjects, subjects } = data;
    const teacher = await User.findOne({ where: { id, role: 'teacher' } });
    if (!teacher) {
        throw new Error('the teacher not found')
    }


    if (grades && grades.length > 0) {
        const gradeRecords = await Grade.findAll({ where: { name: grades } });
        if (gradeRecords.length === 0) throw new Error('No valid grades found');
        await teacher.addGrades(gradeRecords.map(g => g.id)); // setGrades replaces existing ones
    }

    if (coreSubjects && coreSubjects.length > 0) {
        const coreRecords = await CoreSubjects.findAll({ where: { name: coreSubjects } });
        if (coreRecords.length === 0) throw new Error('No valid core subjects found');
        await teacher.addCoreSubjects(coreRecords.map(c => c.id));
    }


    if (subjects && subjects.length > 0) {
        const subjectRecords = await Subjects.findAll({ where: { name: subjects } });
        if (subjectRecords.length === 0) throw new Error('No valid subjects found');
        await teacher.addSubjects(subjectRecords.map(s => s.id));
    }

    return await User.findOne({
        where: { id },
        include: [
            { model: Grade, as: 'grades', attributes: ['id', 'name'], through: { attributes: [] } },
            { model: CoreSubjects, as: 'coreSubjects', attributes: ['id', 'name'], through: { attributes: [] } },
            { model: Subjects, as: 'subjects', attributes: ['id', 'name'], through: { attributes: [] } },
        ]
    });
}
const updateTeacher = async (id, teacherData) => {
    const teacher = await User.findOne({ where: { id, role: 'teacher' } });
    if (!teacher) {
        throw new Error('the teacher not found')
    }



    if (teacherData.grades) {
        if (teacherData.grades.length === 0) {
            await teacher.setGrades([]);
        } else {
            const grade = await Grade.findAll({ where: { name: teacherData.grades } });
            const grade_ids = grade.map(g => g.id);
            await teacher.setGrades(grade_ids);
        }
    }

    if (teacherData.coreSubjects) {
        if (teacherData.coreSubjects.length === 0) {
            await teacher.setCoreSubjects([]);
        } else {
            const coreSubjects = await CoreSubjects.findAll({ where: { name: teacherData.coreSubjects } });
            const coreSubjects_ids = coreSubjects.map(c => c.id);
            await teacher.setCoreSubjects(coreSubjects_ids);
        }
    }

    if (teacherData.subjects) {
        if (teacherData.subjects.length === 0) {
            await teacher.setSubjects([]);
        } else {
            const subjects = await Subjects.findAll({ where: { name: teacherData.subjects } });
            const subjects_ids = subjects.map(s => s.id);
            await teacher.setSubjects(subjects_ids);
        }
    }
    return teacher

}




const assignStudentsToTeacher = async (teacherId, studentsData) => {
    const teacher = await User.findByPk(teacherId)
    if (!teacher) {
        throw new Error('the teacher not found')
    }
    const students_ids = studentsData.students
    console.log(students_ids, 'students_ids')
    if (!Array.isArray(students_ids)) {
        throw new Error('Students should be an array');
    }


    const existingStudents = await User.findAll({
        where: { id: students_ids, role: 'student' }
    });

    if (existingStudents.length === 0) {
        throw new Error('No valid students found');
    }

    //  await teacher.addStudents(existingStudents.map(s => s.id));
    // await teacher.addStudents(students_ids);
    await teacher.setStudents(students_ids);
    return await teacher.getStudents();
}

const removeAssignStudentFromTeacher = async (teacherId, studentsData) => {
    const teacher = await User.findByPk(teacherId);
    if (!teacher) throw new Error('Teacher not found');

    if (!Array.isArray(studentsData.students) || studentsData.students.length === 0) {
        throw new Error('students should be a non-empty array');
    }

    // Fetch actual User instances that are currently assigned
    const existingStudents = await teacher.getStudents({
        where: { id: studentsData.students }
    });

    if (existingStudents.length === 0) {
        throw new Error('No matching students found to remove');
    }
    console.log(existingStudents, 'existingStudents')
    // Remove using Sequelize instances
    await teacher.removeStudents(existingStudents);

    // Return remaining students
    return await teacher.getStudents();
};

const getAllStudentsByTeacher = async (id) => {
    console.log(id, 'teacherId')
    const teacher = await User.findByPk(id, {
        include: [{
            model: User,
            as: 'students'
        }]
    })
    if (!teacher) throw new Error('Teacher not found');

    return teacher.students;
}
module.exports = {
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    assignStudentsToTeacher,
    removeAssignStudentFromTeacher,
    assignGradesToTeacher,
    getAllStudentsByTeacher,
    getTeacherNameById
}

