import { API_ENDPOINTS } from "../constains/ApiEndPoints";
import type { answerRequest, GetAllResponse, GetResponse, NameResponse, QuestionByIdTypeResponse, statisticResponse, TestCreate, TestDetailsTypeResponse, UpdateResponse } from "../types";
import { apiRequest } from "../utils/ApiRequest";


const getTestsStatistics = (
     token: string,
     teacherId: string,
) => apiRequest<statisticResponse>(`${API_ENDPOINTS.STATISTICS}${teacherId}`, token,)


export {
     getTestsStatistics
}
