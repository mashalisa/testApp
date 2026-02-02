import { useEffect, useState } from "react"
import type { answerRequest, NameResponse, TestCreate, TestCreateResponse } from "../types"
import { useAuth } from "./useAuth"
import { useNavigate, useParams } from "react-router-dom"
import useForm from "./useForm"
import { deleteAnswer, deleteQuestion, getTestinfoByTestId, updatingAnswer, updatingQuestion } from "../api/manageTest"
import useApi from "./useApi"

export const useTestDashboard = () => {

    const navigate = useNavigate()
    const { token } = useAuth()
    const { testId } = useParams<{ testId: string }>()

    const [testInfo, setTestInfo] = useState<TestCreate | null>(null)
    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null)
    const [deletingQuestionId, setDeletingQuestionId] = useState<string | null>(null)
    const [deletingAnswerId, setDeletingAnswerId] = useState<string | null>(null)
    const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null)
    const { execute: executeTestInfo } =
        useApi<TestCreateResponse, [string, string]>(getTestinfoByTestId)

    const { execute: executeUpdatingQuestion } = useApi(updatingQuestion)

    const { execute: executeDeletingQuestion } = useApi(deleteQuestion)

    const { execute: executeUpdatingAnswer } = useApi(updatingAnswer)

    const { execute: executeDeletingAnswer } = useApi(deleteAnswer)



    const handleDeleteQuestion = async (questionId: string) => {
        if (!token) return
        const result = await executeDeletingQuestion(token, questionId)
        console.log(result, 'result in deleting question')
        if (!result?.success) {
            console.error("question  deleting failed", result)
            return
        }
        setDeletingQuestionId(null)
    }
    const handleDeleteAnswer = async (answerId: string) => {
        if (!token) return
        const result = await executeDeletingAnswer(token, answerId)
        console.log(result, 'result in deleting answer')
        if (!result?.success) {
            console.error("answer deleding failed", result)
            return
        }
        setDeletingAnswerId(null)
    }
    const updateQuestionName = async (id: string, name: string) => {
        if (!token) return
        const result = await executeUpdatingQuestion(token, id, name)
        console.log(result, 'result in updating question')
        if (!result?.success) {
            console.error("question name updating failed", result)
            return
        }
        setEditingQuestionId(null)
    }

    const updateAnswer = async (id: string, data: answerRequest) => {

        if (!token) return
        if (data.correctAnswer === undefined) {
            console.error("correctAnswer is required")
            return
        }
        const result = await executeUpdatingAnswer(token, id, data)
        console.log(result, 'result in updating answer')
        if (!result?.success) {
            console.error("answer name updating failed", result)
            return
        }
        setEditingAnswerId(null)
    }

    useEffect(() => {
        console.log(testInfo, 'testInfo')
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
    }, [testId, token, editingQuestionId, deletingQuestionId, editingAnswerId, deletingAnswerId])


    return {
        navigate,
        testInfo,
        editingQuestionId,
        deletingQuestionId,
        editingAnswerId,
        deletingAnswerId,
        setEditingQuestionId,
        setDeletingQuestionId,
        setEditingAnswerId,
        setDeletingAnswerId,
        handleDeleteAnswer,
        handleDeleteQuestion,
        updateQuestionName,
        updateAnswer
    }






}