import React, {FunctionComponent} from 'react';
import {Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';

const HomePage = Loadable({
  loader: (): Promise<any> => import('@/views/Homepage/Home'),
  loading: (): any => {
    return null;
  },
});
//
const BookingForm = Loadable({
  loader: (): Promise<any> => import('@/views/Bookings/Form'),
  loading: (): any => {
    return null;
  },
});

const pageProfile = Loadable({
    loader: (): Promise<any> => import('@/views/ProfilePage/Profile'),
    loading: () => {
        return null;
    },
});

const Error500 = Loadable({
  loader: (): Promise<any> => import('@/layouts/Errors/500'),
  loading: (): any => {
    return null;
  },
});


const RouteList: FunctionComponent<{}> = props => {
  return (
    <Switch>
      <Route exact path = '/' component = {HomePage} />
        <Route path='/profile' component={pageProfile}/>
      <Route path='/payments/book' component={BookingForm}/>
      <Route component = {Error500} />
    </Switch>
  );
};

export default RouteList;
