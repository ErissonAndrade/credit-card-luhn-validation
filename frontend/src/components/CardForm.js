import './CardForm.css';

function CardForm(props) {
    const { onInputChange, onSubmit } = props
    return (
        <>
            <form data-testid="card-form" method="POST" onSubmit={onSubmit} action="">
                <label htmlFor="card-holder-name" className="name">
                    Card Holder Name
                    <input type="text" required={true} maxLength={30} id="card-holder-name" name="card-holder-name" onChange={onInputChange} />
                </label>
                <label htmlFor="card-number" className="name">
                    Number
                    <input type="text" required={true} maxLength={16} id="card-number" name="card-number" onChange={onInputChange} />
                </label>
                <div>
                    Expiration Date:
                    <div className="expiration-cvv-container">
                        <div className="expiration-date-container">
                            <label htmlFor="card-expiration-month" className="name">MM
                                <input type="text" required={true} maxLength={2} id="card-expiration-month" name="card-expiration-month" onChange={onInputChange} />
                            </label>
                            <label htmlFor="card-expiration-year" className="name">YY
                                <input type="text" required={true} maxLength={2} id="card-expiration-year" name="card-expiration-year" onChange={onInputChange} />
                            </label>
                        </div>
                        <label htmlFor="card-cvv" className="name">
                            CVV
                            <input type="text" required={true} maxLength={4} id="card-cvv" name="card-cvv" onChange={onInputChange} />
                        </label>
                    </div>
                </div>
                <div className="btn-container">
                    <button type="submit" className="submit-btn">Submit</button>
                </div>
            </form>
        </>
    );
};

export default CardForm;