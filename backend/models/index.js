
const User = require('./users')
const Grade = require('./grades')
const CoreSubjects = require('./coreSubjects')
const Subjects = require('./subjects')
const Test = require('./tests')
const Question = require('./questions')
const Answer = require('./answers')
const StudentTest = require('./studentTest')
const StudentScore = require('./studentScore')
const StudentAnswer = require('./studentAnswer')


// relation  between  User and Grade, CoreSubject, Subject tables

// User (Teacher) ↔ Grade
User.belongsToMany(Grade, {
    through: 'TeacherGrade',
    foreignKey: 'teacher_id',
    as: 'grades',
    otherKey: 'grade_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Grade.belongsToMany(User, {
    through: 'TeacherGrade',
    as: 'teachers',
    foreignKey: 'grade_id',
    otherKey: 'teacher_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

// User (Teacher) ↔ CoreSubject
User.belongsToMany(CoreSubjects, {
    through: 'TeacherCoreSubject',
    as: 'coreSubjects',
    foreignKey: 'teacher_id',
    otherKey: 'coreSubject_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

CoreSubjects.belongsToMany(User, {
    through: 'TeacherCoreSubject',
    as: 'teachers',
    foreignKey: 'coreSubject_id',
    otherKey: 'teacher_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
// User (Teacher) ↔ Subject
User.belongsToMany(Subjects, {
    through: 'TeacherSubject',
    as: 'subjects',
    foreignKey: 'teacher_id',
    otherKey: 'subject_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Subjects.belongsToMany(User, {
    through: 'TeacherSubject',
    as: 'teachers',
    foreignKey: 'subject_id',
    otherKey: 'teacher_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

// ======================
//  Tests
// ======================

// Teacher → Test
User.hasMany(Test, {
     as: 'tests',
    foreignKey: 'teacher_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Test.belongsTo(User, {
    foreignKey: 'teacher_id',
    as: 'teacher'
})
// Test → Grade/CoreSubject/Subject
Grade.hasMany(Test, {
    foreignKey: 'grade_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'tests'
})
Test.belongsTo(Grade, {
    foreignKey: 'grade_id',
    as: 'grade'
})

Grade.hasMany(CoreSubjects, {
    foreignKey: 'grade_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'coreSubjects',
});
CoreSubjects.belongsTo(Grade, {
    foreignKey: 'grade_id',
    as: 'grade'
});

CoreSubjects.hasMany(Subjects, {
    foreignKey: 'coreSubject_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    as: 'subjects'
});
Subjects.belongsTo(CoreSubjects, {
    foreignKey: 'coreSubject_id',
    as: 'coreSubjects'
});

Grade.hasMany(Subjects, {
    foreignKey: 'grade_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Subjects.belongsTo(Grade, {
    foreignKey: 'grade_id'
});


// Test → CoreSubject
Test.belongsTo(CoreSubjects, {
  foreignKey: 'coreSubject_id',
  as: 'coreSubject'
});

// Test → Subject
Test.belongsTo(Subjects, {
  foreignKey: 'subject_id',
  as: 'subject'
});


// ======================
// Test ↔ Question ↔ Answer
// ======================
Test.hasMany(Question, {
    foreignKey: 'test_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Question.belongsTo(Test, {
    foreignKey: 'test_id',
})
// Question → Answer
Question.hasMany(Answer, {
    foreignKey: 'question_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Answer.belongsTo(Question, {
    foreignKey: 'question_id',
})

// ======================
// Students ↔ Tests
// ======================

User.belongsToMany(Test, {
    through: StudentTest,
    foreignKey: 'user_id',
    otherKey: 'test_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Test.belongsToMany(User, {
    through: StudentTest,
    foreignKey: 'test_id',
    otherKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

StudentTest.belongsTo(User, { foreignKey: 'user_id' });
StudentTest.belongsTo(Test, { foreignKey: 'test_id' });
User.hasMany(StudentTest, { foreignKey: 'user_id' });
Test.hasMany(StudentTest, { foreignKey: 'test_id' });


// ======================
//  Scores
// ======================

User.hasMany(StudentScore, {
    foreignKey: 'student_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
StudentScore.belongsTo(User, { foreignKey: 'student_id' })

// A test can have many scores (one per student)
Test.hasMany(StudentScore, {
    foreignKey: 'test_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
StudentScore.belongsTo(Test, { foreignKey: 'test_id' })

// relation  between  student  and answer



// ======================
// 🔗 Student ↔ Answer
// ======================


StudentTest.hasMany(StudentAnswer, {
    foreignKey: 'studentTest_id',
    onDelete: 'CASCADE'
});
StudentAnswer.belongsTo(StudentTest, {
    foreignKey: 'studentTest_id'
});

// Question ↔ StudentAnswer ↔ Answer
StudentAnswer.belongsTo(Question, {
    foreignKey: 'question_id'
});
StudentAnswer.belongsTo(Answer, {
    foreignKey: 'chosenAnswer_id'
});


// ======================
// Teacher ↔ Student 
// ======================

User.belongsToMany(User, {
    through: "TeacherStudent",
    as: 'students',
    foreignKey: 'teacher_id',
    otherKey: 'student_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
User.belongsToMany(User, {
    through: "TeacherStudent",
    as: 'teachers',
    foreignKey: 'student_id',
    otherKey: 'teacher_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

// ======================
// StudentTest ↔ StudentScore  
// ======================

StudentTest.hasOne(StudentScore, {
  foreignKey: 'test_id',   
  sourceKey: 'test_id',
  as: 'score'               
});

StudentScore.belongsTo(StudentTest, {
  foreignKey: 'test_id',
  targetKey: 'test_id',
  as: 'studentTest'
});





module.exports = {
    Subjects,
    CoreSubjects,
    Grade,
    User,
    Test,
    Question,
    Answer,
    StudentTest,
    StudentScore,
    StudentAnswer
}

