// npm install bootstrap-icons


import { useEffect, useState } from "react"
import { getGrades, getProfileInfoByTeacher, updateGrades as apiUpdateGrades } from "../../api/manageProfile"
import { useAuth } from "../../hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"
import type { NameResponse, UpdateResponse } from "../../types"
import useApi from "../../hooks/useApi"
import Card from "../basic/Card"
import "bootstrap-icons/font/bootstrap-icons.css";
import HeaderSteps from "./headerSteps"
import StepSelector from "./StepSelector"



const Grades = () => {
    const { token, user } = useAuth()

    const [selectedGrades, setSelectedGrades] = useState<string[]>([])
    const [teacherGrades, setTeacherGrage] = useState<NameResponse[]>([])
    const { data: grades, execute: loadGrades, isLoading } = useApi(getGrades)
    const { execute: executeUpdateGrades, isLoading: updatedIsLoading } =
        useApi<UpdateResponse, [string, string, { gradesData: string[] }]>(apiUpdateGrades);
    const navigate = useNavigate()

    useEffect(() => {
        if (!token || !user) return

        loadGrades(token)
        displayTeachergrades()
        console.log(grades, 'grades')


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

        console.log({ gradesData: selectedGrades }, 'gradesData')
        const result = await executeUpdateGrades(token, user.id, { gradesData: selectedGrades })
        console.log(result, 'result')
        setSelectedGrades([]);
        displayTeachergrades()
    }

    const displayTeachergrades = async () => {
        console.log('selectedGrades', selectedGrades)
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
            <HeaderSteps activeStep='grades' />

            <Card className="m-auto" width="col-md-8 col-lg-8">

                <StepSelector
                    title="Choose your grades"
                    description="Select one or more grades you teach"
                    availableTitle="available grades"
                    items={grades ?? []}
                    selectedIds={selectedGrades}
                    onSelect={selectGrade}
                    onSubmit={handleUpdateGrades}
                    isLoading={isLoading}
                    teacherItems={teacherGrades}
                    name='grades'

                />

            </Card>
            <div className="text-center mt-3">
                <Link to='/core-subjects' className="   color-white">create your core subjects</Link>
            </div>



        </>

    )
}

export default Grades