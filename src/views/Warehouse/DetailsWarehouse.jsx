import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';

// Material UI
import { Grid, Typography, Card, CardContent } from '@material-ui/core';

// Layout
import { MainContainer, FeatureBar } from '../../Layout';

// Molecules
import {
  ContentHeader,
  ButtonDialogForm,
  DataTable
} from '../../components/Molecules';

// Queries
import { GET_WAREHOUSE_QUERY } from '../../queries/Warehouse';

// Mutations
import { UPDATE_WAREHOUSE_MUTATION } from '../../mutations/Warehouse';

// Forms
import WarehouseForm from './WarehouseForm';

import Notification from '../../components/Notification';

const DetailsWarehouse = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { id } = props.match.params;
  const { history, session } = props;
  const columns = [
    {
      name: 'name',
      title: 'Nombre'
    },
    {
      name: 'stock',
      title: 'Almacenado'
    },
    {
      name: 'price',
      title: 'Precio'
    }
  ];
  return (
    <Query query={GET_WAREHOUSE_QUERY} variables={{ id }}>
      {({ loading, error, data, refetch }) => {
        if (loading) return null;
        if (error) console.error(error.message);
        console.log(data);

        let { warehouse } = data;

        return (
          <>
            <FeatureBar title={warehouse.name} back subtitle="Almacén" />
            <MainContainer>
              <ContentHeader title="Información del almacén">
                {session.role !== 'CONSULTOR' && (
                  <ButtonDialogForm
                    title="Editar almacén"
                    form={WarehouseForm}
                    mutation={UPDATE_WAREHOUSE_MUTATION}
                    data={warehouse}
                    success={setIsOpen}
                    reload={refetch}
                  />
                )}
                <Notification
                  open={isOpen}
                  handleOpen={setIsOpen}
                  message="Actualizado con exito!"
                />
              </ContentHeader>
              <Grid container spacing={24}>
                <Grid item xs={12} md={4}>
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      <Card>
                        <CardContent>
                          <Typography variant="subtitle1" color="textSecondary">
                            <b>Nombre:</b> {warehouse.name}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            <b>Descripción:</b> {warehouse.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                  <DataTable
                    columns={columns}
                    rows={warehouse.products}
                    handleClick={({ id }) =>
                      history.push(`/inventario/productos/${id}`)
                    }
                  />
                </Grid>
              </Grid>
            </MainContainer>
          </>
        );
      }}
    </Query>
  );
};

export default withRouter(DetailsWarehouse);
