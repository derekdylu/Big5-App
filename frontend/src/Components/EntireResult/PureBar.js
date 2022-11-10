const PureBar = ({pro, color, h}) => {
    const styleObj = {
        backgroundColor: `${color}`,
        borderRadius: '30px',
        height: `${h}px`,
        width: `${pro}%`,
        marginBottom: '5px'
    }
    return(
        <div style = {styleObj}></div>
    )
}

export default PureBar