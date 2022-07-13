const ErrorMessage = (props) => {
    return (
        <>
        {props.error && <p>Kurs niedostępny</p>}
        </>
    )
}
export default ErrorMessage;