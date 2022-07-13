import React, { useState, useEffect } from "react";
import TransactionList from "./components/TransactionList";
import FormTransactionWrapper from "./components/FormTransactionWrapper";
import fetchRate from "./api/fetchRate";

const Exchange = () => {
  const [rate, setRate] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchRate(
      (r) => setRate(r),
      (err) => console.log("Something go wrong", err)
    );
  }, []);

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
          <h1>EURO x PLN</h1>
          <div className="converter">Przelicznik: 1 EUR = {rate} PLN</div>
          <FormTransactionWrapper
            rate={rate}
            setTransactions={setTransactions}
          />
          <TransactionList
            transactions={transactions}
            result={sum}
            rate={rate}
            deleteTransaction={deleteTransaction}
          />
        </div>
      </div>
    </>
  );
};
export default Exchange;
