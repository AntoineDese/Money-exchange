import "../App.css";

const TransactionListHeader = props => {
    return (
    <div className="transaction">
    <p>Liczba transakcji: {props.transactionsCount}</p>
    <p>Suma transakcji: {props.transactionsTotalValue} EUR</p>
    
  </div>)
}
export default TransactionListHeader;