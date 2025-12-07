type TitleName =  {
    name: string
}

const Title = ({name}: TitleName) => {
    return(
        <>
        <h1>{name}</h1>
        </>
    )
}

export default Title