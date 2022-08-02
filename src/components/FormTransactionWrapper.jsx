import React, { useState} from "react";
import TransactionForm from "./TransactionForm";
import DraftTransactionSummary from "./DraftTransactionSummary";
import "../App.css";


const FormTransactionWrapper = props => {
    const [formExchangeValue, setFormExchangeValue] = useState(0);
    const [formTransactionName, setFormTransactionName] = useState("");
    const [formTransactionValue, setFormTransactionValue] = useState("");

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

    const handleSubmit = (event) => {
        convert();
        event.preventDefault();
        setFormTransactionValue("");
        setFormExchangeValue(0);
        setFormTransactionName("");
        
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
              formTransactionValue={formTransactionValue}
              
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