
import Input from "../../form/Input"
import type { answerRequest } from "../../../types"
import useForm from "../../../hooks/useForm"
import Submit from "../../form/Submit"
import Card from "../../basic/Card"
import QuestionHeader from "./QuestionHeader"
import SmallTitle from "../../basic/SmallTitle"
import { MdDelete } from "react-icons/md"
import { useAnswerCreate } from "../../../hooks/useAnswerCreate"

const Answers = () => {
    const {
        questionData,
        error,
        answers,
        deleteAnswer,
        addAnswer,
        creatAnswers } = useAnswerCreate()

    const { values: answer, handleUserInput } = useForm<answerRequest>({
        name: '', correctAnswer: false
    })

    return (
        <>
            <QuestionHeader />

            <div className="row">
                <Card className="m-auto">
                    <SmallTitle name={questionData} />

                    <ul className="list-group mb-4">
                        {answers.map((a, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <strong>{a.name}</strong>
                                    <span
                                        className={`badge ms-2 ${a.correctAnswer ? "bg-success" : "bg-danger"
                                            }`}
                                    >
                                        {a.correctAnswer ? "Correct" : "Incorrect"}
                                    </span>

                                </div>
                                <button className="icon-btn delete "
                                    onClick={() => {
                                        deleteAnswer(i)
                                    }}><MdDelete color="#dd2a2aff" /></button>
                            </li>

                        ))}
                    </ul>

                    <div className="row">
                        <div className="col-md-6">
                            <Input
                                name="name"
                                type="text"
                                label_name="enter answer"
                                value={answer.name}
                                placeholder="user name"
                                onChange={handleUserInput}
                            />


                            <Input
                                name="correctAnswer"
                                type="radio"
                                label_name="Correct"
                                value="true"
                                checked={answer.correctAnswer === true}
                                onChange={handleUserInput}
                            />

                            <Input
                                name="correctAnswer"
                                type="radio"
                                label_name="Incorrect"
                                value="false"
                                checked={answer.correctAnswer === false}
                                onChange={handleUserInput}
                            />
                        </div>
                        <div className="col-md-6 mt-4">
                            <Submit name="add answer" className="btn-outline-primary btn-border-2" onClick={() => addAnswer(answer)} />
                        </div>
                    </div>

                    {error && <div className="error-message"> <p>{error}</p> </div>}
                    <div className="row">
                        <div className="col-md-12">
                            <Submit name="create answers" onClick={creatAnswers} />
                        </div>
                    </div>


                </Card>
            </div>
        </>
    )
}

export default Answers