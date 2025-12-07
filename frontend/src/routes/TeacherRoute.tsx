import { Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import Students from "../components/profile/Students"
import Grades from "../components/profile/Grades"
import CoreSubjects from "../components/profile/CoreSubjects"
import Subjects from "../components/profile/Subjects"
import TestName from "../components/test/TestName"
import TeacherLayout from "../components/layout/TeacherLayout"
import DashboardTeacher from "../components/teachers/Dashboard"

export const TeacherRoute = (
    <>

        <Route element={
            <ProtectedRoute role="teacher">
                <TeacherLayout />
            </ProtectedRoute>
        } >

            <Route path="/teacher/dashboard" element={<DashboardTeacher />} />
          
      <Route path="/teacher-students" element={<Students />} />
      <Route path="/grades" element={<Grades />} />
      <Route path="/core-subjects" element={<CoreSubjects />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/test" element={<TestName />} />
        </Route>
    </>
)
