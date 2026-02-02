import type { answerRequest } from "../../../types"
import { MdModeEdit, MdDelete } from "react-icons/md";

type AnswerCardProp = {
    a: answerRequest,
    onEdit: () => void,
    onDelete: () => void,
}
const AnswerCard = ({ a, onEdit, onDelete }: AnswerCardProp) => {
    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-center"
            >

                <span>{a.name}</span>
                <div className="d-flex align-items-center gap-2">
                    <span className={`badge ${a.correctAnswer ? "bg-success" : "bg-secondary"
                        }`}>
                        {a.correctAnswer ? "correct answer" : "incorrect answer"}
                    </span>
                    <button
                        className="icon-btn"
                        onClick={onEdit}><MdModeEdit color="#9ae9ed" /></button>


                    <button
                        className="icon-btn delete"
                        onClick={onDelete}><MdDelete color="#dd2a2aff" /></button>


                </div>


            </li>

        </>
    )
}

export default AnswerCard