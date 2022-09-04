import { InputAdornment, TextField, TextFieldProps } from "@mui/material";

export function UsdInputField(props: TextFieldProps) {
    return (
        <TextField 
            {...props}
            InputProps={{
                endAdornment: <InputAdornment position="start">DAI</InputAdornment>,
            }}>
        </TextField>
    )
}
