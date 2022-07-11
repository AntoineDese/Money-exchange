const TransactionForm = props => {
    return (
        <>
        <input
              type="text"
              placeholder="Wpisz wartość w euro"
              onChange={(e) => {
                props.setFormTransactionValue(e.target.value);
                props.setFormExchangeValue(e.target.value * props.rate);
              }}
              value={props.formTransactionValue}
            />
            <input
              type="text"
              placeholder="Wpisz nazwę transakcji"
              onChange={(e) => props.setFormTransactionName(e.target.value)}
              value={props.formTransactionName}
            />
            <button
              onClick={() => {
                props.convert();
              }}
            >
              Przelicz
            </button>
            </>
    )
}

export default TransactionForm;