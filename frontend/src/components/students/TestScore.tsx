import { useEffect, useState } from "react"
import { getAllTestsByStudentId, getScoreAllTests } from "../../api/manageStudents"
import useApi from "../../hooks/useApi"
import { type NameResponse, type FullTestResponse, type scoreProp, type scoreResponse, type scoreTestResponse, type scoreTestsResponse, type FullTestListProp } from "../../types"
import { useAuth } from "../../hooks/useAuth"
import { getTestinfoByTestId } from "../../api/manageTest"
import Card from "../basic/Card"
import Title from "../basic/Title"

const TestScore = () => {
    const { user, token } = useAuth()
    const { execute: exrcuteTestScore } = useApi<scoreTestsResponse, [string, string]>(getScoreAllTests)
    const [scoreInfo, setScoreInfo] = useState<scoreProp[]>([])
    const { execute: exrcuteTestList } = useApi<FullTestResponse, [string, string]>(getAllTestsByStudentId)
    const [testList, setTestList] = useState<FullTestListProp[]>([])
    const getScoresWithTests = async () => {
        if (!user || !token) return

        // 1️⃣ fetch tests first
        const testResult = await exrcuteTestList(token, user.id)
        if (!testResult?.data || !Array.isArray(testResult.data)) {
            console.error("Test info fetch failed", testResult);
            return;
        }
        const tests = testResult.data
        setTestList(tests)

        // 2️⃣ fetch scores next
        const scoreResult = await exrcuteTestScore(token, user.id)
        if (!scoreResult?.data) return

        // 3️⃣ merge data
        const merged = scoreResult.data.map((item) => {
            const testInfo = tests.find((test) => test.Test.id === item.test_id)
            console.log(testInfo, ' testInfo')
            return {
                id: item.id,
                student_id: item.student_id,
                test_id: item.test_id,
                score: item.score.toString(),
                totalQuestions: item.total_questions.toString(),
                correctCount: item.correct_answers.toString(),
                name: testInfo?.Test.name ?? "Unknown test",
            }
        })

        setScoreInfo(merged)
    }
    useEffect(() => {
        if (!user || !token) return
        getScoresWithTests()
    }, [user, token])
    return (
        <>
            {scoreInfo.map((item) => (
                <Card className="m-auto">
                    <div key={item.id}>
                        {item.name && <Title name={item.name} />}
                        <ul className="list-group list-group-flush mt-3">
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Score:</span>
                                <span className="fw-bold">{item.score}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total Questions:</span>
                                <span className="fw-bold">{item.totalQuestions}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Correct Answers:</span>
                                <span className="fw-bold">{item.correctCount}</span>
                            </li>
                        </ul>
                    </div>
                </Card>

            ))}
        </>

    )
}
export default TestScore