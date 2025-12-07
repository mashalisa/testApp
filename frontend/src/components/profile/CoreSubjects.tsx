import Title from "../basic/Title"
import SubTitle from "../basic/SubTitle"
import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getCoreSubjects, getProfileInfoByTeacher, updateCoreSubjects } from "../../api/manageProfile"
import Submit from '../form/Submit'
import { Link } from "react-router-dom"
import type { NameResponse } from "../../types"

const CoreSubjects = () => {

    const { token, user } = useAuth()
    const [coreSubjects, setCoreSubjects] = useState<NameResponse[]>([])
    const [coreSubjectsSelected, setCoreSubjectsSelected] = useState<string[]>([])
    const [teacherCoreSubjects, setteacherCoreSubjects] = useState<NameResponse[]>([])

    useEffect(() => {
        if (!token || !user) return
        const loadCoreSubjects = async () => {
            try {
                const data = await getCoreSubjects(token)
                setCoreSubjects(data)
                console.log(data)
            } catch (err) {
                console.error(err)
            }


        }
        loadCoreSubjects()
        displayTeacherCoreSubjects()
    }, [token])

    const selectCoreSubjects = (id: string) => {
        setCoreSubjectsSelected(prev =>
            prev.includes(id) ?
                prev.filter(c => c !== id) :
                [...coreSubjectsSelected, id]
        )
    }
    const handleUpdateCoreSubjects = async () => {
        
        console.log('coreSubjectsSelected', coreSubjectsSelected)
        if (!token || !user) {
            console.error("Missing token or user")
            return
        }
        const coreSubjectTeacherData = { coreSubjectsData: coreSubjectsSelected };
        try {
            const assignedGradesToTeacher = await updateCoreSubjects(token, user.id, coreSubjectTeacherData)
            console.log(assignedGradesToTeacher)
            setCoreSubjectsSelected([])
            displayTeacherCoreSubjects()
        } catch (err) {
            console.error(err)
        }
    }
        const displayTeacherCoreSubjects = async () => {
        if (!token || !user) return
        try {
            const data = await getProfileInfoByTeacher(token, user.id)
            console.log(data, 'grade data')
            console.log(data.data?.coreSubjects, 'data.data.coreSubjects')
            setteacherCoreSubjects(data.data?.coreSubjects || [])
        } catch (err) {
            console.error(err)
        }


    }
    return (
        <>
         
                <Title name='Create your profile' />
                <SubTitle name='choose your core subjects' />
                <div>
                    {coreSubjects && coreSubjects.map((coreSubect) => (
                        <div className= {coreSubjectsSelected.includes(coreSubect.id)? 'selected' : 'unselected'} onClick={() => selectCoreSubjects(coreSubect.id)} key={coreSubect.id}>{coreSubect.name}</div>
                    ))}
                </div>
                <Submit name="set your grades" onClick={handleUpdateCoreSubjects} />
                 <SubTitle name="your core Subjects" />
                <div className="list">
                {teacherCoreSubjects && teacherCoreSubjects.map((coresubjects) => (
                    <div key={coresubjects.id}  >{coresubjects.name}</div>
                ))}
            </div>
                 <Link to='/subjects' >create your subjects</Link>
       

        </>

    )
}

export default CoreSubjects