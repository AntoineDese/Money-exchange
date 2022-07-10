import React, { useState, useEffect } from "react";

const Exchange = () => {
  const [name, setName] = useState("");
  const [info, setInfo] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const [input, setInput] = useState(0);
  const [output, setOutput] = useState(0);

  useEffect(() => {
    fetch("https://api.nbp.pl/api/exchangerates/rates/a/eur/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setInfo(data.rates[0].mid);
      })
      .catch((error) => {
        console.error("Błąd", error);
      });
  }, []);

  //console.log(info);

  const convert = () => {
    let rate = info;
    setOutput(input * rate);
    setTransaction((transaction) => [
      ...transaction,
      {
        name: name,
        value: input,
      },
    ]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setInput(0);
    setOutput(0);
    setName("");
    event.target.reset();
  };
  const deleteTransaction = (index) => {
    const filteredTransactions = transaction.filter((item, itemIndex) => {
      return itemIndex !== index;
    });
    setTransaction(filteredTransactions);
  };
  const result = transaction.reduce(
    (p, c) => (p = Number(p) + Number(c.value)),
    0
  );

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <h1>EURO x PLN</h1>
          <div className="converter">Przelicznik: 1 EUR = {info} PLN</div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Wpisz wartość w euro"
              onChange={(e) => (
                setInput(e.target.value), setOutput(e.target.value * info)
              )}
            />
            <input
              type="text"
              placeholder="Wpisz nazwę transakcji"
              onChange={(e) => setName(e.target.value)}
            />
            <button
              onClick={() => {
                convert();
              }}
            >
              Przelicz
            </button>
          </form>
          <p>Nazwa transakcji: {name}</p>
          <p>
            {input} EUR = {output} PLN
          </p>
          <div className="transaction">
            <p>Liczba transakcji: {transaction.length}</p>
            <p>Suma transakcji: {result} EUR</p>
            <p>Lista transakcji:</p>
          </div>
          <div className="transactionList">
            {transaction.map((transaction, index) => (
              <span key={index}>
                <p>Nazwa transakcji: {transaction.name}</p>
                <p>Wartość w EUR: {transaction.value}</p>
                <p>Wartość w PLN: {transaction.value * info}</p>
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
