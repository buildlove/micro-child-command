import React from 'react';
import { inject, observer } from 'mobx-react';
import { Spin } from 'antd';
import { uuid } from '@zenview/micro-utils';
import Container from './Container';
import { ThemeAntd } from '@zenview/micro-components';
import Home from '@src/pages/Home'
import './AppHome.less';

function InitialHomeRequest({ children }) {
  if (!window._IS_RUN_MICRO_BASIC) {
    return (
      <ThemeAntd>
        {children}
      </ThemeAntd>
    );
  } else {
    return children;
  }
}

@inject('app')
@observer
class AppHome extends React.Component {
  componentDidMount() {

  }
  openNewPage = () => {
    this.props.history.push(`/demoMap?id=${uuid()}`);
  };
  render() {
    return (
      <InitialHomeRequest Spin={Spin}>
        <Container>
          <Home></Home>
        </Container>
      </InitialHomeRequest>
    );
  }
}

export default AppHome;
