import { API_ENDPOINTS } from "../constains/ApiEndPoints";
import type {  AnswerSentResponse, FullTestResponse, QuestionAnswerPayload, scoreProp, scoreResponse, scoreTestResponse, scoreTestsResponse, testQuestionResponse, testStaredRequest, UpdateResponse } from "../types";
import { apiRequest } from "../utils/ApiRequest";


const assignTestToStudents = (
    token: string,
    testId: string,
    studentIds: string[]
) => apiRequest<UpdateResponse>(`${API_ENDPOINTS.TESTSTUDENT}${testId}`, token, {
    method: 'POST',
    body: JSON.stringify({
        studentIds

    })
})

const getAllTestsByStudentId = (
    token: string,
    studentId: string,
) => apiRequest<FullTestResponse>(`${API_ENDPOINTS.STUDENTSTESTS}${studentId}/my-tests`, token)

const getStartTest = (
    token: string,
    studentId: string,
    testId: string
) => apiRequest<testStaredRequest>(`${API_ENDPOINTS.STARTTEST}${testId}/students/${studentId}/inProgress`, token, {
    method: 'POST',
    body: JSON.stringify({
        status: 'in_progress'


    })
})


const getTestQuestionsByTestId = (
    token: string,
    testId: string,
) => apiRequest<testQuestionResponse>(`${API_ENDPOINTS.TEST}${testId}/studentTest`, token)


const sendTestAnswers = (
    token: string,
    studentId: string,
    testId: string,
    payload: QuestionAnswerPayload,
) => apiRequest<AnswerSentResponse>(`${API_ENDPOINTS.TESTANSWERS}${studentId}/test/${testId}/submit`, token, {
    method: 'POST',
    body: JSON.stringify(payload)
})

const getSubmitTest = (
    token: string,
    studentId: string,
    testId: string
) => apiRequest<testStaredRequest>(`${API_ENDPOINTS.STARTTEST}${testId}/students/${studentId}/end`, token, {
    method: 'PUT',
    body: JSON.stringify({
        status: 'completed'
    })
})

const calculateScore = (
    token: string,
    studentId: string,
    testId: string,
) => apiRequest<scoreResponse>(`${API_ENDPOINTS.SCORE}${testId}/${studentId}/`, token, {
    method: 'POST'
})

const getScoreAllTests = (
    token: string,
    studentId: string,
) => apiRequest<scoreTestsResponse>(`${API_ENDPOINTS.TESTSCORE}${studentId}/my-score`, token)


const getTecherNameById = (
    token: string,
    teacherId: string,
) => apiRequest<FullTestResponse>(`${API_ENDPOINTS.TEACHER}teacher-name/${teacherId}`, token)

export {
    assignTestToStudents,
    getAllTestsByStudentId,
    getStartTest,
    getTestQuestionsByTestId,
    sendTestAnswers,
    getSubmitTest,
    calculateScore,
    getScoreAllTests,
    getTecherNameById
}


