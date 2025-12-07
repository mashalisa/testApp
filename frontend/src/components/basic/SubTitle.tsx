type SubTitleName =  {
    name: string
}

const SubTitle = ({name}: SubTitleName) => {
    return(
        <>
        <h2>{name}</h2>
        </>
    )
}

export default SubTitle