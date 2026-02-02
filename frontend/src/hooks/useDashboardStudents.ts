import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"
import type { FullTestListProp, TestInfo } from "../types"
import { useEffect, useState } from "react"
import useApi from "./useApi"
import { getAllTestsByStudentId, getStartTest, getTecherNameById } from "../api/manageStudents"
import { getCoreSubjectById, getGradeById, getSubjectById } from "../api/manageProfile"

export const useDashboardStudents = () => {
    const { user, token } = useAuth()
    const navigate = useNavigate()

    const [testList, setTestList] = useState<FullTestListProp[]>([])
    const { execute: executeTestList, isLoading } = useApi(getAllTestsByStudentId)

    const { execute: executeCoreSubjectName } = useApi(getCoreSubjectById)

    const { execute: executeGradeName } = useApi(getGradeById)

    const { execute: executeSubjecName } = useApi(getSubjectById)
    const { execute: executeTeacherName } = useApi(getTecherNameById)
    const { execute: execudeTestStarted } = useApi(getStartTest)
    const [testInfo, setTestInfo] = useState<TestInfo>({
        name: '',
        grade_name: '',
        coreSubject_name: '',
        subject_name: '',
        teacher_email: '',
        teacher_name: ''
    })
    const getGradeName = async (gradeId: string) => {
        if (!token || !user) {
            return
        }
        const result = await executeGradeName(token, gradeId)
        if (!result) {
            console.error("Test info fetch failed", result)
            return
        }

        setTestInfo(prev => ({ ...prev, grade_name: result.name }))
    }

    const getCoreSubjectName = async (coreSubjectId: string) => {
        if (!token || !user) {
            return
        }
        const result = await executeCoreSubjectName(token, coreSubjectId)
        if (!result) {
            console.error("Test info fetch failed", result)
            return
        }

        setTestInfo(prev => ({
            ...prev, coreSubject_name: result.name
        }))
    }

    const getTeacherName = async (teacherId: string) => {
        if (!token || !user) {
            return
        }
        const result = await executeTeacherName(token, teacherId)
        if (!result?.data) {
            console.error("Test info fetch failed", result)
            return
        }

        setTestInfo(prev => ({
            ...prev, teacher_name: result?.data?.name, teacher_email: result?.data?.email
        }))
    }
    const getSubjectName = async (subjectId: string) => {
        if (!token || !user) {
            return
        }
        const result = await executeSubjecName(token, subjectId)
        if (!result) {
            console.error("Test info fetch failed", result)
            return
        }

        setTestInfo(prev => ({
            ...prev,
            subject_name: result.name
        }))
    }

    const getTestList = async () => {
        if (!token || !user) {
            return
        }
        const result = await executeTestList(token, user.id)
        console.log(result?.data, 'result  test list')
        if (!result?.data || !Array.isArray(result.data)) {
            console.error("Test info fetch failed", result);
            return;
        }
        setTestList(result.data);
        result.data.forEach((item: FullTestListProp) => {
            getGradeName(item.Test.grade_id)
            getCoreSubjectName(item.Test.coreSubject_id)
            getSubjectName(item.Test.subject_id)
            getTeacherName(item.Test.teacher_id)
        })




        if (!result?.data?.Test?.coreSubject_id) return
        getCoreSubjectName(result?.data?.Test?.coreSubject_id)

        if (!result?.data?.Test?.subject_id) return
        getSubjectName(result?.data?.Test?.subject_id)
    }
    const startYourTest = async (testId: string) => {
        console.log(testId, 'testId in start your test')
        if (!token || !user || !testId) {
            return
        }
        const result = await execudeTestStarted(token, user.id, testId)
        console.log(result, 'result in start test')
        if (!result?.data) {
            console.error("Test start failed", result)
            return
        }

        navigate(`/student/${user.id}/test/${testId}/?status=inProgress`)


    }


    useEffect(() => {
        console.log(user, 'user')
        getTestList()


    }, [user, token])

    return {
        startYourTest,
        testList,
        testInfo

    }
}