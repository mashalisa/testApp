import type React from "react"
import type { SelectType, TestCreate } from "../../../types"
import Select from "../../basic/Select"
import SubTitle from "../../basic/SubTitle"
import Submit from "../../form/Submit"
const SelectStep = ({
    testData,
    teacherData,
    handleSelectChange,
    nextStep,
    prevStep,
    subTitleName,
    name,
    stepError
}: SelectType) => {

    return (
        <>
            <SubTitle name={`select your   ${subTitleName}`} />
            <div className="mb-3">
                <Select name={name}
                    value={testData.id}
                    options={teacherData}
                    onChange={handleSelectChange}
                    className={`form-select form-select-lg`}
                />
                <div className="error-message">
                    {stepError && <p>{stepError}</p>}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Submit name='back' onClick={prevStep} className="btn-outline-primary" />
                </div>
                <div className="col-md-6">
                    <Submit name='next' onClick={nextStep} />
                </div>

            </div>



        </>
    )

}
export default SelectStep