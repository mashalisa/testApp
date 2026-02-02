
import type { answerRequest } from "../../types"
import Card from "../basic/Card"
import SmallTitle from "../basic/SmallTitle"
import useForm from "../../hooks/useForm"
import Submit from "../form/Submit"
import IconCheckbox from "../form/IconCheckbox"
import SubTitle from "../basic/SubTitle"
import PopUp from "../basic/PopUp"
import Title from "../basic/Title"
import { useStudentMakeTest } from "../../hooks/useStudentMakeTest"

import { useState } from "react"

const testInProgress = () => {



    const { sendTest,
        handleSelectAnswers,
        questions,
        isOpen,
        setIsOpen,
        score,
        duration,
        dateTime, selectedAnswers } = useStudentMakeTest()

    return (
        <>
            <div className="mb-3">
                {/* <Title name={tes} */}
                <SubTitle direction="text-center" color="text-white" name={`Started at: ${dateTime?.toLocaleString()}`} />

            </div>
            {questions.map(question => (
                <Card className="m-auto">
                    <div key={question.id}>
                        <SmallTitle name={question.name} />

                        <div className="list-group list-group-flush">
                            {question.Answers.map((answer) => (

                                <IconCheckbox
                                    key={answer.id}
                                    id={`answer-${answer.id}`}
                                    name={`question-${question.id}`}
                                    checked={selectedAnswers[question.id]?.includes(answer.id) ?? false}
                                    onChange={() => handleSelectAnswers(question.id, answer.id)}
                                    label={answer.name}
                                />


                            ))}
                        </div>

                    </div>
                </Card>

            ))}
            <div className="row">
                <div className="col-md-6 m-auto">
                    <Submit
                        name="Finish Test"
                        className="btn btn-warning btn-lg px-3"
                        onClick={() => sendTest()}
                    />
                </div>

            </div>
            <PopUp isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <p>your score is:</p>
                <p><span>time:</span> {duration}</p>
                {score && <Title name={score.score} />}
                {score && <p><span>correct answers</span>{score.correctCount}</p>}
                {score && <p><span>from questions</span>{score.totalQuestions}</p>}
            </PopUp>

        </>
    )
}

export default testInProgress