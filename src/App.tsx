import React, {ComponentType} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from '@/components/Theme/Theme';
import RouteList from '@/routes/Main';
import {compose} from 'recompose';
import {withCookies} from 'react-cookie';
import Cookies from 'universal-cookie';
import {Dispatch} from 'redux';
import {ReducersType} from '@/store/reducers';

const cookieRefresher = () => {
  const cookies        = new Cookies();
  let checkExpireToken = cookies.get('token_expires');

  if (!checkExpireToken && cookies.get('_token')) {
    cookies.set('_token', cookies.get('_token'), {
      maxAge: 1800,
      path: '/',
    });
  }

};

const App: ComponentType<{}> = props => {
  cookieRefresher();
  return (
    <MuiThemeProvider theme = {theme}>
      <RouteList />
    </MuiThemeProvider>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

const mapStateToProps = (state: ReducersType) => {
  return {};
};

export default compose(
  withRouter,
  withCookies,
  connect(mapStateToProps, mapDispatchToProps),
)(App);
