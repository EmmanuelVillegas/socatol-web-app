import React, { useState } from 'react';
import { withFormsy } from 'formsy-react';

// Material UI
import {
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  withStyles
} from '@material-ui/core';
import classNames from 'classnames';

import { Visibility, VisibilityOff } from '@material-ui/icons';

import styles from './styles';

let InputField = props => {
  const [fieldType, setFieldType] = useState('password');

  const handleShowPassword = () => {
    if (fieldType === 'text') {
      setFieldType('password');
    } else {
      setFieldType('text');
    }
  };

  const {
    classes,
    getErrorMessage,
    getValue,
    setValue,
    value,
    mr,
    ml,
    isPassword
  } = props;
  const errorMessage = getErrorMessage();

  const changeValue = e => {
    setValue(e.target.value);
  };

  const {
    name,
    type,
    label,
    placeholder,
    autoFocus,
    multiline,
    rows,
    rowsMax,
    fullWidth,
    required,
    InputProps = isPassword && {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="Toggle password visibility"
            onClick={handleShowPassword}>
            {fieldType === 'text' ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      )
    },
    select,
    disabled,
    children
  } = props;

  const config = {
    className: classNames(classes.root, mr && classes.mr, ml && classes.ml),
    margin: 'normal',
    variant: 'outlined',
    label,
    required,
    fullWidth,
    onChange: changeValue,
    error: errorMessage ? true : false,
    helperText: errorMessage ? errorMessage : null,
    InputProps,
    disabled
  };

  if (select) {
    return (
      <TextField
        {...config}
        name={name}
        select
        value={getValue() || value || ''}>
        {children && children.length > 0 ? (
          children
        ) : (
          <MenuItem disabled value="">
            No hay registros
          </MenuItem>
        )}
      </TextField>
    );
  }

  return (
    <TextField
      {...config}
      name={name}
      type={isPassword ? fieldType : type ? type : 'text'}
      placeholder={placeholder}
      autoFocus={autoFocus ? true : false}
      multiline={multiline}
      rows={rows}
      rowsMax={rowsMax}
      defaultValue={getValue() || value || ''}
    />
  );
};

// Apply styles
InputField = withStyles(styles)(InputField);

// Apply Formsy
export default withFormsy(InputField);
