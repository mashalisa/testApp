type SubTitleName = {
    name: string,
    color?: string,
    direction?: string
}

const SubTitle = ({ name, color, direction }: SubTitleName) => {
    return (
        <>
            <h2 className={`${direction} ${color} mb-4 text-capitalize`}>{name}</h2>
        </>
    )
}

export default SubTitle