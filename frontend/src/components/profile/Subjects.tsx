

import { useEffect, useState } from "react"
import { getProfileInfoByTeacher, getSubjects, updateSubjects } from "../../api/manageProfile"
import { useAuth } from "../../hooks/useAuth"
import { Link } from "react-router-dom"
import type { NameResponse, UpdateResponse } from "../../types"
import useApi from "../../hooks/useApi"
import HeaderSteps from "./headerSteps"
import Card from "../basic/Card"
import StepSelector from "./StepSelector"

const Subjects = () => {
    const { token, user } = useAuth()
    const [subjectsSelected, setSubjectsSelected] = useState<string[]>([])
    const [teacherSubjects, setTeacherSubjects] = useState<NameResponse[]>([])
    const { data: subjects, execute: loadSubjects, isLoading } = useApi(getSubjects)
    const { execute: execudetUpdatedSubjects, isLoading: isUpdatedLoading } =
        useApi<UpdateResponse, [string, string, { subjectsData: string[] }]>(updateSubjects)


    useEffect(() => {

        if (!token || !user) return
        loadSubjects(token)
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

        const response = await execudetUpdatedSubjects(token, user.id, { subjectsData: subjectsSelected })
        displayTeacherCoreSubjects()
        setSubjectsSelected([])
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
            <HeaderSteps activeStep='subjects' />

            <Card className="m-auto" width="col-md-8 col-lg-8">
                <StepSelector
                    title="Choose your subject"
                    description="Select one or more  subjects you teach"
                    availableTitle="available subjects"
                    items={subjects ?? []}
                    selectedIds={subjectsSelected}
                    onSelect={selectSubjects}
                    onSubmit={handleSubjects}
                    isLoading={isLoading}
                    teacherItems={teacherSubjects}
                    name='subject'
                />

            </Card>

            <div className="text-center mt-3">
                <Link to='/teacher-students' className="   color-white">create your students list</Link>
            </div>


        </>
    )
}

export default Subjects