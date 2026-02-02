// npm install react-icons

import { Link, useNavigate } from "react-router-dom"
import useApi from "../../hooks/useApi"
import type { NameResponse, TestCreateResponse, TestDetailsTypeResponse, TestInfo, TestInfoId, TestListResponse } from "../../types"
import { getAllTestByTeacher, getCoreSubjectById, getGradeById, getSubjectById } from "../../api/manageProfile"
import { deleteTest, updateTest, getTestinfoByTestId } from "../../api/manageTest"
import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import PopUp from "../basic/PopUp"
import Title from "../basic/Title"
import Input from "../form/Input"
import Submit from "../form/Submit"
import useForm from "../../hooks/useForm"
import TestCard from "./test/TestCard"

const DashboardTeacher = () => {
    const { user, token } = useAuth()
    const [testsData, setTestsData] = useState<NameResponse[]>([])
    const [testInfoNames, setTestInfoNames] = useState<Record<string, TestInfo>>({});
    const navigate = useNavigate()
    const [editingTestId, setEditingTestId] = useState<string | null>(null)
    const [deletingTestId, setDeletingTestId] = useState<string | null>(null)
    const { values, handleUserInput, setValues } = useForm<NameResponse>({
        id: '',
        name: '',
    })
    const { execute: executeTestList } =
        useApi<TestListResponse, [string, string]>(getAllTestByTeacher)

    const { execute: executeUpdateTest } =
        useApi<TestListResponse, [string, string, string]>(updateTest)

    const { execute: executeDeleteTest } =
        useApi<TestListResponse, [string, string]>(deleteTest)

    const { execute: executeTestInfo } =
        useApi<TestCreateResponse, [string, string]>(getTestinfoByTestId)

    const { execute: executeCoreSubjectName } =
        useApi<TestDetailsTypeResponse, [string, string]>(getCoreSubjectById)

    const { execute: executeGradeName } =
        useApi<TestDetailsTypeResponse, [string, string]>(getGradeById)

    const { execute: executeSubjecName } =
        useApi<TestDetailsTypeResponse, [string, string]>(getSubjectById)


    const getTestInfo = async () => {
        if (!token || !user) return


        const resultAllTests = await executeTestList(token, user.id)
        if (!resultAllTests?.data?.tests) return
        setTestsData(resultAllTests.data.tests)
        resultAllTests.data.tests.forEach(async (testItem) => {
            const infoRes = await executeTestInfo(token, testItem.id)
            if (!infoRes?.data) return
            const data = infoRes?.data;
            const [grade, core, subject] = await Promise.all([
                executeGradeName(token, data.grade_id),
                executeCoreSubjectName(token, data.coreSubject_id),
                executeSubjecName(token, data.subject_id)
            ])

            setTestInfoNames(prev => ({
                ...prev, [testItem.id]: {
                    name: infoRes.data?.name,
                    createdAt: infoRes.data?.createdAt,
                    test_URL: infoRes.data?.test_URL,
                    grade_name: grade?.name,
                    coreSubject_name: core?.name,
                    subject_name: subject?.name,
                }
            }))
        })

    }


    useEffect(() => {
        getTestInfo()
    }, [token, user, editingTestId, deletingTestId])



    const changeTestName = async () => {
        if (!token || !user) return
        const result = await executeUpdateTest(token, values.id, values.name)
        if (!result?.success) {
            console.error("Test name updating failed", result)
            return
        }
        setEditingTestId(null)

    }
    const handleDeleteTest = async (testId: string) => {
        if (!token || !user) return
        const result = await executeDeleteTest(token, testId)
        console.log(result, 'result in updating test')
        if (!result?.success) {
            console.error("Test name deleting failed", result)
            return
        }
        setDeletingTestId(null)

    }
    return (
        <>
            <div className="link-btn">
                <div className="row text-center">
                    <div className="col-md-4 m-auto mb-4">
                        <button className="btn btn-warning btn-lg px-3">
                            <Link to='/test'> create new test</Link>
                        </button>
                    </div>
                </div>
                <div className="row">
                    {testsData && testsData.map((test) => {
                        return (
                            <>
                                <TestCard
                                    key={test.id}
                                    test={test}
                                    info={testInfoNames[test.id]}
                                    onView={() => navigate(`/tests/${test.id}/dashboard`)}
                                    onEdit={() => {
                                        setEditingTestId(test.id)
                                        setValues({ id: test.id, name: test.name }

                                        )
                                    }}
                                    onDelete={() => {
                                        setDeletingTestId(test.id)
                                    }}
                                />
                                <PopUp isOpen={editingTestId === test.id} onClose={() => setEditingTestId(null)}>
                                    <Title name="edit test name" />
                                    <Input value={values.name} type="test" name="name" label_name="test name" onChange={handleUserInput} />
                                    <Submit name="change test name" onClick={() => changeTestName()} />
                                </PopUp>

                                <PopUp isOpen={deletingTestId === test.id} onClose={() => setDeletingTestId(null)}>
                                    <Title name={`Are you sure you want to delete ${test.name} ?`} />
                                    <Submit name="delete test" onClick={() => handleDeleteTest(test.id)} />
                                </PopUp>
                            </>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default DashboardTeacher