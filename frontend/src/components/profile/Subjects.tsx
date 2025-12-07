
import Title from "../basic/Title"
import SubTitle from "../basic/SubTitle"
import { useEffect, useState } from "react"
import { getProfileInfoByTeacher, getSubjects, updateSubjects } from "../../api/manageProfile"
import { useAuth } from "../../hooks/useAuth"
import Submit from '../form/Submit'
import { Link } from "react-router-dom"
import type { NameResponse } from "../../types"

const Subjects = () => {
    const { token, user } = useAuth()
    const [subjects, setSubjects] = useState<NameResponse[]>([])
    const [subjectsSelected, setSubjectsSelected] = useState<string[]>([])
    const [teacherSubjects, setTeacherSubjects] = useState<NameResponse[]>([])
    useEffect(() => {

        if (!token || !user) return
        const loadSubjects = async () => {
            console.log('sub')
            try {
                const data  = await getSubjects(token)
                console.log(data, 'subjects')
                setSubjects(data)

            } catch (error) {
                console.log(error)
            }
        }
        loadSubjects()
        displayTeacherCoreSubjects()
    }, [token])

    const selectSubjects = (id: string) => {
        setSubjectsSelected(prev => prev.includes(id) ?
            prev.filter(s => s !== id) :
            [...prev, id])
    }

    

    const handleSubjects = async () => {
        if (!token || !user) {
            console.error("Missing token or user")
            return
        }

        const subjectTeacherData = { subjectsData: subjectsSelected };

        try {
            const assignedGradesToTeacher = await updateSubjects(token, user.id, subjectTeacherData)
            console.log(assignedGradesToTeacher)
            displayTeacherCoreSubjects()
            setSubjectsSelected([])
        } catch (err) {
            console.error(err)
        }
    }
    const displayTeacherCoreSubjects = async () => {
        if (!token || !user) return
        try {
            const data = await getProfileInfoByTeacher(token, user.id)
            console.log(data, 'grade data')
            setTeacherSubjects(data.data?.subjects ?? [])
        } catch (err) {
            console.error(err)
        }


    }
    return (
        <>
           
                <Title name="Create your profile" />
                <SubTitle name="choose your subjects" />
                <div>
                    {subjects && subjects.map((subject) => (
                        <div key={subject.id}
                            onClick={() => selectSubjects(subject.id)}>{subject.name}</div>
                    ))}
                </div>
                <Submit name="set your subjects" onClick={handleSubjects} />

                <div className="list">
                    {teacherSubjects && teacherSubjects.map((subjects) => (
                        <div key={subjects.id}  >{subjects.name}</div>
                    ))}
                </div>
                <Link to='/teacher-students' >create your students list</Link>
          

        </>
    )
}

export default Subjects