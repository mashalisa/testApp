const { Sequelize } = require('sequelize')
const { Test, User, Grade, CoreSubjects, Subjects, Question, Answer, StudentTest, StudentScore } = require('../models')

const getStatisticInfo = async (teacherId) => {

    const tests = await StudentTest.findAll({
        where: { status: 'completed' },
        include: [{
            model: Test,
            where: { teacher_id: teacherId },
            attributes: ['id', 'name'],
            include: [
                {
                    model: Grade,
                    as: 'grade',
                    attributes: ['id', 'name'],
                },
                {
                    model: CoreSubjects,
                    as: 'coreSubject',
                    attributes: ['id', 'name'],
                },
                {
                    model: Subjects,
                    as: 'subject',
                    attributes: ['id', 'name'],
                }
            ]

        }, {
            model: User,
            attributes: ['id', 'name', 'email']
        }, {
            model: StudentScore,
            as: 'score',
            attributes: ['total_questions', 'correct_answers', 'score'],
            required: false,
            where: Sequelize.where(
                Sequelize.col('score.student_id'),
                Sequelize.col('StudentTest.user_id')
            )
        }


        ]

    })

    return tests.map(item => {
        const test = item.Test;
       const grade = test.grade;
        const core = test.coreSubject;
        const subject = test.subject;
        const startTime = item.start_time;
        const endTime = item.end_time
        const timeDuration =
        startTime && endTime
            ? new Date(endTime) - new Date(startTime)
            : null;

        const score = item.score
        console.log(
            JSON.stringify(test.grade, null, 2),
            'GRADE TREE'
        )
        console.log(subject, 'subject')

        return {
            
            studentId: item.User.id,
            studentName: item.User.name,
            
            testId: item.Test.id,
            testName: item.Test.name,

         grade: grade?.name || null,
  coreSubject: core?.name || null,
  subject: subject?.name || null,

            score: score?.score,
            correct: score?.correct_answers,
            total: score?.total_questions,


            durationMs: timeDuration,
        durationMinutes: timeDuration ? Math.round(timeDuration / 60000) : null,

        
            status:
                score?.score >= 90 ? 'top' :
                    score?.score >= 60 ? 'pass' :
                        'fail'

                        
        }
    })


}






module.exports = {
    getStatisticInfo
}