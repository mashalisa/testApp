import type { QuestionType } from "../../../types"
import SmallTitle from "../../basic/SmallTitle"
import { MdModeEdit, MdDelete } from "react-icons/md";
type questionTypeProp = {
    q: QuestionType,
    onEdit: () => void,
    onDelite: () => void

}
const QuestionCard = ({ q, onEdit, onDelite }: questionTypeProp) => {
    return (
        <>
            <div className='card-header d-flex justify-content-between align-items-start bg-light' key={q.id}>

                <SmallTitle name={q.name} />
                <div className="action-icons">
                    <button className="icon-btn me-2"
                        onClick={onEdit}><MdModeEdit color="#9ae9ed" /></button>


                    <button className="icon-btn delete"
                        onClick={onDelite}><MdDelete color="#dd2a2aff" /></button>

                </div>



            </div>
        </>

    )
}

export default QuestionCard