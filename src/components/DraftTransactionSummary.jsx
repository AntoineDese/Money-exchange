import "../App.css";

const DraftTransactionSummary = props => {
    return (
        <div className = "summary">
        <p>Nazwa transakcji: {props.formTransactionName}</p>
          <p>
            {props.formTransactionValue ? props.formTransactionValue : 0} EUR ={" "}
            {props.formExchangeValue} PLN
          </p>
        </div>
    )
}
export default DraftTransactionSummary;