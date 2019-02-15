import React, {FunctionComponent} from 'react';
import Loadable from 'react-loadable';
import {Route, Switch} from 'react-router-dom';
import ReviewRoom from '@/views/ProfilePage/ReviewRoom';

const HomePage    = Loadable({
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

const pageDetails = Loadable({
  loader: (): Promise<any> => import('@/views/DetailsPage/DetailsPage'),
  loading: () => {
    return null;
  },
});

const pageReview = Loadable({
  loader: (): Promise<any> => import('@/views/ProfilePage/ReviewRoom'),
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

const RoomsIndex = Loadable({
  loader: (): Promise<any> => import('@/views/Rooms/index'),
  loading: () => null,
});

const BookingPayment = Loadable({
  loader: (): Promise<any> => import('@/views/Bookings/Payment'),
  loading: () => null,
});

const RouteList: FunctionComponent<{}> = props => {
  return (
    <Switch>
      <Route exact path = '/' component = {HomePage} />
      <Route path = '/profile' component = {pageProfile} />
      {/*Booking Router*/}
      <Route path = '/payments/book' component = {BookingForm} />
      <Route path = '/payment/invoice/:uuid' component = {BookingPayment} />
      {/*Room Router*/}
      <Route path = '/rooms' component = {RoomsIndex} />
      <Route path = '/room/:id' component = {pageDetails} />
      <Route path = '/reviews/:id' component = {pageReview} />
      <Route component = {Error500} />
    </Switch>
  );
};

export default RouteList;
