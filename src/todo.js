import React, { useState, useEffect } from "react";

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
            <input
              type="text"
              placeholder="Wpisz wartość w euro"
              onChange={(e) => {
                setFormTransactionValue(e.target.value);
                setFormExchangeValue(e.target.value * rate);
              }}
              value={formTransactionValue}
            />
            <input
              type="text"
              placeholder="Wpisz nazwę transakcji"
              onChange={(e) => setFormTransactionName(e.target.value)}
            />
            <button
              onClick={() => {
                convert();
              }}
            >
              Przelicz
            </button>
          </form>
          <p>Nazwa transakcji: {formTransactionName}</p>
          <p>
            {formTransactionValue ? formTransactionValue : 0} EUR ={" "}
            {formExchangeValue} PLN
          </p>
          <div className="transaction">
            <p>Liczba transakcji: {transactions.length}</p>
            <p>Suma transakcji: {result} EUR</p>
            <p>Lista transakcji:</p>
          </div>
          <div className="transactionList">
            {transactions.map((transactions, index) => (
              <span key={index}>
                <p>Nazwa transakcji: {transactions.name}</p>
                <p>Wartość w EUR: {transactions.value}</p>
                <p>Wartość w PLN: {transactions.value * rate}</p>
                <button
                  onClick={() => {
                    deleteTransaction(index);
                  }}
                >
                  Usuń transakcje
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Exchange;
