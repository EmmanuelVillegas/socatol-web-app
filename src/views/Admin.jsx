import React from 'react';
import { Provider } from 'react-redux';
import { Playground, store } from 'graphql-playground-react';

// Layout
import { FeatureBar } from '../Layout';

const AdminContainer = () => {
  return (
    <>
      <FeatureBar title="Base de datos" />

      <Provider store={store}>
        <Playground endpoint="http://192.168.43.230:5000/graphql" />
      </Provider>
    </>
  );
};

export default AdminContainer;
