import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
// Layout
import { MainContainer } from '../../../Layout';

// Molecules
import {
  DataTable,
  ButtonDialogForm,
  ContentHeader
} from '../../../components/Molecules';

// Queries
import { GET_PURCHASES_INVOICES_QUERY } from '../../../queries/Invoice';
import Notification from '../../../components/Notification';
import PurchasesInvoiceForm from './PurchasesInvoiceForm';

const SalesInvoice = ({ history, session }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const columns = [
    {
      name: 'dateEmit',
      title: 'Fecha'
    },
    {
      name: 'person',
      title: 'Proveedor'
    },
    {
      name: 'number',
      title: 'Número'
    },
    {
      name: 'paymentType',
      title: 'Tipo de pago'
    },
    {
      name: 'amount',
      title: 'Monto'
    }
  ];
  return (
    <MainContainer>
      <ContentHeader title="Lista de facturas de venta">
        {session.role !== 'CONSULTOR' && (
          <ButtonDialogForm
            title="Facturar compra"
            scroll="body"
            form={PurchasesInvoiceForm}
            // mutation={'NEW_WAREHOUSE_MUTATION'}
            success={setIsOpen}
          />
        )}
        <Notification
          open={isOpen}
          handleOpen={setIsOpen}
          message="Guardado con exito!"
        />
      </ContentHeader>
      <Query query={GET_PURCHASES_INVOICES_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) console.error(error);

          let { invoices } = data;

          console.log(data);
          return (
            <DataTable
              columns={columns}
              rows={invoices}
              handleClick={({ id }) =>
                history.push(`/gastos/factura-compra/${id}`)
              }
            />
          );
        }}
      </Query>
    </MainContainer>
  );
};

export default withRouter(SalesInvoice);
