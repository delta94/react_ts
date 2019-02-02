import {store} from '@/index';
import {StaticRouter, withRouter, RouterProps, RouteChildrenProps} from 'react-router';
import {MuiThemeProvider} from '@material-ui/core';
import theme from '@/components/Theme/Theme';
import Footer from '@/layouts/Main/Footer';
import {Provider} from 'react-redux';
import React, {ComponentType} from 'react';
import {Request} from 'express';
import Home from '@/views/Homepage/Home';
import RoomIndex from '@/views/Rooms';
import {compose} from "recompose";
import withWidth, {WithWidth} from '@material-ui/core/withWidth/withWidth';
import {withCookies} from 'react-cookie';
import {GlobalContext} from '@/store/context/GlobalContext';
import {AppWrapper} from '@server/wrapper/AppWrapper';

interface IProps {
  req: Request
}

interface LocalProps extends IProps, RouterProps, RouteChildrenProps, WithWidth {

}

// @ts-ignore
export const HomeIndex: ComponentType<IProps> = (props: LocalProps) => {
  const {req, history, location, width, match} = props;
  return (
    <AppWrapper req = {req}>
      <RoomIndex />
    </AppWrapper>
  );
};

