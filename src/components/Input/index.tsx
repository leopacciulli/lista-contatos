import { TextField, TextFieldProps } from '@mui/material'

import './styles.scss'

type InputProps = TextFieldProps & {
  errorMessage: string
}

function Input({ errorMessage, ...props }: InputProps) {
  return (
    <>
      <TextField
        {...props}
        variant="standard"
        style={{ width: '100%' }}
        InputLabelProps={{
          classes: {
            standard: 'inputLabel',
            focused: 'labelFocused',
          },
        }}
        InputProps={{
          classes: {
            focused: 'inputFocused',
          },
        }}
      />
      {props.error && <div className="errorField">{errorMessage}</div>}
    </>
  )
}

export default Input
