import React, { useState, useEffect } from "react";
import TransactionList from "./components/TransactionList";
import TransactionForm from "./components/TransactionForm";
import DraftTransactionSummary from "./components/DraftTransactionSummary";

const Exchange = () => {
  const [formTransactionName, setFormTransactionName] = useState("");
  const [rate, setRate] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [formTransactionValue, setFormTransactionValue] = useState("");
  const [formExchangeValue, setFormExchangeValue] = useState(0);

  useEffect(() => {
    fetch("https://api.nbp.pl/api/exchangerates/rates/a/eur/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setRate(data.rates[0].mid);
      })
      .catch((error) => {
        console.error("Błąd", error);
      });
  }, []);

  const convert = () => {
    setFormExchangeValue(formTransactionValue * rate);
    setTransactions((transactions) => [
      ...transactions,
      {
        name: formTransactionName,
        value: formTransactionValue,
      },
    ]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormTransactionValue("");
    setFormExchangeValue(0);
    setFormTransactionName("");
    event.target.reset();
  };
  const deleteTransaction = (index) => {
    const filteredTransactions = transactions.filter((item, itemIndex) => {
      return itemIndex !== index;
    });
    setTransactions(filteredTransactions);
  };
  const result = transactions.reduce(
    (p, c) => (p = Number(p) + Number(c.value)),
    0
  );

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <h1>EURO x PLN</h1>
          <div className="converter">Przelicznik: 1 EUR = {rate} PLN</div>
          <form onSubmit={handleSubmit}>
            <TransactionForm
              setFormTransactionValue={setFormTransactionValue}
              setFormExchangeValue={setFormExchangeValue}
              rate={rate}
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
          <TransactionList
            transactions={transactions}
            result={result}
            rate={rate}
            deleteTransaction={deleteTransaction}
          />
        </div>
      </div>
    </>
  );
};
export default Exchange;
