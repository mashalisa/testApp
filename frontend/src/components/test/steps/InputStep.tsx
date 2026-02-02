import type { InputType } from "../../../types"
import SubTitle from "../../basic/SubTitle"
import Input from "../../form/Input"
import Submit from "../../form/Submit"
const InputStep = ({ testData, handleUserInput, nextStep, subTitleName, stepError }: InputType) => {
    return (
        <>
            <SubTitle name={`enter your  ${subTitleName}`} />
            <Input
                name="name"
                type="text"
                label_name={`your  ${subTitleName}`}
                value={testData}
                placeholder="user name"
                onChange={handleUserInput}
            />
            <Submit name='next' onClick={nextStep} />
            <div className="error-message">
                {stepError && <p>{stepError}</p>}
            </div>
        </>
    )

}
export default InputStep