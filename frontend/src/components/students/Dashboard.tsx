import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import useApi from "../../hooks/useApi"
import { getAllTestsByStudentId, getStartTest, getTecherNameById } from "../../api/manageStudents"
import type { FullTestListProp, FullTestResponse, teacherResponse, TestCreate, TestDetailsTypeResponse, TestInfo, testStaredRequest } from "../../types"
import Card from "../basic/Card"
import { getCoreSubjectById, getGradeById, getSubjectById } from "../../api/manageProfile"
import SmallTitle from "../basic/SmallTitle"
import Submit from "../form/Submit"
import { useNavigate } from "react-router-dom"
import { useDashboardStudents } from "../../hooks/useDashboardStudents"

const DashboardStudent = () => {
    const { startYourTest,
        testList,
        testInfo } = useDashboardStudents()

    return (
        <div className="row">
            {testList.map((test) => {
                return (

                    <Card width="col-md-6">



                        <div key={test.id}>
                            <SmallTitle direction=' text-capitalize' name={test.Test?.name ?? "No test name"} />
                            <div>
                                <ul className="list-group list-group-flush my-3">
                                    <li className="list-group-item d-flex justify-content-between px-0">
                                        <strong>Grade:</strong>{" "}
                                        <span className="text-muted">{testInfo.grade_name}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between px-0">
                                        <strong>Core Subject:</strong>{" "}
                                        <span className="text-muted">{testInfo.coreSubject_name}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between px-0">
                                        <strong>Subject:</strong>{" "}
                                        <span className="text-muted">{testInfo.subject_name}</span>
                                    </li>
                                    <li className="list-group-item px-0">
                                        <strong>From Teacher:</strong>{" "}
                                        <span className="text-muted mb-3">{testInfo.teacher_name}</span>
                                        <p><small className="text-muted pe-2">Contact:
                                            <a href={`mailto:${testInfo.teacher_email}`}
                                                className="text-decoration-none ps-2">
                                                {testInfo.teacher_email}
                                            </a></small></p>
                                    </li>
                                </ul>
                            </div>

                            <Submit name=" Start Test" disabled={test.status !== "waiting"} className={test.status === "waiting" ? "btn btn-primary mt-auto w-100" : "btn btn-outline-primary mt-auto w-100"}
                                onClick={() => startYourTest(test.Test.id)} />


                        </div>




                    </Card>

                )
            })}
        </div>
    )
}

export default DashboardStudent