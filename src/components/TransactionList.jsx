import TransactionListHeader from "./TransactionListHeader";
import Transaction from "./Transaction";
import "../App.css";

const TransactionList = props => {
    return (
        <>
        <TransactionListHeader
            transactionsCount={props.transactions.length}
            transactionsTotalValue={props.result}
          />
          <div className="transactionList">
            {props.transactions.map((transaction, index) => (
              <Transaction
                key = {index}
                name={transaction.name}
                index={index}
                value={transaction.value}
                rate={props.rate}
                onDelete={() => props.deleteTransaction(index)}
              />
            ))}
          </div>
          </>
    )
}
export default TransactionList;