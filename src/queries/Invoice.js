import gql from 'graphql-tag';

export const GET_SALES_INVOICES_QUERY = gql`
  {
    getInvoices(type: SALE) {
      number
      dateEmit
      paymentType
    }
  }
`;
