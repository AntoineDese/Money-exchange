const DraftTransactionSummary = props => {
    return (
        <>
        <p>Nazwa transakcji: {props.formTransactionName}</p>
          <p>
            {props.formTransactionValue ? props.formTransactionValue : 0} EUR ={" "}
            {props.formExchangeValue} PLN
          </p>
        </>
    )
}
export default DraftTransactionSummary;