import React, { useState, useEffect } from "react";
import TransactionList from "./components/TransactionList";
import FormTransactionWrapper from "./components/FormTransactionWrapper";

const Exchange = () => {
  const [rate, setRate] = useState(0);
  const [transactions, setTransactions] = useState([]);

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
          <FormTransactionWrapper
            rate={rate}
            setTransactions={setTransactions}
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
