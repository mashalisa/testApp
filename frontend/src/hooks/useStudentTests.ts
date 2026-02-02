import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { getAllTestsByStudentId, getTestQuestionsByTestId } from "../api/manageStudents"
import useApi from "./useApi"
import { useAuth } from "./useAuth"
import type { FullTestListProp, testQuestionsProp } from "../types"
import { useEffect, useState } from "react"

export const useStudentTests = () => {
    const { token, user } = useAuth()
    const { execute: executeTestList } = useApi(getAllTestsByStudentId)
    const { testId } = useParams<{ testId: string }>()
    const navigate = useNavigate()
    const [dateTime, setDateTime] = useState<Date | null>(null)
    const [testStatus, setTestStatus] = useState<string>('')
    const { execute: execudeTestQuestion } = useApi(getTestQuestionsByTestId)
     const [questions, setQuestions] = useState<testQuestionsProp[]>([])
    const { setTestStatusBar } = useOutletContext<{
        setTestStatusBar: (status: string) => void
    }>();
    const getTestList = async () => {
        if (!token || !user || !testId) {
            return
        }
        const result = await executeTestList(token, user.id)
        console.log(result?.data, 'result  test list')
        if (!result?.data || !Array.isArray(result.data)) {
            navigate("/not-allowed");
            console.error("Test info fetch failed", result);
            return;
        }

        const currentTest = result.data.find(
            (item: FullTestListProp) => item.test_id === testId
        );
        console.log(currentTest, 'currentTest')
        if (!currentTest) {
            navigate("/not-allowed");

        }
        setDateTime(currentTest.start_time)
        setTestStatus(currentTest.status)
        setTestStatusBar(currentTest.status)
        if (currentTest.status === "completed") {
            console.log('completed')
            navigate("/not-allowed");
        }
    }

        const getQuestions = async () => {
        if (!token || !testId) {
            return
        }
        const result = await execudeTestQuestion(token, testId)
        console.log(result, 'result in questions')
        if (!result?.data?.Questions) {
            console.error("Questions fetch failed", result)
            return
        }
        setQuestions(result.data.Questions)

    }
    useEffect(() => {
        getTestList();
        // console.log('token, user, testId')




    }, [token, user, testId])

    return {dateTime,testStatus, setTestStatus, questions, getQuestions}
}