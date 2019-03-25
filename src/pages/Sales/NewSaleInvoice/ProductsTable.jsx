import React from 'react';
import { Field } from 'redux-form';

import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from '@material-ui/core';

// Atoms
// import CardContainer from '../../../components/Atoms/CardContainer';
import InputField from '../../../components/Atoms/InputField';
import ReduxInputField from '../../../components/Atoms/ReduxInputField';

import { Plus, Trash2 } from 'react-feather';

const ProductsTable = ({ fields = [] }) => {
  const fieldProps = {
    style: { padding: '12px 12px', margin: 0 },
    variant: 'outlined',
    fullWidth: true,
    noMargin: true,
    dense: true
  };
  console.log(fields);
  return (
    <div style={{ overflowX: 'auto' }}>
      <Table style={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell
              padding="none"
              style={{ padding: '12px 20px', width: 426 }}>
              Nombre del producto
            </TableCell>
            <TableCell
              align="center"
              padding="none"
              style={{ width: 80, padding: '12px' }}>
              Cantidad
            </TableCell>
            <TableCell
              align="center"
              padding="none"
              style={{ width: 150, padding: '12px' }}>
              Precio
            </TableCell>
            <TableCell
              align="center"
              padding="none"
              style={{ width: 80, padding: '12px' }}>
              IVA%
            </TableCell>
            <TableCell
              align="right"
              padding="none"
              style={{ width: 200, padding: '12px' }}>
              Total
            </TableCell>
            <TableCell
              align="right"
              padding="none"
              style={{ width: 45, padding: '12px' }}>
              <IconButton color="primary" onClick={() => fields.push({})}>
                <Plus size={24} />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((product, index) => (
            <TableRow key={index}>
              <TableCell padding="none" style={{ border: 'none' }}>
                <Field
                  component={ReduxInputField}
                  name={`${product}.naame`}
                  placeholder="Seleccione un producto"
                  {...fieldProps}
                />
              </TableCell>
              <TableCell padding="none" style={{ border: 'none' }}>
                <Field
                  component={ReduxInputField}
                  name={`${product}.quantity`}
                  placeholder="0"
                  {...fieldProps}
                />
              </TableCell>
              <TableCell padding="none" style={{ border: 'none' }}>
                <Field
                  component={ReduxInputField}
                  name={`${product}.price`}
                  placeholder="0"
                  {...fieldProps}
                />
              </TableCell>
              <TableCell padding="none" style={{ border: 'none' }}>
                <Field
                  component={ReduxInputField}
                  name={`${product}.iva`}
                  placeholder="0"
                  {...fieldProps}
                />
              </TableCell>
              <TableCell padding="none" style={{ border: 'none' }}>
                <Field
                  component={ReduxInputField}
                  name={`${product}.total`}
                  placeholder="0"
                  {...fieldProps}
                />
              </TableCell>
              <TableCell
                align="center"
                padding="none"
                style={{ border: 'none' }}>
                <IconButton
                  color="primary"
                  onClick={() => fields.remove(index)}>
                  <Trash2 size={24} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;