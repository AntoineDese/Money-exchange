import "../App.css";

function Transaction (props) {
    return (
        <div className = "list">
    <span>
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
    </div>)
}
export default Transaction;