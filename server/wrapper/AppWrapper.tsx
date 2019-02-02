import {store} from '@/index';
import {StaticRouter, withRouter, RouterProps, RouteChildrenProps} from 'react-router';
import {MuiThemeProvider} from '@material-ui/core';
import theme from '@/components/Theme/Theme';
import Footer from '@/layouts/Main/Footer';
import {Provider} from 'react-redux';
import React, {ComponentType, ReactNode, FunctionComponent} from 'react';
import {Request} from 'express';
import Home from '@/views/Homepage/Home';
import RoomIndex from '@/views/Rooms';
import {compose} from "recompose";
import withWidth, {WithWidth} from '@material-ui/core/withWidth/withWidth';
import {withCookies} from 'react-cookie';
import {GlobalContext} from '@/store/context/GlobalContext';

interface IProps {
  req: Request
}

interface LocalProps extends IProps, RouterProps, RouteChildrenProps, WithWidth {
  children?: ReactNode
}

// @ts-ignore
export const AppWrapper: FunctionComponent<IProps> = (props: LocalProps) => {
  const {req, history, location, width, match} = props;
  return (
    <Provider store = {store}>
      <StaticRouter location = {req.url} context = {{}}>
        <GlobalContext.Provider value = {{history, location, width, match}}>
          <MuiThemeProvider theme = {theme}>
            {props.children}
          </MuiThemeProvider>
        </GlobalContext.Provider>
      </StaticRouter>
    </Provider>
  );
};

