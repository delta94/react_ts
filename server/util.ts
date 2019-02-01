import path from 'path';
import fs from 'fs';
import {Response} from 'express';

export const htmlBase = path.resolve('build', 'index.html');

export const ssrRender = (res: Response, domString: string) => {
  fs.readFile(htmlBase, {encoding: 'utf8'}, (err, htmlData) => {

    return res.send(
      htmlData.replace(
        `<div id="root"></div>`,
        `<div id= "root">${domString}</div>`,
      ),
    );
  });
};
