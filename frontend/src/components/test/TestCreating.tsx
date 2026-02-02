import { useState } from "react"
import Title from "../basic/Title"
import useForm from "../../hooks/useForm"
import { useAuth } from "../../hooks/useAuth"
import './Test.css'
import { type TestCreate, type TestCreateResponse, type TestForm } from '../../types'
import InputStep from "./steps/InputStep"
import SelectStep from "./steps/SelectStep"
import Submit from "../form/Submit"
import useApi from "../../hooks/useApi"
import { creatingTest, } from "../../api/manageTest"
import { useNavigate } from "react-router-dom"
import Card from "../basic/Card"
import SmallTitle from "../basic/SmallTitle"
import { useTeacherData } from "../../hooks/useTeacherData"
import { useTestValidation } from "../../hooks/useTestvalidation"
import StepReview from "./steps/StepReview"

const Test = () => {
    const { token, user } = useAuth()
    const [stepError, setStepError] = useState<string>('')
    const [currentStep, setCurrentStep] = useState<number>(1);
    const { stepValidate } = useTestValidation()

    const teacherData = useTeacherData()

    const defaultTestData: TestForm = {
        name: '',
        gradeId: { id: "", name: "" },
        coreSubjectId: { id: "", name: "" },
        subjectId: { id: "", name: "" }
    };
    const { execute: executeCreatingTest, isLoading } =
        useApi<TestCreateResponse, [string, string, TestCreate]>(creatingTest)

    const { values: testData, handleUserInput, handleSelectChange } = useForm<TestForm>(defaultTestData)
    const navigate = useNavigate()

    const nextStep = async () => {
        console.log(testData, 'testData next')
        const error = await stepValidate(currentStep, testData)
        console.log(error, 'error')
        if (error) {
            setStepError(error)
            return
        }
        setStepError('')
        setCurrentStep(prev => {

            const newStep = prev + 1;
            if (newStep === 5) console.log(testData);
            return newStep;
        });


    }

    const prevStep = () => {
        console.log(testData, 'testData back')
        setCurrentStep((prev) => prev - 1)
    }

    const createTest = async () => {
        if (!token || !user) return
        const result = await executeCreatingTest(token, user.id, {
            name: testData.name,
            grade_id: testData.gradeId.id,
            coreSubject_id: testData.coreSubjectId.id,
            subject_id: testData.subjectId.id
        })
        console.log(result, 'result in create test')
        if (!result || !result?.data?.id) {
            console.error("Test creation failed", result)
            return
        }

        const testId = result?.data.id
        console.log(testId, 'testId')
        navigate(`/tests/${testId}/questions`)

    }

    return (
        <>
            <Title color="color-white" direction="text-center" name="Create new test" />
            <Card className="m-auto">
                <div className={`step ${currentStep == 1 ? 'active' : ''}`} >
                    <InputStep testData={testData.name}
                        handleUserInput={handleUserInput}
                        nextStep={nextStep}
                        subTitleName='test name'
                        stepError={stepError}
                    />
                </div>

                <div className={`step ${currentStep == 2 ? 'active' : ''}`} >
                    <SelectStep testData={testData.gradeId}
                        teacherData={teacherData.grades}
                        handleSelectChange={handleSelectChange}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        subTitleName='grades'
                        name='gradeId'
                        stepError={stepError}


                    />
                </div>

                <div className={`step ${currentStep == 3 ? 'active' : ''}`} >
                    <SelectStep testData={testData.coreSubjectId}
                        teacherData={teacherData.coreSubjects}
                        handleSelectChange={handleSelectChange}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        subTitleName='core subjects'
                        name='coreSubjectId'
                        stepError={stepError}
                    />
                </div>

                <div className={`step ${currentStep == 4 ? 'active' : ''}`} >
                    <SelectStep testData={testData.subjectId}
                        teacherData={teacherData.subjects}
                        handleSelectChange={handleSelectChange}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        subTitleName='subjects'
                        name='subjectId'
                        stepError={stepError}
                    />
                </div>

                <div className={`step ${currentStep == 5 ? 'active' : ''}`} >
                    <StepReview testData={testData} prevStep={prevStep} createTest={createTest} />
                </div>
            </Card>





        </>
    )
}

export default Test