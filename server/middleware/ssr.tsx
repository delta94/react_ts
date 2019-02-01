import React from 'react';
import {Request, Response, NextFunction} from 'express';
import {store} from '@/index';
import {ssrRender} from '@server/util';
import {renderToString} from 'react-dom/server';
import Footer from '@/layouts/Main/Footer';
import {Provider} from 'react-redux';
import theme from '@/components/Theme/Theme';
import {MuiThemeProvider} from '@material-ui/core';
import App from '@/App';
import {StaticRouter} from 'react-router';
import Home from '@/views/Homepage/Home';

export const ssrApp = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  const dom = renderToString((
    <Provider store = {store}>
      <StaticRouter location = {req.url} context = {{}}>
        <MuiThemeProvider theme = {theme}>
          <Footer/>
        </MuiThemeProvider>
      </StaticRouter>
    </Provider>
  ));
  return ssrRender(res, dom);
};
