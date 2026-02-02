import { API_ENDPOINTS } from "../constains/ApiEndPoints";
import type { answerRequest, GetAllResponse, GetResponse, NameResponse, QuestionByIdTypeResponse, TestCreate, TestDetailsTypeResponse, UpdateResponse } from "../types";
import { apiRequest } from "../utils/ApiRequest";


const creatingTest = (
     token: string,
     teacherId: string,
     testDataCreating: TestCreate
) => apiRequest<UpdateResponse>(`${API_ENDPOINTS.TEST}${teacherId}`, token, {
     method: 'POST',
     body: JSON.stringify(testDataCreating)
})

const updateTest = (
     token: string,
     testId: string,
     testName: string
) => apiRequest<UpdateResponse>(`${API_ENDPOINTS.TEST}${testId}`, token, {
     method: 'PUT',
     body: JSON.stringify({ name: testName })
})
const updateTestLink = (
     token: string,
     testId: string,
     test_URL: string
) => apiRequest<UpdateResponse>(`${API_ENDPOINTS.TEST}${testId}`, token, {
     method: 'PUT',
     body: JSON.stringify( {test_URL})
})
const deleteTest = (
     token: string,
     testId: string,
) => apiRequest<UpdateResponse>(`${API_ENDPOINTS.TEST}${testId}`, token, {
     method: 'DELETE'
})
const getTestinfoByTestId = (
     token: string,
     testId: string,
) => apiRequest<UpdateResponse>(`${API_ENDPOINTS.TEST}${testId}`, token)

const getAllTests = (
     token: string,
) => apiRequest<GetAllResponse>(`${API_ENDPOINTS.TEST}`, token)
const creatingQuestion = (
     token: string,
     testId: string,
     name: string
) => apiRequest<UpdateResponse>(`${API_ENDPOINTS.QUESTION}${testId}`, token, {
     method: 'POST',
     body: JSON.stringify({ name })
})
const updatingQuestion = (
     token: string,
     questionId: string,
     name: string
) => apiRequest<UpdateResponse>(`${API_ENDPOINTS.QUESTIONEDIT}${questionId}`, token, {
     method: 'PUT',
     body: JSON.stringify({ name })
})

const deleteQuestion = (
     token: string,
     questionId: string,
) => apiRequest<UpdateResponse>(`${API_ENDPOINTS.QUESTIONEDIT}${questionId}`, token, {
     method: 'DELETE'
})

const getQuestionfoByQuestionId = (
     token: string,
     questionId: string,
) => apiRequest<QuestionByIdTypeResponse>(`${API_ENDPOINTS.QUESTIONEDIT}${questionId}`, token)
const creatingAnswer = (
     token: string,
     questionId: string,
     payload: { name: string; correctAnswer: boolean }[]
) => apiRequest<UpdateResponse>(`${API_ENDPOINTS.ANSWER}${questionId}`, token, {
     method: 'POST',
     body: JSON.stringify(payload)
})
const updatingAnswer = (
     token: string,
     answerId: string,
     answerData: answerRequest
) => apiRequest<UpdateResponse>(`${API_ENDPOINTS.ANSWEREDIT}${answerId}`, token, {
     method: 'PUT',
     body: JSON.stringify(answerData)
})
const deleteAnswer = (
     token: string,
     answerId: string,
) => apiRequest<UpdateResponse>(`${API_ENDPOINTS.ANSWEREDIT}${answerId}`, token, {
     method: 'DELETE'
})
export {
     creatingTest,
     updateTest,
     deleteTest,
     getAllTests,
     getTestinfoByTestId,
     creatingQuestion,
     updatingQuestion,
     deleteQuestion,
     getQuestionfoByQuestionId,
     creatingAnswer,
     updatingAnswer,
     deleteAnswer,
     updateTestLink
}
