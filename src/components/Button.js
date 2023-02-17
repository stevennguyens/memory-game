const Button = ({onClick, name, active}) => {
    return (
        <button onClick={onClick} className={active ? "btn btn-grey" : "btn"}>{name}</button>
    )
}

export default Button