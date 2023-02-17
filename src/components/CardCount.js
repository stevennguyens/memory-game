const CardCount = ({cardCount, input, countChange}) => {
    return (
        <div className="card-count">
            <input className="card-count-input" onKeyDown={(e) => {if (e.key === 8) {countChange()}}} onChange={countChange} placeholder={cardCount} value={cardCount ? cardCount : input}></input>
        </div>
    )
}

export default CardCount