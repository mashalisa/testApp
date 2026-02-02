import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import type { NameResponse, } from "../../../types"
import Title from "../../basic/Title"
import SubTitle from "../../basic/SubTitle"
import Submit from "../../form/Submit"
import PopUp from "../../basic/PopUp"
import Input from "../../form/Input"
import useForm from "../../../hooks/useForm"
import Card from "../../basic/Card"
import { useTestDashboard } from "../../../hooks/useTestDashboard"
import QuestionCard from "./QuestionCard"
import AnswerCard from "./AnswerCard"
import React from "react"
const TestDashboard = () => {
    const {
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
    } = useTestDashboard()
    const navigate = useNavigate()
    const { token } = useAuth()
    const { testId } = useParams<{ testId: string }>()

    const { values, handleUserInput, setValues } = useForm<NameResponse>({
        id: '',
        name: '',
        correctAnswer: false
    })

    const goToQuestion = () => {
        navigate(`/tests/${testId}/questions`)
    }

    const linkToQuestion = (questionId: string) => {
        console.log(questionId, 'questionId')
        console.log(testId, 'testId')
        navigate(`/tests/${testId}/question/${questionId}/answers`)
    }


    return (
        <>
            <Title name={testInfo ? testInfo?.name : 'test name '} color="color-white" direction="text-center" />
            <SubTitle name="Questions " color="color-orange" direction="text-center" />
            <div className="row">
                <div className="col-md-4 m-auto">
                    <Submit name='create new question' className="btn-warning btn-lg" onClick={goToQuestion} />
                </div>
            </div>
            <div className="row g-4">
                {testInfo?.Questions?.map((q) => (

                    <Card>
                        <div className="div-box">
                            <QuestionCard q={q}
                                onEdit={() => {
                                    setEditingQuestionId(q.id)
                                    setValues({ id: q.id, name: q.name })
                                }}

                                onDelite={() => {
                                    setDeletingQuestionId(q.id)
                                }} />
                            <PopUp isOpen={editingQuestionId === q.id} onClose={() => setEditingQuestionId(null)}>
                                <Title name="edit question name" />
                                <Input value={values.name} type="test" name="name" label_name="Question name" onChange={handleUserInput} />
                                <Submit name="Change question name" onClick={() => updateQuestionName(values.id, values.name)} />
                            </PopUp>
                            <PopUp isOpen={deletingQuestionId === q.id} onClose={() => setDeletingQuestionId(null)}>
                                <Title name={`Are you sure you want to delete ${q.name} ?`} />
                                <Submit name="delete test" onClick={() => handleDeleteQuestion(q.id)} />
                            </PopUp>

                        </div>


                        <ul className="list-group list-group-flush mb-4">
                            {q.Answers?.map((a) => (
                                <React.Fragment key={a.id}>
                                    <AnswerCard
                                        key={a.id}
                                        a={a}
                                        onEdit={() => {
                                            setEditingAnswerId(a.id)
                                            setValues({
                                                id: a.id,
                                                name: a.name,
                                                correctAnswer: a.correctAnswer,
                                            })
                                        }}
                                        onDelete={() => setDeletingAnswerId(a.id)}


                                    />
                                    <PopUp isOpen={editingAnswerId === a.id} onClose={() => setEditingAnswerId(null)}>
                                        <Title name="edit question name" />
                                        <Input value={values.name} type="test" name="name" label_name="Question name" onChange={handleUserInput} />
                                        <Input
                                            name="correctAnswer"
                                            type="radio"
                                            label_name="Correct"
                                            value="true"
                                            checked={a.correctAnswer === true}
                                            onChange={handleUserInput}
                                        />

                                        <Input
                                            name="correctAnswer"
                                            type="radio"
                                            label_name="Incorrect"
                                            value="false"
                                            checked={a.correctAnswer === false}
                                            onChange={handleUserInput}
                                        />
                                        <Submit name="Change question name" onClick={() => updateAnswer(a.id, { name: a.name, correctAnswer: a.correctAnswer })} />
                                    </PopUp>

                                    <PopUp isOpen={deletingAnswerId === a.id} onClose={() => setDeletingAnswerId(null)}>
                                        <Title name={`Are you sure you want to delete ${a.name} ?`} />
                                        <Submit name="delete test" onClick={() => handleDeleteAnswer(a.id)} />
                                    </PopUp>
                                </React.Fragment>

                            ))}
                        </ul>

                        <Submit name='add new answer ' className="btn-add-answer mt-auto" onClick={() => linkToQuestion(q.id)} />
                    </Card>


                ))}
            </div>
        </>

    )
}

export default TestDashboard