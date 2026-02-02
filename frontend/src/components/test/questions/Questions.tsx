import { Link, useNavigate, useParams } from "react-router-dom"
import useApi from "../../../hooks/useApi"
import { creatingQuestion, getTestinfoByTestId } from "../../../api/manageTest"
import type { QuestionRequest, QuestionTypeResponse, TestCreate, TestCreateResponse } from "../../../types"
import { useEffect, useState } from "react"
import Title from "../../basic/Title"
import { useAuth } from "../../../hooks/useAuth"
import SubTitle from "../../basic/SubTitle"
import Input from "../../form/Input"
import Submit from "../../form/Submit"
import useForm from "../../../hooks/useForm"
import Card from "../../basic/Card"
import QuestionHeader from "./QuestionHeader"
const Questions = () => {
    const navigate = useNavigate()
    const { token } = useAuth()
    const { testId } = useParams<{ testId: string }>()

    // const [testInfo, setTestInfo] = useState<TestCreate>({
    //     name: '',
    //     grade_id: '',
    //     coreSubject_id: '',
    //     subject_id: '',
    // })
    const [error, setError] = useState<string>('')
    const { values: questionsData, handleUserInput } = useForm<QuestionRequest>({
        name: '',
        testId: '',
    })
    // const { execute: executeTestInfo, isLoading } =
    //     useApi<TestCreateResponse, [string, string]>(getTestinfoByTestId)

    const { execute: executeCreateQuestion } =
        useApi<QuestionTypeResponse, [string, string, string]>(creatingQuestion)

    useEffect(() => {
        if (!token || !testId) return
        // const getTestInfo = async () => {
        //     const result = await executeTestInfo(token, testId)
        //     console.log(result, 'result')
        //     console.log(result?.data, 'result')
        //   if (!result?.data) {
        //     console.error("Test info fetch failed", result)
        //     return
        // }
        //     setTestInfo(result.data)


        // }
        // getTestInfo()
    }, [testId, token])

    const createQuestion = async () => {
        if (!token || !testId) return
        if (!questionsData.name.trim()) {
            setError('please enter the question')
            return
        }
        try {
            const result = await executeCreateQuestion(token, testId, questionsData.name)
            setError('')
            if (!result || !result?.data?.id) {
                console.error("Question creation failed", result)
                return
            }
            console.log(result?.data, 'response creating question')
            const questionId = result?.data?.id
            navigate(`/tests/${testId}/question/${questionId}/answers`)
        } catch (err: any) {
            console.log(err, 'err')
            setError(err.message || "Something went wrong");
        }
    }
    return (
        <>
            <QuestionHeader />
            <div className="row">
                <Card className="m-auto">
                    <Input
                        name="name"
                        type="text"
                        label_name="enter your question"
                        value={questionsData.name}
                        placeholder="user name"
                        onChange={handleUserInput}
                    />

                    {error && <div className="error-message"> <p>{error}</p> </div>}






                    <Submit name='create question' onClick={createQuestion} />
                    <div className="link-container">
                        <p><strong>Are test ready ? </strong>
                            <Link to={`/tests/${testId}/link`}>send link toy your students</Link>

                        </p>
                    </div>
                </Card>
            </div>


        </>


    )
}

export default Questions