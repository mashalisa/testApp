import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import type { answerRequest, FullTestListProp, QuestionAnswerPayload, scoreProp, testQuestionsProp } from "../types"
import { useNavigate, useOutletContext, useParams, useSearchParams } from "react-router-dom"
import useApi from "./useApi"
import { calculateScore, getAllTestsByStudentId, getSubmitTest, getTestQuestionsByTestId, sendTestAnswers } from "../api/manageStudents"
import { calculateTestDuration } from '../utils/CalculateTestDuration'
import { useStudentTests } from "./useStudentTests"
export const useStudentMakeTest = () => {

    const { token, user } = useAuth()
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({})
    const [score, setScore] = useState<scoreProp>()
    const [isOpen, setIsOpen] = useState(false)
    const [duration, setDuration] = useState<string>('')
    const { setTestStatusBar } = useOutletContext<{
        setTestStatusBar: (status: string) => void
    }>();
    const payload: QuestionAnswerPayload =
        Object.entries(selectedAnswers).
            map(([question, answer]) => ({
                question,
                answer
            }))
    const { testId } = useParams<{ testId: string }>()

    const { execute: execudeTestSubmited } = useApi(getSubmitTest)

    const { execute: executeTestAnswers } = useApi(sendTestAnswers)

    const { execute: executeTestScore } = useApi(calculateScore)

    const { dateTime, testStatus, setTestStatus, questions, getQuestions } = useStudentTests()

    const calculateTestScore = async () => {
        if (!token || !user || !testId) {
            return
        }
        const result = await executeTestScore(token, user.id, testId)
        console.log(result, 'result in start test')
        if (!result?.data) {
            console.error("Test start failed", result)
            return
        }
        setScore(result?.data)
        setIsOpen(true)

    }
    const submitTest = async () => {
        if (!token || !user || !testId) {
            return
        }
        const result = await execudeTestSubmited(token, user.id, testId)
        console.log(result, 'result in submit test')
        if (!result?.data) {
            console.error("Test sending failed", result)
            return
        }
        setTestStatus(result?.data.status)

        setTestStatusBar(result?.data.status)
        setDuration(calculateTestDuration(result?.data.start_time, result?.data.end_time))
    }


    const handleSelectAnswers = (questionId: string, answerId: string) => {

        setSelectedAnswers(prev => {
            const prevAnswers = prev[questionId] ?? []

            const updatedAnswers = prevAnswers.includes(answerId)
                ? prevAnswers.filter(id => id !== answerId)
                : [...prevAnswers, answerId]

            return {
                ...prev,
                [questionId]: updatedAnswers
            }
        })


    }
    const sendStudentAnswers = async () => {
        if (!token || !testId || !user) {
            return
        }
        const studentId = user.id
        console.log(typeof payload, payload, 'paylod tyep')
        const result = await executeTestAnswers(token, studentId, testId, payload)
        console.log(result, 'result in questions')
        if (!result?.data) {
            console.error("Answers submission failed", result);
            return;
        }
        calculateTestScore()
    }
    const sendTest = () => {
        console.log(selectedAnswers, 'selectedAnswers')
        console.log(payload, 'payload')
        sendStudentAnswers()
        submitTest()

    }
    const navigate = useNavigate()

    useEffect(() => {
        if (!testStatus) return;
        console.log(testStatus, 'testStatus')

        if (testStatus !== "in_progress") {
            console.log('status changed')
        }
        getQuestions()
        if (testStatus !== 'completed') {
            const blockNavigation = () => {
                window.history.pushState(null, "", window.location.href);
            };

            blockNavigation();
            window.addEventListener("popstate", blockNavigation);

            return () => {
                window.removeEventListener("popstate", blockNavigation);
            };
        }


    }, [testStatus, navigate])

    useEffect(() => {

    }, []);

    return {
        sendTest,
        handleSelectAnswers,
        questions,
        isOpen,
        setIsOpen,
        score,
        duration,
        dateTime,
        selectedAnswers

    }
}