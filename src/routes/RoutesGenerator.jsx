import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Layout
import Layout from '../Layout';

import { publicRoutes, privateRoutes } from './appRoutes';

const RoutesGenerator = ({ session, refetch }) => {
  let userRoutes = [];
  if (session) {
    const { role } = session;
    if (role && role !== '') {
      if (role === 'ADMINISTRADOR') {
        userRoutes = privateRoutes;
      } else {
        privateRoutes.forEach(route => {
          const permissionIndex = route.permissions.indexOf(role);
          console.log(permissionIndex);
          if (permissionIndex >= 0) {
            userRoutes.push(route);
          }
        });
      }
    }

    return (
      <BrowserRouter>
        <Layout session={session}>
          <Switch>
            {userRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                render={routeProps => (
                  <route.component {...routeProps} session={session} />
                )}
                exact={route.exact && route.exact}
              />
            ))}
            <Route
              component={() => (
                <div>
                  <h1>not found 404</h1>
                </div>
              )}
            />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        {publicRoutes.map((route, index) => {
          if (route.refetch) {
            const Component = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                render={props => <Component {...props} refetch={refetch} />}
                exact={route.exact ? true : false}
              />
            );
          }
          return (
            <Route
              key={index}
              path={route.path}
              component={route.component}
              exact={route.exact ? true : false}
            />
          );
        })}
        <Route
          component={() => (
            <div>
              <h1>not found 404</h1>
            </div>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default RoutesGenerator;
