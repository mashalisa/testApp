# Exam App

A comprehensive exam management system with backend API and frontend interface.

## 🔁 Backend Review (Nov 2025)

### ✅ **Frontend Readiness Status: READY**

**Summary**: The backend is **functionally complete and ready for frontend development**. All critical APIs are working, validation is in place, and integration tests pass.

#### ✅ **What's Working**

1. **Authentication & Authorization** ✅
   - JWT-based auth working correctly
   - Role-based access control (admin, teacher, student) properly enforced
   - Login/signup endpoints validated and tested

2. **Core CRUD Operations** ✅
   - All models (User, Grade, CoreSubject, Subject, Test, Question, Answer) have working CRUD
   - Joi validation implemented across all routes
   - Controllers properly use validated data

3. **Student Workflow** ✅
   - Student can view assigned tests
   - Student can start tests (create StudentTest entry)
   - Student can submit answers (by ID or by name)
   - Score calculation working correctly
   - Integration test (`testFlow.test.js`) passes end-to-end

4. **Teacher/Admin Workflow** ✅
   - Create and manage tests
   - Assign students to tests
   - View student scores
   - Manage questions and answers

5. **Data Validation** ✅
   - Joi schemas validate all request bodies, params, and queries
   - Proper error messages returned for invalid data
   - UUID validation for all ID parameters

6. **Database Relationships** ✅
   - All Sequelize associations properly configured
   - Foreign keys correctly set up
   - Hierarchical structure (Grade → CoreSubject → Subject) working

#### ⚠️ **Minor Cleanup Items (Non-Blocking)**

These are cosmetic/documentation issues that **won't affect frontend development**:

1. **Swagger Schema Missing** (Cosmetic)
   - `StudentAnswer` schema not defined in Swagger components
   - **Impact**: Swagger UI shows a warning, but API works fine
   - **Fix**: Add schema definition to `studentAnswerRoutes.js` or `swagger.js`

2. **Subject Service Error Message** (Minor)
   - Error message says "Missing core subject name" instead of "Invalid subject name"
   - **Impact**: None - just a wording issue
   - **Fix**: Update error message in `subjectsServices.js`

#### 📋 **API Contract Summary for Frontend**

**Request Format**: All endpoints expect **flat JSON objects** (no `{ data: {...} }` wrapper)

**Authentication**: Include JWT token in header:
```
Authorization: Bearer <token>
```

**Common Patterns**:
- **GET** requests: Use query params or path params
- **POST/PUT** requests: Send JSON body directly
- **Arrays**: Some endpoints (like answer submission) expect raw arrays: `[{ question: "...", answer: "..." }]`
- **UUIDs**: All IDs are UUIDs and validated as such

**Response Format**:
```json
{
  "success": true,
  "data": { ... }
}
```

**Error Format**:
```json
{
  "success": false,
  "error": "Error message" // or array of messages for validation errors
}
```

#### 🧪 **Testing**

- Integration test suite in `backend/test/testFlow.test.js` covers full student workflow
- Run tests with: `npm test -- --runInBand`
- Tests use SQLite in-memory database (isolated from production)

### ✅ **Conclusion**

**You can proceed to frontend development.** The backend APIs are stable, validated, and tested. The two minor cleanup items can be addressed during frontend development or in a follow-up PR. All critical functionality is working and ready for integration.

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



