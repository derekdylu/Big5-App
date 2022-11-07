const PureBar = ({pro, color}) => {
    const styleObj = {
        backgroundColor: `${color}`,
        border: `solid 2px ${color}`,
        borderRadius: '30px',
        height: '20px',
        width: `${pro}%`
    }
    return(
        <div style = {styleObj}></div>
    )
}

export default PureBar