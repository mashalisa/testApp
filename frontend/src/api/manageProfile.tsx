const baseURL = import.meta.env.VITE_BASE_URL
import type {
    NameResponse, 
    UpdateResponse,
    AssignStudentsResponse,
    TeacherStudentsResponse,
    TeacherInfoResponse,
    AllStudentsResponse,
    GradeResponse
} from '../types'

import { API_ENDPOINTS } from '../constains/ApiEndPoints';
import { apiRequest } from '../utils/ApiRequest';
// async function getGrades(token: string): Promise<NameResponse[]> {
//     const response = await fetch(`${baseURL}${API_ENDPOINTS.GRADES}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//     });

//     if (!response.ok) {
//         const data = await response.json();
//         console.log(data, 'data in  getGrades')
//         throw new Error(data.error || "Bad Request");
//     }

//     const data: NameResponse[] = await response.json(); 
//     console.log(data, 'data in  getGrades')
//     return data;
// }

const getGrades = (token:string) => apiRequest<NameResponse[]>(API_ENDPOINTS.GRADES, token)
console.log()

// async function updateGrades
//     (token: string,
//         teacher_id: string,
//         payload: { gradesData: string[] }):
//     Promise<UpdateResponse> {
//     const response = await fetch(`${baseURL}${API_ENDPOINTS.UPDATE_GRADES}${teacher_id}`,  {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//          body: JSON.stringify(payload)
//     })
//     const data = await response.json()
//     console.log(data, 'data update grades')
//     if (!response.ok) {
//         throw new Error(data.error || 'Bad Request')
//     }
//     return data

// }
const updateGrades = (token: string, teacher_id: string, payload: { gradesData: string[] }) =>
apiRequest<UpdateResponse>(`${API_ENDPOINTS.UPDATE_GRADES}${teacher_id}`, token, {
    method: 'PUT',
    body: JSON.stringify(payload)
})


// async function getCoreSubjects(token: string): Promise<NameResponse[]> {
//     const response = await fetch(`${baseURL}${API_ENDPOINTS.CORE_SUBJECTS}`, {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//     })
   
//     if (!response.ok) {
//          const data = await response.json()
//         throw new Error(data.error || 'Bad Request')
//     }
//      const data: NameResponse[] = await response.json()
//     return data

// }

const getCoreSubjects = (token:string) => apiRequest<NameResponse []>(API_ENDPOINTS.CORE_SUBJECTS, token)

// async function updateCoreSubjects(
//     token: string,
//     teacherId: string,
//     coreSubjectsData: { coreSubjectsData: string[] }): Promise<UpdateResponse> {
//     const response = await fetch(`${baseURL}${API_ENDPOINTS.UPDATE_CORE_SUBJECTS}${teacherId}`, {
//         method: 'PUT',
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(coreSubjectsData)
//     })
//     const data = await response.json()
//     if (!response.ok) {
//         throw new Error(data.error || 'Bad Request')
//     }
//     return data
// }
const updateCoreSubjects = ( 
    token: string, 
    teacherId: string, 
    coreSubjectsData: { coreSubjectsData: string[] } ) => 
        apiRequest<UpdateResponse>(`${API_ENDPOINTS.UPDATE_CORE_SUBJECTS}${teacherId}`, token, {
            method:"PUT",
            body: JSON.stringify(coreSubjectsData)
        })


// async function getSubjects(token: string): Promise<NameResponse[]> {
//     const response = await fetch(`${baseURL}${API_ENDPOINTS.SUBJECTS}`, {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//     })
  
//     if (!response.ok) {
//           const data = await response.json()
//         throw new Error(data.error || 'Bad Request')
//     }
//       const data: NameResponse[] = await response.json()
//     return data
// }
const getSubjects = (token:string) => apiRequest<NameResponse[]>(API_ENDPOINTS.SUBJECTS, token)
// async function updateSubjects(
//     token: string,
//     teacherId: string,
//     subjectsData: { subjectsData: string[] }): Promise<UpdateResponse> {

