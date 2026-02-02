import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./useAuth"
import type { answerRequest, AnswerTypeResponse } from "../types"
import useApi from "./useApi"
import { creatingAnswer, getQuestionfoByQuestionId } from "../api/manageTest"

export const useAnswerCreate = () => {
    const navigate = useNavigate()
    const { testId, questionId } = useParams<{ testId: string, questionId: string }>()
    const [questionData, setQuestionData] = useState<string>('')
    const { token } = useAuth()
    const [error, setError] = useState<string>('')
    const [answers, setAnswers] = useState<answerRequest[]>([])
    const { execute: executeCreatingAnswer } = useApi(creatingAnswer)

    const { execute: executeQuestionName } = useApi(getQuestionfoByQuestionId)

    const creatAnswers = async () => {
        if (!token || !questionId) return
        try {
            const result = await executeCreatingAnswer(token, questionId, answers)
            console.log(result, 'result in create answer')

            if (!result?.success) {
                console.error("Test creation failed", result)
                return
            }
            navigate(`/tests/${testId}/questions`)
        } catch (err: any) {
            console.log(err, 'err')
            setError(err.message || "Something went wrong");
        }


    }

    const getQuestionName = async () => {
        if (!token || !questionId) return

        const result = await executeQuestionName(token, questionId)
        console.log(result, 'question in create answer')
        if (!result?.success) {
            console.error("question creation failed", result)
            return
        }
        setQuestionData(result?.data.name)

    }
    const addAnswer = async (answer: answerRequest) => {
        console.log(answer, 'answers herre')
        if (!answer.name) {
            setError('please enter the answer')
            console.log('error')
            return
        }
        const newName = answer.name.trim().toLowerCase();
        const alreadyExists = answers.some(
            a => a.name?.trim().toLowerCase() === newName
        );


        if (alreadyExists) {
            setError("This answer already exists");
            return
        }

        setAnswers(prev => [...prev, { ...answer }])
        setError('')

    }
    const deleteAnswer = (index: number) => {
        setAnswers(prev => prev.filter((_, i) => i !== index))
    }
    useEffect(() => {
        console.log(answers, token, 'answers')
        getQuestionName()
    }, [answers, token, questionId])


    return {
        testId,
        questionId,
        questionData,
        error,
        answers,
        deleteAnswer,
        addAnswer,
        creatAnswers


    }
}