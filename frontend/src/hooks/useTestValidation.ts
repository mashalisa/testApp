import { getAllTests } from "../api/manageTest";
import type { GetAllResponse, TestForm } from "../types";
import useApi from "./useApi";
import { useAuth } from "./useAuth";

export const useTestValidation = () => {
    const { token } = useAuth()
    const { execute: executeTestsList } =
        useApi<GetAllResponse, [string]>(getAllTests)


    const stepValidate = async (step: number, data: TestForm) => {
        if (!token) return
        if (step === 1) {
            if (!data.name.trim()) return "Test name is required";
            const result = await executeTestsList(token);

            if (!result?.data) return;

            const existsName = result.data.some(
                (test) => test.name === data.name
            );

            if (existsName) {
                console.log("Test name already exists")
                return "Test name already exists";

            }
            return null;
        }
        if (step === 2 && !data.gradeId.id) return "Grade is required"
        if (step === 3 && !data.coreSubjectId.id) return "Core subject is required"
        if (step === 4 && !data.subjectId.id) return "Subject is required"

        return null
    }

    return { stepValidate }
}

