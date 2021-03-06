const fetchRate = (onSuccess, onError) => {
  fetch("https://api.nbp.pl/api/exchangerates/rates/a/eur/")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then((data) => {
      onSuccess(data.rates[0].mid);
    })
    .catch((error) => {
      onError(error);
    });
};

export default fetchRate;
