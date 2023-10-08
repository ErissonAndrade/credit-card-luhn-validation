import './Card.css'

function Card(props) {
    const { name, number, expirationMonth, expirationYear, cvv } = props;

    return (
        <div className="cards">
            <div className="card-front">
                <div>{number}</div>
                <div className="name-date-container">
                    <div>{name}</div>
                    <div className="expiration-date">
                        <div>{expirationMonth}/{expirationYear}</div>
                    </div>
                </div>
            </div>
            <div className="card-back">
                <div className="cvv">{cvv}</div>
            </div>
        </div>
    )
}

export default Card;