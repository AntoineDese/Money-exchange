import "../App.css";
import Button from '@mui/material/Button';
function Transaction (props) {
    return (
        <div className = "list">
    <span>
    <p>Nazwa transakcji: {props.name}</p>
    <p>Wartość w EUR: {props.value}</p>
    <p>Wartość w PLN: {(props.value * props.rate).toFixed(2)}</p>
    <Button sx={[{
            margin: 1,
            bgcolor: 'text.secondary', 
        },
        {
          '&:hover': {
            color: 'white',
            backgroundColor: 'text.primary',
          },},
        
      ]}
    variant="contained" size="small" color = "primary"
         onClick= {
         props.onDelete
         }
    >
        Usuń transakcje
       </Button>
    </span>
    </div>)
}
export default Transaction;