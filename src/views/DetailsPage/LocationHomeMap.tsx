import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, Fragment, useContext, useState} from 'react';
import {compose,withProps} from 'recompose';
import MarkerMap from '@/views/DetailsPage/MarkerMap';
// @ts-ignore
import GoogleMapReact from 'google-map-react';
import {IRoomDetailsContext, RoomDetailsContext} from '@/store/context/Room/RoomDetailsContext';

interface IProps {
  classes?: any,
  center?: Coords
  zoom?: number,
}

const styles: any = (theme: ThemeCustom) => createStyles({

});

const LocationHomeMap: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;
  const {state, dispatch} = useContext<IRoomDetailsContext>(RoomDetailsContext);

  const {rooms} = state;

  return (
    <Fragment>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAP_KEY || '',
        }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
      >
        <MarkerMap lat={rooms ? rooms!.latitude : 0} lng={rooms ? rooms!.longitude : 0} text={'Home'}/>
      </GoogleMapReact>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(LocationHomeMap);
