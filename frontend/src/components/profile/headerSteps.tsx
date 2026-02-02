import Title from "../basic/Title"

type HeaderStepsProps = {
    activeStep: "grades" | "core-subjects" | "subjects" | 'students';

};

const HeaderSteps = ({ activeStep }: HeaderStepsProps) => {

    return (
        <div className="text-center mb-4">
            <Title
                direction="text-center"
                color="color-white"
                name="Create your profile"
            />

            <div className="stepper-container">
                <div className="stepper">

                    {/* Step 1 */}
                    <div className={`step-prfile ${activeStep === "grades" ? "active" : ""}`}>
                        <div className="circle">
                            <i className="bi bi-mortarboard"></i>
                        </div>
                        <p>grades</p>
                    </div>

                    <div className="line"></div>

                    {/* Step 2 */}
                    <div className={`step-prfile ${activeStep === "core-subjects" ? "active" : ""}`}>
                        <div className="circle">
                            <i className="bi bi-journal-bookmark"></i>
                        </div>
                        <p>core subjects</p>
                    </div>

                    <div className="line"></div>

                    {/* Step 3 */}
                    <div className={`step-prfile ${activeStep === "subjects" ? "active" : ""}`}>
                        <div className="circle">
                            <i className="bi bi-journal-text"></i>
                        </div>
                        <p>subjects</p>
                    </div>
                    <div className="line"></div>
                    {/* Step 4 */}
                    <div className={`step-prfile ${activeStep === "students" ? "active" : ""}`}>
                        <div className="circle">
                            <i className="bi bi-people-fill"></i>
                        </div>
                        <p>students</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default HeaderSteps