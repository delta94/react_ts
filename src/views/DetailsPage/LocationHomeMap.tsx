import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, Fragment, useContext} from 'react';
import {compose} from 'recompose';
import MarkerMap from '@/views/DetailsPage/MarkerMap';
// @ts-ignore
import GoogleMapReact, {Coords} from 'google-map-react';
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
  const {state}   = useContext<IRoomDetailsContext>(RoomDetailsContext);

  const {room} = state;

  return (
    <Fragment>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAP_KEY || '',
        }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
      >
        <MarkerMap lat={room ? room!.latitude : 0} lng={room ? room!.longitude : 0} text={'Home'}/>
      </GoogleMapReact>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(LocationHomeMap);
