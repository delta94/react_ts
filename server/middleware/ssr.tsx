import React from 'react';
import {Request, Response, NextFunction} from 'express';
import {ssrRender} from '@server/util';
import {renderToString} from 'react-dom/server';
import {HomeIndex} from '@server/pages/HomeIndex';

export const ssrApp = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  const dom = renderToString(<HomeIndex req = {req} />);
  return ssrRender(res, dom);
};
