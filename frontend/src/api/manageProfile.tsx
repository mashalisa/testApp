const baseURL = import.meta.env.VITE_BASE_URL
import type {
    NameResponse, 
    UpdateResponse,
    AssignStudentsResponse,
    TeacherStudentsResponse,
    TeacherInfoResponse,
    AllStudentsResponse
} from '../types'

import { API_ENDPOINTS } from '../constains/ApiEndPoints';
async function getGrades(token: string): Promise<NameResponse[]> {
    const response = await fetch(`${baseURL}${API_ENDPOINTS.GRADES}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Bad Request");
    }

    const data: NameResponse[] = await response.json(); 
    return data;
}



async function updateGrades
    (token: string,
        teacher_id: string,
        payload: { gradesData: string[] }):
    Promise<UpdateResponse> {
    const response = await fetch(`${baseURL}${API_ENDPOINTS.UPDATE_GRADES}${teacher_id}`,  {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.error || 'Bad Request')
    }
    return data

}

async function getCoreSubjects(token: string): Promise<NameResponse[]> {
    const response = await fetch(`${baseURL}${API_ENDPOINTS.CORE_SUBJECTS}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
   
    if (!response.ok) {
         const data = await response.json()
        throw new Error(data.error || 'Bad Request')
    }
     const data: NameResponse[] = await response.json()
    return data

}

async function updateCoreSubjects(
    token: string,
    teacherId: string,
    coreSubjectsData: { coreSubjectsData: string[] }): Promise<UpdateResponse> {
    const response = await fetch(`${baseURL}${API_ENDPOINTS.UPDATE_CORE_SUBJECTS}${teacherId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(coreSubjectsData)
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.error || 'Bad Request')
    }
    return data
}

async function getSubjects(token: string): Promise<NameResponse[]> {
    const response = await fetch(`${baseURL}${API_ENDPOINTS.SUBJECTS}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
  
    if (!response.ok) {
          const data = await response.json()
        throw new Error(data.error || 'Bad Request')
    }
      const data: NameResponse[] = await response.json()
    return data
}

async function updateSubjects(
    token: string,
    teacherId: string,
    subjectsData: { subjectsData: string[] }): Promise<UpdateResponse> {

    const response = await fetch(`${baseURL}${API_ENDPOINTS.UPDATE_SUBJECTS}${teacherId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(subjectsData)
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.error || 'Bad Request')
    }
    return data

}

async function getAllStudnets(token: string): Promise<AllStudentsResponse> {
    const response = await fetch(`${baseURL}${API_ENDPOINTS.ALL_STUDENTS}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
   
    if (!response.ok) {
         const data = await response.json()
        throw new Error(data.error || 'Bad Request')
    }
     const data: AllStudentsResponse = await response.json()
    return data
}

async function assingStudnetsToTeacher(
    token: string,
    teacherId: string,
    students: { students: string[] }): Promise<AssignStudentsResponse> {

    const response = await fetch(`${baseURL}${API_ENDPOINTS.TEACHER}${teacherId}/students`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(students)
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.error || 'Bad Request')
    }
    return data

}

async function getStudentsByTeacher(token: string, id: string) : Promise<TeacherStudentsResponse>{
    const response = await fetch(`${baseURL}${API_ENDPOINTS.TEACHER}${id}/students`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

    })
    const data = await response.json()
    console.log(data, 'data getStudentsByTeacher')
    if (!response.ok) {
        throw new Error(data.error || 'Bad Request')
    }
    return data
}

async function getProfileInfoByTeacher(token: string, id: string) : Promise <TeacherInfoResponse>{

    const response = await fetch(`${baseURL}${API_ENDPOINTS.TEACHER}${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

    })
    const data = await response.json()
    console.log(data, 'data getProfileInfoByTeacher')
    if (!response.ok) {
        throw new Error(data.error || 'Bad Request')
    }
    return data

}
export {
    getGrades,
    updateGrades,
    getCoreSubjects,
    updateCoreSubjects,
    getSubjects,
    updateSubjects,
    getAllStudnets,
    assingStudnetsToTeacher,
    getStudentsByTeacher,
    getProfileInfoByTeacher
}