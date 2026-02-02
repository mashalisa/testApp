import Card from "../../basic/Card";
import type { NameResponse, TestInfo } from "../../../types"
import { MdModeEdit, MdDelete, MdOutlineMoreHoriz, MdSend } from "react-icons/md";
import { Link } from "react-router-dom";
type testCardProps = {
    test: NameResponse,
    info?: TestInfo
    onEdit: () => void
    onDelete: () => void
    onView: () => void

}
const TestCard = ({ test, info, onEdit, onDelete, onView }: testCardProps) => {
    return (
        <Card>
            <div className="clickable" key={test.id} >
                <div className="d-flex justify-content-between">
                    <h5 className="card-title fw-bold mb-2 text-capitalize " >
                        {test.name}  </h5>
                    <span
                        className="text-primary clickable"
                        onClick={onView}
                    >
                        view test <MdOutlineMoreHoriz color="#105eb9" />
                    </span>

                </div>

                <span className="text-muted mb-3"> Created on {info?.createdAt
                    ? new Date(info.createdAt).toLocaleDateString()
                    : "Loading..."}</span>
                <ul className="list-unstyled mb-4 mt-3">
                    <li className="mb-3">
                        <strong>Grade:</strong>{" "}
                        <span > {info?.grade_name ?? "Loading..."}</span>
                    </li>
                    <li className="mb-3">
                        <strong>Core Subject:</strong>{" "}
                        <span > {info?.coreSubject_name ?? "Loading..."}</span>
                    </li>
                    <li className="mb-3">
                        <strong>Subject:</strong>{" "}
                        <span>{info?.subject_name ?? "Loading..."}</span>
                    </li>
                    <li className="mb-3">
                        <strong>Link:</strong>{" "}
                        <span>{info?.test_URL ?? "link is not created"}</span>
                    </li>

                </ul>
                <div className="mt-auto d-flex gap-2">
                    <button className="btn btn-outline-success btn-sm px-3"
                        onClick={(e) => {
                            e.stopPropagation()
                            onEdit()
                        }}>
                        <MdModeEdit color="#9ae9ed" /> edit</button>
                    <button className="btn btn-outline-danger btn-sm px-3"
                        onClick={(e) => {
                            e.stopPropagation()
                            onDelete()
                        }}>
                        <MdDelete color="#dd2a2aff" /> delete</button>


                    <button className="btn btn-outline-warning btn-sm px-3" ><MdSend color="#ddc26bff" />
                        <Link to={`/tests/${test.id}/link`}>send link</Link></button>
                </div>

            </div>
        </Card>

    )
}

export default TestCard