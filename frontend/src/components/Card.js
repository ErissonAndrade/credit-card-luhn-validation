import './Card.css'

function Card(props) {
    const { name, number, expirationDate, cvv } = props;

    return (
        <div className="cards">
            <div className="card-front">
                <div>{number}</div>
                <div className="name-date-container">
                    <div>{name}</div>
                    <div>{expirationDate}</div>
                </div>
            </div>
            <div className="card-back">
                <div className="cvv">{cvv}</div>
            </div>
        </div>
    )
}

export default Card;