import React, { useState} from "react";
import TransactionForm from "./TransactionForm";
import DraftTransactionSummary from "./DraftTransactionSummary";



const FormTransactionWrapper = props => {
    const [formExchangeValue, setFormExchangeValue] = useState(0);
    const [formTransactionName, setFormTransactionName] = useState("");
    const [formTransactionValue, setFormTransactionValue] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormTransactionValue("");
        setFormExchangeValue(0);
        setFormTransactionName("");
        event.target.reset();
      };

      const convert = () => {
        setFormExchangeValue(formTransactionValue * props.rate);
        props.setTransactions((transactions) => [
          ...transactions,
          {
            name: formTransactionName,
            value: formTransactionValue,
          },
        ]);
      };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <TransactionForm
              setFormTransactionValue={setFormTransactionValue}
              setFormExchangeValue={setFormExchangeValue}
              rate={props.rate}
              setFormTransactionName={setFormTransactionName}
              formTransactionName={formTransactionName}
              convert={convert}
            />
          </form>
          <DraftTransactionSummary
            formTransactionName={formTransactionName}
            formTransactionValue={formTransactionValue}
            formExchangeValue={formExchangeValue}
          />
          </>
    )
}

export default FormTransactionWrapper;