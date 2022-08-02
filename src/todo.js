import React, { useState, useEffect } from "react";
import TransactionList from "./components/TransactionList";
import TransactionListHeader from "./components/TransactionListHeader";
import FormTransactionWrapper from "./components/FormTransactionWrapper";
import ErrorMessage from "./components/ErrorMessage";
import fetchRate from "./api/fetchRate";
import "./App.css";

const Exchange = () => {
  const [error, setError] = useState(false);
  const [rate, setRate] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchRate(
      (r) => setRate(r),
      (err) => {
        console.log("Something go wrong", err);
        setError(true);
      }
    );
  }, []);

  useEffect(() => {
    setTransactions(JSON.parse(localStorage.getItem("myData")));
  }, []);

  useEffect(() => {
    if (transactions.length !== 0) {
      localStorage.setItem("myData", JSON.stringify(transactions));
    }
  }, [transactions]);

  const deleteTransaction = (index) => {
    const filteredTransactions = transactions.filter((item, itemIndex) => {
      return itemIndex !== index;
    });
    setTransactions(filteredTransactions);
  };
  const sum = transactions.reduce(
    (p, c) => (p = Number(p) + Number(c.value)),
    0
  );

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <div className="heading">
            <header>Currency converter</header>
          </div>
          <ErrorMessage error={error} />
          <div className="content-div">
            <div className="converter">Rate: 1 EUR = {rate} PLN</div>
            <FormTransactionWrapper
              rate={rate}
              setTransactions={setTransactions}
            />
            <TransactionListHeader
              transactionsCount={transactions.length}
              transactionsTotalValue={sum}
            />
          </div>

          <p className="ListTitle">Lista transakcji:</p>
        </div>
        <TransactionList
          transactions={transactions}
          result={sum}
          rate={rate}
          deleteTransaction={deleteTransaction}
        />
      </div>
    </>
  );
};
export default Exchange;
