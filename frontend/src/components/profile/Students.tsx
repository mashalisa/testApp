import Title from "../basic/Title"
import SubTitle from "../basic/SubTitle"
import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { assingStudnetsToTeacher, getAllStudnets, getStudentsByTeacher } from "../../api/manageProfile"
import Submit from '../form/Submit'
import { Link } from "react-router-dom"
import type { RegistrationFormType, TeacherStudentsResponse } from "../../types"
type TeacherStudentWithData = RegistrationFormType & { TeacherStudent: TeacherStudentsResponse };


const Students = () => {
    const { token, user } = useAuth()
    const [students, setStudents] = useState<RegistrationFormType[]>([])
    const [studentsSelected, setStudentsSelected] = useState<any[]>([])
    const [teacherStudents, setTeacherStudents] = useState<TeacherStudentWithData[]>([])
    useEffect(() => {
        if (!token || !user) return
        const loadStudnets = async () => {

            try {
                const data = await getAllStudnets(token)
                setStudents(data ?? [])
                console.log(data, 'students data')
            } catch (error) {
                console.log(error)
            }
        }
        loadStudnets()
        dislplayTeacherStudents(user.id)

    }, [token])

    const selectStudent = (id: string) => {
        setStudentsSelected((prev) => prev.includes(id) ?
            prev.filter(s => s !== id) : [...prev, id]
        )
    }
    const dislplayTeacherStudents = async (id: string) => {
        if (!token || !user) return
        console.log(studentsSelected, 'studentsSelected')
        try {
            const data = await getStudentsByTeacher(token, id)
            console.log(data.data, 'data display')
            setTeacherStudents(data.data ?? []);
        } catch (err) {
            console.error(err)
        }
    }
    const handleStudnets = async () => {
        if (!token || !user) return
        console.log(studentsSelected, 'studentsSelected')
        try {
            const data = await assingStudnetsToTeacher(token, user.id, { students: studentsSelected })
            console.log(data, 'data')
            setStudentsSelected([])
            dislplayTeacherStudents(user.id)
            console.log(teacherStudents, 'teacherStudents data')

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Title name="Create your profile" />
            <SubTitle name="choose your grades" />
            <div>
                {students && students.map((student) => (
                    <div key={student.id} className={studentsSelected.includes(student.id) ? 'selected' : 'unselected'} onClick={() => selectStudent(student.id)}>{student.name}</div>
                ))}
            </div>
            <Submit name="create your classroom" onClick={handleStudnets} />
            <div>
                <SubTitle name="your students" />
                {teacherStudents && (
                    (console.log(teacherStudents, 'map i s here'),
                        teacherStudents.map((student) => (
                            <div key={student.id}>{student.name}</div>
                        )))
                )}

            </div>
            <Link to='/test' >create new test</Link>



        </>
    )
}

export default Students