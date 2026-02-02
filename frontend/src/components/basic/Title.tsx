type TitleName = {
    name: string,
    color?: string,
    direction?: string
}

const Title = ({ name, color, direction }: TitleName) => {
    return (
        <>
            <h1 className={`${direction} ${color} text-capitalize mb-4 mt-4`}>{name}</h1>
        </>
    )
}

export default Title