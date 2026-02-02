import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useEffect, useMemo, useRef, useState } from "react";
import type { StudentUI, TestCreate, TestCreateResponse, TestInfo, TestListResponse } from "../types";
import useApi from "./useApi";
import { getTestinfoByTestId, updateTestLink } from "../api/manageTest";
import { getCoreSubjectById, getGradeById, getStudentsByTeacher, getSubjectById } from "../api/manageProfile";
import { assignTestToStudents } from "../api/manageStudents";

export const useLink = () => {
    const { token, user } = useAuth()
    const { testId } = useParams<{ testId: string }>()
    const baseUrl = window.location.origin;
    const lastSavedLink = useRef<string | null>(null)
    const [testInfo, setTestInfo] = useState<TestCreate>({
        name: '',
        grade_id: '',
        coreSubject_id: '',
        subject_id: '',
        Questions: []
    })
    const [studentList, setStudentList] = useState<StudentUI[]>([])
    const [studentsSelected, setStudentsSelected] = useState<string[]>([])
    const [linkInfo, setlinkInfo] = useState<TestInfo>({
        name: '',
        grade_name: '',
        coreSubject_name: '',
        subject_name: ''
    })

    const { execute: executeTestInfo } =
        useApi<TestCreateResponse, [string, string]>(getTestinfoByTestId)

    const { execute: executeCoreSubjectName } = useApi(getCoreSubjectById)

    const { execute: executeGradeName } = useApi(getGradeById)

    const { execute: executeSubjecName } = useApi(getSubjectById)

    const { execute: executeStudentsName } = useApi(getStudentsByTeacher)

    const { execute: executeAssignTest } = useApi(assignTestToStudents)

    const { execute: executeUpdateTestLink } =
        useApi<TestListResponse, [string, string, string]>(updateTestLink)

    const getTeacherStudnets = async () => {
        if (!token || !user || !testId) {
            return
        }
        const result = await executeStudentsName(token, user.id)
        console.log(result, 'result students')
        console.log(result?.data, 'result students2')
        if (!result?.data) {
            console.error("Test info fetch failed", result)
            return
        }


        const students: StudentUI[] = result.data
            .filter(student => typeof student.id === "string")
            .map(student => ({
                id: student.id!,
                name: student.name,
                username: student.username,
                email: student.email,
            }));

        setStudentList(students);



    }
    const selectStudent = (id: string) => {
        setStudentsSelected((prev) => prev.includes(id) ?
            prev.filter(s => s !== id) : [...prev, id]
        )
    }
    const sendLink = async () => {
        console.log(studentsSelected, "selected student")
        studentsSelected.map(sId => {
            const selectedStudents = studentList.filter((student) => studentsSelected.includes(student.id))
            console.log("Sending link:", linkTest);
            console.log("To students:", selectedStudents);
        })

        if (!token || !user || !testId) {
            return
        }
        const result = await executeAssignTest(token, testId, studentsSelected)
        console.log(result, 'result assign students')
        if (!result) {
            console.error("assign fetch failed", result)
            return
        }
    }

    const loadTestData = async () => {
        if (!token || !user || !testId) {
            return
        }
        const result = await executeTestInfo(token, testId)
        if (!result?.data) return
        setTestInfo(result.data)

        const [grade, core, subject] = await Promise.all([
            executeGradeName(token, result.data.grade_id),
            executeCoreSubjectName(token, result.data.coreSubject_id),
            executeSubjecName(token, result.data.subject_id),
        ])

        setlinkInfo({
            name: result.data.name,
            grade_name: grade?.name ?? "",
            coreSubject_name: core?.name ?? "",
            subject_name: subject?.name ?? "",
        })

    }
    const linkTest = useMemo(() => {
        if (!testId) return

        const { grade_name, coreSubject_name, subject_name } = linkInfo
        if (!grade_name || !coreSubject_name || !subject_name) return

        return `${baseUrl}/${testId}?grade=${grade_name}?core=${coreSubject_name}?subject=${subject_name}`
    }, [baseUrl, testId, linkInfo])
    useEffect(() => {
        loadTestData()
        getTeacherStudnets()


    }, [token, user, testId])

    useEffect(() => {

        if (!token || !user || !testId || !linkTest) return

        const update = async () => {
            const result = await executeUpdateTestLink(token, testId, linkTest)
            if (!result?.data) {
                console.error('the error in update link ', result)
            }
            lastSavedLink.current = linkTest
        }
        update()

    }, [linkTest, testId, token])

    return {
        studentList,
        studentsSelected,
        selectStudent,
        sendLink,
        linkTest

    }
}