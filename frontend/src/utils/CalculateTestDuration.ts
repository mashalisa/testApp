
export const calculateTestDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    const diffMs = end - start;
    const totalSeconds = Math.floor(diffMs / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const duration = `${minutes}:${seconds.toString().padStart(2, "0")}`
    // setDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`)

    return duration

}
