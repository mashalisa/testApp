
import Title from "../../basic/Title"
import SmallTitle from "../../basic/SmallTitle"
import { useLink } from "../../../hooks/useLink"
import Card from "../../basic/Card"

const CreateLink = () => {
    const { studentList,
        studentsSelected,
        selectStudent,
        sendLink,
        linkTest } = useLink()

    return (
        <>
            <Card className="m-auto" width="col-md-8">
                <Title name="link" />

                <div className="alert alert-info text-break mb-4">{linkTest}</div>
                <div className="mb-4">
                    <SmallTitle name="Select students" />
                    <div className="d-flex flex-wrap gap-2">

                        {studentList.map(student => {
                            const isSelected = studentsSelected.includes(student.id);
                            return (
                                <div key={student.id} className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                                    <p  >{student.name}</p>
                                    <button
                                        key={student.id}
                                        type="button"
                                        className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ms-1 me-1 ${isSelected ? "btn-primary" : "btn-outline-secondary"
                                            }`}
                                        onClick={() => selectStudent(student.id!)}
                                    >
                                        {isSelected && <i className="bi bi-check2 me-1"></i>}
                                        {student.email}
                                    </button>
                                </div>

                            )


                        })}
                    </div>


                </div>


                <div>
                    <div className="text-end">
                        <button
                            onClick={sendLink}
                            disabled={studentsSelected.length === 0}
                            className="btn btn-primary px-4"

                        >
                            <i className="bi bi-send me-2"></i>
                            Send link
                        </button>

                    </div>

                </div>

            </Card>
        </>
    )
}

export default CreateLink