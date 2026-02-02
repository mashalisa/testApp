type SmallTitleName = {
    name: string,
    color?: string,
    direction?: string

}

const SmallTitle = ({ name, color, direction }: SmallTitleName) => {
    return (
        <>
            <h5 className={`${direction} ${color}`}>{name}</h5>
        </>
    )
}

export default SmallTitle