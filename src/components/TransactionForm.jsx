import "../App.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
const TransactionForm = props => {
  console.log(props.formTransactionName)
    return (
        <div className = "form">
        <TextField type = 'number' sx={{
            margin: 1,
            width: 200
        }}
        id="outlined-basic" size = "small" variant="outlined" margin = "dense"
        
              placeholder="Wpisz wartość w euro"
              onChange={(e) => {
                props.setFormTransactionValue(e.target.value);
                props.setFormExchangeValue(e.target.value * props.rate);
              }}
              value={props.formTransactionValue}
            />
            <TextField sx={{
            margin: 1,
            width: 200
        }}
         id="outlined-basic" size = "small" variant="outlined" margin = "dense"
              
              placeholder="Wpisz nazwę transakcji"
              onChange={(e) => props.setFormTransactionName(e.target.value)}
              value={props.formTransactionName}
            />
            <Button type = 'submit' sx={[{
            margin: 1,
            bgcolor: 'text.secondary', 
        },
        {
          '&:hover': {
            color: 'white',
            backgroundColor: 'text.primary',
          },},
        
      ]}
        variant="contained" size="small" color ="primary" 
            >
              Przelicz
            </Button>
            </div>
    )  
    
}

export default TransactionForm;