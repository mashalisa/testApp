import Title from "../basic/Title"
import SubTitle from "../basic/SubTitle"
import { useEffect, useState } from "react"
import { getGrades, getProfileInfoByTeacher, updateGrades } from "../../api/manageProfile"
import { useAuth } from "../../hooks/useAuth"
import Submit from '../form/Submit'
import { Link, useNavigate } from "react-router-dom"
import type { NameResponse } from "../../types"

const Grades = () => {
    const { token, user } = useAuth()
    const [grades, setGrage] = useState<NameResponse[]>([])
    const [selectedGrades, setSelectedGrades] = useState<string[]>([])
    const [teacherGrades, setTeacherGrage] = useState<NameResponse[]>([])
    const navigate = useNavigate()
    useEffect(() => {
        if (!token || !user) return
        const loadGrades = async () => {

            try {
                const gradesData = await getGrades(token)
                console.log(gradesData, 'gradesData')
                setGrage(gradesData)
            } catch (err) {
                console.error(err)
            }

        }

        loadGrades()
        displayTeachergrades()
        console.log(teacherGrades, 'teacherGrades')

    }, [token])

    const selectGrade = async (id: string) => {
        console.log(id, '')
        setSelectedGrades(prev =>
            prev.includes(id) ?
                prev.filter(g => g !== id) :
                [...selectedGrades, id])
    }
    const handleUpdateGrades = async () => {
        console.log('selectedGrades', selectedGrades)
        if (!token || !user) {
            console.error("Missing token or user")
            return
        }
        const gradesTeacherData = { gradesData: selectedGrades };
        try {
            const assignedGradesToTeacher = await updateGrades(token, user.id, gradesTeacherData)
            console.log(assignedGradesToTeacher)
            setSelectedGrades([])
            displayTeachergrades()
        } catch (err) {
            console.error(err)
        }
    }

    const displayTeachergrades = async () => {
        if (!token || !user) return
        try {
            const data = await getProfileInfoByTeacher(token, user.id)
            console.log(data, 'grade data')
            console.log(data.data?.grades, 'data.data.grades')
            setTeacherGrage(data.data?.grades ?? [])
        } catch (err) {
            console.error(err)
        }


    }
    return (
        <>
            <Title name="Create your profile" />
            <SubTitle name="choose your grades" />
            <div className="list">
                {grades && grades.map((grade) => (
                    <div key={grade.id} className={selectedGrades.includes(grade.id) ? 'selected' : 'unselected'} onClick={() => selectGrade(grade.id)}><span >v </span>{grade.name}</div>
                ))}
            </div>
            <Submit name="set your grades" onClick={handleUpdateGrades} />
            <SubTitle name="your grades" />
            <div className="list">
                {teacherGrades && teacherGrades.map((grade) => (
                    <div key={grade.id}  >{grade.name}</div>
                ))}
            </div>
            <Link to='/core-subjects' >create your core subjects</Link>
        </>

    )
}

export default Grades