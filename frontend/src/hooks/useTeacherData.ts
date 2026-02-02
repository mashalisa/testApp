import { useEffect, useState } from "react";
import type { TeacherData } from "../types";
import { useAuth } from "./useAuth";
import { getProfileInfoByTeacher } from "../api/manageProfile";

export const useTeacherData = () => {
     const { token, user } = useAuth()
    const [teacherData, setTeacherData] = useState<TeacherData>({
        grades: [],
        coreSubjects: [],
        subjects: []
    })

    const loadingteacherData = async () => {
        if (!token || !user) {
            console.error("Missing token or user")
            return
        }
        const data = await getProfileInfoByTeacher(token, user.id)
        if (data?.data) {
            setTeacherData({
                grades: data.data.grades,
                coreSubjects: data.data.coreSubjects,
                subjects: data.data.subjects
            });
        }

    }

    useEffect(() => {
        loadingteacherData()
    }, [token, user])


    return teacherData
}