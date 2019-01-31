import express from 'express';
import path from 'path';
import {ssrApp} from '@server/middleware/ssr';

const app    = express();
const router = express.Router();

const PORT = 3001;

app.use('/', express.static(
  path.resolve('build'),
  {
    // maxAge: '30d',
  },
));

router.use('/', ssrApp);


app.use(router);

app.listen(PORT, (error: any) => {
  if (error) {
    return console.log('Well shit happened', error);
  }

  console.log(`listening on port: ${PORT}`);
});
