import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import fs from 'fs';
import {Request, Response, NextFunction} from 'express';

import Home from '@/views/Homepage/Home';

export const ssrApp = (req: Request, res: Response, next: NextFunction) => {
  const filePath = path.resolve('build', 'index.html');

  fs.readFile(filePath, {encoding: 'utf8'}, (err, htmlData) => {
    if (err) {
      console.log('Error in ssrApp', err);
      return res.status(404).end();
    }

    const html = ReactDOMServer.renderToString(<Home/>);

    return res.send(
      htmlData.replace(
        '<div id="root"></div>',
        `<div id= "root">${html}</div>`,
      ),
    );
  });
};
