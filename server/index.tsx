import express from 'express';
import path from 'path';
import {ssrApp} from '@server/middleware/ssr';
import {allOtherRoute} from '@server/util';

const app    = express();
const router = express.Router();

const PORT = 3001;

app.use(express.static(
  path.resolve('build'),
  {
    // maxAge: '30d',
  },
));

router.get('/rooms', ssrApp);
router.get('/*', allOtherRoute);

app.use(router);

app.listen(PORT, (error: any) => {
  if (error) {
    return console.log('Well shit happened', error);
  }

  console.log(`listening on port: ${PORT}`);
});
