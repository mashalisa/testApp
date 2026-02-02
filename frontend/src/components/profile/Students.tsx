
import SubTitle from "../basic/SubTitle"
import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { assingStudnetsToTeacher, getAllStudnets, getStudentsByTeacher } from "../../api/manageProfile"
import Submit from '../form/Submit'
import { Link } from "react-router-dom"
import type { AssignStudentsResponse, UpdateResponse } from "../../types"
import useApi from "../../hooks/useApi"
import HeaderSteps from "./headerSteps"
import Card from "../basic/Card"



const Students = () => {
    const { token, user } = useAuth()
    const [studentsSelected, setStudentsSelected] = useState<string[]>([])
    const { data: students, execute: loadStudnets, isLoading } = useApi(getAllStudnets)
    const { data: studentsDisplay, execute: displayStudents } = useApi(getStudentsByTeacher)
    const { execute: executeUpdateStudents, isLoading: isUpdatedLoading } =
        useApi<AssignStudentsResponse, [token: string, userId: string, { students: string[] }]>(assingStudnetsToTeacher)
    useEffect(() => {
        if (!token || !user) return
        loadStudnets(token)
        dislplayTeacherStudents(user.id)

    }, [token])
    useEffect(() => {
        if (studentsDisplay?.data) {
            console.log(studentsDisplay, 'studentsDisplay data');
        }
    }, [studentsDisplay]);

    const selectStudent = (id: string) => {
        setStudentsSelected((prev) => prev.includes(id) ?
            prev.filter(s => s !== id) : [...prev, id]
        )
    }
    const dislplayTeacherStudents = async (id: string) => {
        if (!token || !user) return
        const response = await displayStudents(token, id)
    }
    const handleStudnets = async () => {
        if (!token || !user) return

        const response = await executeUpdateStudents(token, user.id, { students: studentsSelected })
        console.log(response, 'response')
        setStudentsSelected([])
        dislplayTeacherStudents(user.id)
    }

    return (
        <>
            <HeaderSteps activeStep='students' />

            <Card className="m-auto" width="col-md-8 col-lg-8">

                <SubTitle name='Choose your students' direction="text-center" />
                <p className="text-muted text-center mb-4">
                    select one or more students you teach
                </p>

                <div className="row">
                    <div className="col-md-6 mb-4">
                        <SubTitle name='available students' direction="text-center" />
                        <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                            {students && students.filter(student => student.id).map((student) => {
                                const isSelected = studentsSelected.includes(student.id!);
                                return (

                                    <button
                                        key={student.id}
                                        type="button"
                                        className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ms-1 me-1 ${isSelected ? "btn-primary" : "btn-outline-secondary"
                                            }`}
                                        onClick={() => selectStudent(student.id!)}
                                    >
                                        {isSelected && <i className="bi bi-check2 me-1"></i>}
                                        {student.name}
                                    </button>

                                )

                            })}
                            {isLoading && (
                                <div className="text-center my-3">
                                    <div className="spinner-border spinner-border-sm" />
                                </div>
                            )}
                        </div>
                        <div className="d-grid mb-4">
                            <Submit name="create your classroom" onClick={handleStudnets} />
                        </div>
                    </div>
                    <div className="col-md-6">

                        <SubTitle name="your students" />
                        <ul className="list-group mb-4">
                            {studentsDisplay?.data
                                ?.filter(student => student.id)
                                .map((student) => (


                                    <li
                                        key={student.id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        {student.name}
                                        <span className="badge bg-success">Selected</span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>

                <div>

                </div>

            </Card>

            <Link to='/test' >create new test</Link>



        </>
    )
}

export default Students