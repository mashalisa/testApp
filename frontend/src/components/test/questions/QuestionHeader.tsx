import { useEffect, useState } from "react"
import { getTestinfoByTestId } from "../../../api/manageTest"
import type { TestCreate, TestCreateResponse } from "../../../types"
import useApi from "../../../hooks/useApi"
import { useAuth } from "../../../hooks/useAuth"
import { useParams } from "react-router-dom"
import Title from "../../basic/Title"
import SubTitle from "../../basic/SubTitle"

const QuestionHeader = () => {
    const { token } = useAuth()
    const { testId } = useParams<{ testId: string }>()
    const { execute: executeTestInfo, isLoading } =
        useApi<TestCreateResponse, [string, string]>(getTestinfoByTestId)

    const [testInfo, setTestInfo] = useState<TestCreate>({
        name: '',
        grade_id: '',
        coreSubject_id: '',
        subject_id: '',
    })
    useEffect(() => {
        if (!token || !testId) return
        const getTestInfo = async () => {
            const result = await executeTestInfo(token, testId)
            console.log(result, 'result')
            console.log(result?.data, 'result')
            if (!result?.data) {
                console.error("Test info fetch failed", result)
                return
            }
            setTestInfo(result.data)


        }
        getTestInfo()
    }, [testId, token])
    return (
        <>
            <Title name={testInfo.name} color="color-white" direction="text-center" />
            <SubTitle name="Quiz " color="color-orange" direction="text-center" />
        </>
    )
}
export default QuestionHeader