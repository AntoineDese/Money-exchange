function Transaction (props) {
    return <span key={props.index}>
    <p>Nazwa transakcji: {props.name}</p>
    <p>Wartość w EUR: {props.value}</p>
    <p>Wartość w PLN: {props.value * props.rate}</p>
    <button
         onClick= {
         props.onDelete
         }
    >
        Usuń transakcje
       </button>
    </span>
}
export default Transaction;