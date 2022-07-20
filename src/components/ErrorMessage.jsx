import "../App.css";

const ErrorMessage = (props) => {
    return (
        <div className = "error">
        {props.error && <p>Kurs niedostępny</p>}
        </div>
    )
}
export default ErrorMessage;