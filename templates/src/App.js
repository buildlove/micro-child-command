import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { BaseStore } from '@zenview/micro-basic-library';
import AppHome from './AppHome';
import { Provider } from 'mobx-react';
// import { AppRoute, LoaderApp } from '@zenview/micro-components';
// import { getSubAppConfig } from './AppConfig';

// const MicroRoute = !window._IS_RUN_MICRO_BASIC ? Route : AppRoute;
const subAppProps = {
  basename: `${process.env.ROUTE_PERFIX}/demoMap`,
  routePerfix: process.env.NODE_ENV === 'development' ? process.env.ROUTE_PERFIX : !window._IS_RUN_MICRO_BASIC ? process.env.ROUTE_PERFIX : '',
};

export default function App(props) {
  // const loginConfig = useMemo(() => getSubAppConfig('login'), []);
  return (
    <Provider app={BaseStore.app}>
      <BrowserRouter basename={subAppProps.routePerfix}>
        <AppHome {...props} />
        {/* {!window._IS_RUN_MICRO_BASIC && <Route path="/login" render={() => <LoaderApp appConfig={loginConfig} appProps={subAppProps} />} />} */}
        {/* <MicroRoute path="/demoMap" render={(params) => <AppHome {...props} {...params} />} /> */}
        {!window._IS_RUN_MICRO_BASIC && <Route exact path="/" render={() => <Redirect to="/demoMap" />} />}
      </BrowserRouter>
    </Provider>
  );
}
