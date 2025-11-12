# Exam App

A comprehensive exam management system with backend API and frontend interface.

## 🔁 Backend Review (Nov 2025)

Latest audit observations:

1. **Subject controller still expects wrapped payloads**
   ```53:56:backend/controllers/subjectController.js
const { data } = req.body;
if (!data) {
  return res.status(400).json({ error: 'missing' });
}
   ```
   Routes require `{ data: { name, gradeId, coreSubjectId } }`. If the frontend sends a flat JSON body (more typical), this branch rejects it. Consider unwrapping the body in the controller or update the contract to clarify.

2. **Subject service validation typo**
   ```70:72:backend/services/subjectsServices.js
if (typeof name !== 'string' || !name.trim()) {
  throw new Error('Missing core subject name');
}
   ```
   Message should say “Invalid subject name” (currently references core subjects). Everything else looks correct: FKs are persisted properly and the grade/core-subject relationship is enforced.

3. **Core subject service/enforcement** ✅
   - `createNewCoreSubject` and `updateCoreSubject` now validate `gradeId`, ensure the grade exists, and prevent duplicates within the same grade.

4. **Model relationships** ✅
   - `Subjects` table includes `coreSubject_id` and `grade_id`.
   - Associations (`Grade.hasMany(CoreSubject)`, `CoreSubject.hasMany(Subject)`, etc.) match the schema.

5. **Integration tests** ✅
   - `seedTestData` seeds the hierarchy and your student flow test uses the returned IDs. Run `npm test` with SQLite or a test DB to verify everything stays green.

### Recommended next steps
- Decide on a consistent controller request shape (wrapped `data` vs flat body). Update Swagger and the frontend accordingly.
- Tweak the subject validation message for clarity.
- Run the integration suite after changes, then refresh Swagger docs for the new FKs.

## Backend Documentation

### Overview

The backend is built with **Node.js** and **Express.js**, using **Sequelize ORM** for database management with **MySQL**. The API includes JWT-based authentication, role-based access control, and Swagger documentation.




### Database Models

#### Core Models

1. **User** - Represents users (admin, teacher, student)
2. **Grade** - Grade levels (e.g., 1st grade, 2nd grade)
3. **CoreSubject** - Core subjects (e.g., Math, Science)
4. **Subject** - Specific subjects within core subjects
5. **Test** - Examination tests created by teachers
6. **Question** - Questions within tests
7. **Answer** - Answer options for questions
8. **StudentTest** - Association between students and tests
9. **StudentScore** - Student scores for completed tests
10. **StudentAnswer** - Individual answers submitted by students

#### Database Relationships

- **Teacher ↔ Grade**: Many-to-many (TeacherGrade join table)
- **Teacher ↔ CoreSubject**: Many-to-many (TeacherCoreSubject join table)
- **Teacher ↔ Subject**: Many-to-many (TeacherSubject join table)
- **Teacher → Test**: One-to-many (Teacher creates tests)
- **Test → Grade/CoreSubject/Subject**: Many-to-one (Test belongs to grade/subject)
- **Test → Question**: One-to-many (Test has multiple questions)
- **Question → Answer**: One-to-many (Question has multiple answer options)
- **Student ↔ Test**: Many-to-many (StudentTest join table)
- **Student → StudentScore**: One-to-many (Student has multiple scores)
- **Test → StudentScore**: One-to-many (Test has multiple student scores)
- **StudentTest → StudentAnswer**: One-to-many (StudentTest has multiple answers)
- **StudentAnswer → Question**: Many-to-one (Answer belongs to question)
- **StudentAnswer → Answer**: Many-to-one (Answer references chosen answer)
- **Teacher ↔ Student**: Many-to-many (TeacherStudent join table)

### API Routes

#### Authentication Routes (`/autorization`)
- `POST /autorization/teachers/signup` - Register teacher/admin (requires admin token)
- `POST /autorization/students/signup` - Register student
- `POST /autorization/teachers/login` - Login for teachers/admins
- `POST /autorization/students/login` - Login for students
- `GET /autorization/user` - Get current authenticated user (requires token)

#### User Routes (`/api/users`)
- User management endpoints

#### Grade Routes (`/api/grades`)
- Grade level management

#### Core Subject Routes (`/api/coreSubjects`)
- Core subject management

#### Subject Routes (`/api/subjects`)
- Subject management

#### Teacher Routes (`/api/teachers`)
- Teacher-specific operations

#### Test Routes (`/api/tests`)
- Test creation and management

#### Question Routes (`/api/questions`)
- Question management for tests

#### Answer Routes (`/api/answers`)
- Answer option management

#### Student Test Routes (`/api/student-tests`)
- Student test assignments and tracking

#### Student Score Routes (`/api/student-score`)
- Student score retrieval and management

#### Student Answer Routes (`/testAnswers`)
- Student answer submission and retrieval

### Authentication & Authorization

#### JWT Authentication
- Uses JSON Web Tokens for stateless authentication
- Token is passed in `Authorization` header: `Bearer <token>`
- Token includes user information (id, role, etc.)

#### Role-Based Access Control

The middleware provides the following role checks:

1. **authenticateToken** - Verifies JWT token validity
2. **isAdmin** - Restricts access to admin users only
3. **isTeacher** - Restricts access to teacher users only
4. **isStudent** - Restricts access to student users only
5. **isAdminTeacher** - Allows access to both admin and teacher roles

### Environment Variables

Create a `.env` file in the backend directory with:

```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password
DB_HOST=your_database_host
JWT_SECRET=your_jwt_secret_key
```

### Installation & Setup

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables**:
   - Create `.env` file with database and JWT configuration

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Server will run on**: `http://localhost:3000`
5. **Swagger documentation**: `http://localhost:3000/api-docs`

### Database Configuration

The backend uses Sequelize ORM with MySQL. The database connection is configured in `configDB/sequelize.js`:



### API Documentation

Swagger UI is available at `/api-docs` endpoint, providing interactive API documentation with:
- All available endpoints
- Request/response schemas
- Authentication requirements
- Example requests

### ✅ Final Review & Suggestions

- ✅ **Hierarchical models** — `Grade`, `CoreSubject`, and `Subject` now have proper FK columns and associations. Controllers/services correctly validate grade/core-subject assignments.
- ⚠️ **Controller payload shape** — `createSubject`/`updateSubject` and the core subject equivalents still expect `{ data: { … } }`. Consider accepting flat JSON to simplify frontend integration (or document the wrapper explicitly).
- ⚠️ **Validation messages** — Tweak phrases like “Missing core subject name” (when validating subjects) for clarity.
- ✅ **Integration coverage** — `seedTestData` and `studentFlow.test.js` now exercise the end-to-end path (teacher assigns, student submits, score calculated). Run `npm test` after any schema change.
- ⚠️ **Swagger** — Update the docs to reflect the new request/response structures (grade/core-subject IDs) and add examples for the student flow.
- 🔄 **Next steps**:
  1. Decide on a single request shape (flat vs. wrapped) for create/update routes.
  2. Update Swagger once payloads are final.
  3. Run the integration suite against a dedicated test DB (SQLite in-memory recommended for Jest).



