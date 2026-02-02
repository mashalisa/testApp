import { Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import Students from "../components/profile/Students"
import Grades from "../components/profile/Grades"
import CoreSubjects from "../components/profile/CoreSubjects"
import Subjects from "../components/profile/Subjects"
import Test from "../components/test/TestCreating"
import Questions from '../components/test/questions/Questions'
import TeacherLayout from "../components/layout/TeacherLayout"
import DashboardTeacher from "../components/teachers/Dashboard"
import Answers from "../components/test/questions/Answers"
import TestDashboard from "../components/test/questions/TestDashboard"
import CreateLink from "../components/test/questions/CreateLink"
import Statistics from "../components/teachers/Statistics"

export const TeacherRoute = (
    <>

        <Route element={
            <ProtectedRoute role="teacher">
                <TeacherLayout />
            </ProtectedRoute>
        } >

            <Route path="/teacher/dashboard" element={<DashboardTeacher />} />
            <Route path="/teacher/statistics" element={<Statistics />} />

            <Route path="/teacher-students" element={<Students />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/core-subjects" element={<CoreSubjects />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/test" element={<Test />} />
             <Route path="/tests/:testId/questions" element={<Questions />} />
             <Route path="/tests/:testId/link" element={<CreateLink />} />
            <Route path="/tests/:testId/dashboard" element={<TestDashboard />} />
             <Route path="/tests/:testId/question/:questionId/answers" element={<Answers />} />
        </Route>
    </>
)
