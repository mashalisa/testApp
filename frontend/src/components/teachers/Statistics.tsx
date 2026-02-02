import { useEffect, useState } from "react"
import { getTestsStatistics } from "../../api/manageStatistics"
import useApi from "../../hooks/useApi"
import { useAuth } from "../../hooks/useAuth"
import type { statiscticsProp, statisticResponse } from "../../types"

const Statistics = () => {
    const { token, user } = useAuth()
    const { execute: executeStatistic } =
        useApi<statisticResponse, [string, string]>(getTestsStatistics)

    const [statistics, setStatistics] = useState<statiscticsProp>([])


    const getTestStatistics = async () => {
        if (!token || !user) {
            return
        }
        const result = await executeStatistic(token, user.id)
        console.log(result?.data, 'result  test statistics')
        if (!result?.data) {
            return;
        }
        setStatistics(result?.data)

    }

    useEffect(() => {
        getTestStatistics()
    }, [token, user])



    return (
        <>
            <table className="table table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>Student</th>
                        <th>Score</th>
                        <th>Correct</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {statistics.map((stat, index) => {
                        const collapseId = `collapse-${index}`

                        return (
                            <>
                                {/* MAIN ROW */}
                                <tr
                                    key={collapseId}
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#${collapseId}`}
                                    role="button"
                                    className="table-row"
                                >
                                    <td>{stat.studentName}</td>
                                    <td>{stat.score}%</td>
                                    <td>{stat.correct}</td>
                                    <td>{stat.total}</td>
                                    <td>
                                        {stat.status === 'top' && '⭐ Top'}
                                        {stat.status === 'pass' && '✅ Pass'}
                                        {stat.status === 'fail' && '❌ Fail'}
                                    </td>
                                </tr>

                                {/* COLLAPSED DETAILS */}
                                <tr className="collapse bg-light" id={collapseId}>
                                    <td colSpan={5}>
                                        <div className="p-3">
                                            <p><strong>Test:</strong> {stat.testName}</p>
                                            <p><strong>Grade:</strong> {stat.grade}</p>
                                            <p><strong>Core Subject:</strong> {stat.coreSubject}</p>
                                            <p><strong>Subject:</strong> {stat.subject}</p>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>


        </>

    )

}

export default Statistics