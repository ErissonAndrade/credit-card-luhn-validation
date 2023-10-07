import './CardForm.css';

function CardForm(props) {
    const { onInputChange } = props
    return (
        <>
            <form method="POST" action="">
                <label htmlFor="card-holder-name" className="name">Card Holder Name
                    <input type="text" id="card-holder-name" name="card-holder-name" onChange={onInputChange}/>
                </label>
                <label htmlFor="card-number" className="name" onChange={onInputChange}>Number
                    <input type="text" id="card-number" name="card-number" onChange={onInputChange}/>
                </label>
                <div class="expiration-cvv-container">
                    <label htmlFor="card-expiration-date" className="name">Expiration Date
                        <input type="text" id="card-expiration-date" name="card-expiration-date" onChange={onInputChange}/>
                    </label>
                    <label htmlFor="card-cvv" className="name">CVV
                        <input type="text" id="card-cvv" name="card-cvv" onChange={onInputChange}/>
                    </label>
                </div>
                <div className="btn-container">
                    <button type="submit" class="submit-btn">Submit</button>
                </div>
            </form>
        </>
    );
};

export default CardForm;