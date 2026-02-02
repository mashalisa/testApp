import type { TestForm } from "../../../types"
import SmallTitle from "../../basic/SmallTitle"
import Submit from "../../form/Submit"
type testDataProp = {
    testData: TestForm,
    createTest: () => void;
    prevStep: () => void;
}
const StepReview = ({ testData, createTest, prevStep }: testDataProp) => {
    return (
        <>
            <SmallTitle name="Review Your Test" />
            <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="text-muted">Test Name</span>
                    <strong>{testData.name}</strong>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                    <span className="text-muted">Grade</span>
                    <strong>{testData.gradeId.name}</strong>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                    <span className="text-muted">Core Subject</span>
                    <strong>{testData.coreSubjectId.name}</strong>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                    <span className="text-muted">Subject</span>
                    <strong>{testData.subjectId.name}</strong>
                </li>
            </ul>
            <div className="row g-3">
                <div className="col-md-6">
                    <Submit name="back" className="btn-outline-primary" onClick={prevStep} />
                </div>
                <div className="col-md-6">
                    <Submit name="create test" onClick={createTest} />
                </div>
            </div>
        </>
    )
}

export default StepReview