//     const response = await fetch(`${baseURL}${API_ENDPOINTS.UPDATE_SUBJECTS}${teacherId}`, {
//         method: 'PUT',
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(subjectsData)
//     })
//     const data = await response.json()
//     if (!response.ok) {
//         throw new Error(data.error || 'Bad Request')
//     }
//     return data

// }

const updateSubjects = (token: string,
    teacherId: string,
    subjectsData: { subjectsData: string[] }
) => apiRequest<UpdateResponse>(`${API_ENDPOINTS.UPDATE_SUBJECTS}${teacherId}`, token, {
     method: 'PUT',
     body: JSON.stringify(subjectsData)
})


// async function getAllStudnets(token: string): Promise<AllStudentsResponse> {
//     const response = await fetch(`${baseURL}${API_ENDPOINTS.ALL_STUDENTS}`, {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//     })
   
//     if (!response.ok) {
//          const data = await response.json()
//         throw new Error(data.error || 'Bad Request')
//     }
//      const data: AllStudentsResponse = await response.json()
//     return data
// }

const getAllStudnets = (token: string) => apiRequest<AllStudentsResponse>(API_ENDPOINTS.ALL_STUDENTS, token)

// async function assingStudnetsToTeacher(
//     token: string,
//     teacherId: string,
//     students: { students: string[] }): Promise<AssignStudentsResponse> {

//     const response = await fetch(`${baseURL}${API_ENDPOINTS.TEACHER}${teacherId}/students`, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(students)
//     })
//     const data = await response.json()
//     if (!response.ok) {
//         throw new Error(data.error || 'Bad Request')
//     }
//     return data

// }

const assingStudnetsToTeacher = (token: string,
    teacherId: string,
    students: { students: string[] }
) => apiRequest<AssignStudentsResponse>(`${API_ENDPOINTS.TEACHER}${teacherId}/students`, token, {
     method: 'POST',
      body: JSON.stringify(students)
})

// async function getStudentsByTeacher(token: string, id: string) : Promise<TeacherStudentsResponse>{
//     const response = await fetch(`${baseURL}${API_ENDPOINTS.TEACHER}${id}/students`, {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },

//     })
//     const data = await response.json()
//     console.log(data, 'data getStudentsByTeacher')
//     if (!response.ok) {
//         throw new Error(data.error || 'Bad Request')
//     }
//     return data
// }


const getStudentsByTeacher = (token: string,
     id: string) => 
     apiRequest<TeacherStudentsResponse>(`${API_ENDPOINTS.TEACHER}${id}/students`, token)



// async function getProfileInfoByTeacher(token: string, id: string) : Promise <TeacherInfoResponse>{

//     const response = await fetch(`${baseURL}${API_ENDPOINTS.TEACHER}${id}`, {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },

//     })
//     const data = await response.json()
//     console.log(data, 'data getProfileInfoByTeacher')
//     if (!response.ok) {
//         throw new Error(data.error || 'Bad Request')
//     }
//     return data

// }

const getProfileInfoByTeacher = 
(token: string, id: string) => apiRequest<TeacherInfoResponse>
(`${API_ENDPOINTS.TEACHER}${id}`, token)

const getAllTestByTeacher = (
    token: string,
    teacherId: string
) => apiRequest<UpdateResponse>(`${API_ENDPOINTS.TEACHER}${teacherId}`, token)


const getGradeById = (
     token: string,
     gradeId: string,
) => apiRequest<GradeResponse>(`${API_ENDPOINTS.GRADES}${gradeId}`, token)

const getCoreSubjectById = (
     token: string,
     coreSubject_id: string,
) => apiRequest<GradeResponse>(`${API_ENDPOINTS.CORE_SUBJECTS}${coreSubject_id}`, token)

const getSubjectById = (
     token: string,
     subject_id: string,
) => apiRequest<GradeResponse>(`${API_ENDPOINTS.SUBJECTS}${subject_id}`, token)
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
    getProfileInfoByTeacher,
    getAllTestByTeacher,
    getGradeById,
    getCoreSubjectById,
    getSubjectById
}