
import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getCoreSubjects, getProfileInfoByTeacher, updateCoreSubjects } from "../../api/manageProfile"
import { Link } from "react-router-dom"
import type { NameResponse, UpdateResponse } from "../../types"
import useApi from "../../hooks/useApi"
import HeaderSteps from "./headerSteps"
import Card from "../basic/Card"
import StepSelector from "./StepSelector"

const CoreSubjects = () => {

    const { token, user } = useAuth()
    const [coreSubjectsSelected, setCoreSubjectsSelected] = useState<string[]>([])
    const [teacherCoreSubjects, setteacherCoreSubjects] = useState<NameResponse[]>([])
    const { data: coreSubjects, execute: loadCoreSubjects, isLoading } = useApi(getCoreSubjects)
    const { execute: executeUpdateCoreSubjects, isLoading: isUpdatedLoading } =
        useApi<UpdateResponse, [token: string, userId: string, { coreSubjectsData: string[] }]>(updateCoreSubjects)

    useEffect(() => {
        if (!token || !user) return

        loadCoreSubjects(token)
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

        const response = await executeUpdateCoreSubjects(token, user.id, { coreSubjectsData: coreSubjectsSelected })
        setCoreSubjectsSelected([])
        displayTeacherCoreSubjects()
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
            <HeaderSteps activeStep='core-subjects' />

            <Card className="m-auto" width="col-md-8 col-lg-8">
                <StepSelector
                    title="Choose your core subject"
                    description="Select one or more core subjects you teach"
                    availableTitle="available core subject"
                    items={coreSubjects ?? []}
                    selectedIds={coreSubjectsSelected}
                    onSelect={selectCoreSubjects}
                    onSubmit={handleUpdateCoreSubjects}
                    isLoading={isLoading}
                    teacherItems={teacherCoreSubjects}
                    name='core subject'
                />

            </Card>


            <div className="text-center mt-3">
                <Link to='/subjects' className="   color-white">create your subjects</Link>
            </div>



        </>

    )
}

export default CoreSubjects