import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, Fragment, useState} from 'react';
import {compose,withProps} from 'recompose';
import MarkerMap from '@/views/DetailsPage/MarkerMap';

// @ts-ignore
import GoogleMapReact from 'google-map-react';

interface IProps {
  classes?: any,
  center?: {
    lat:number,
    lng:number,
  },
  zoom?: number,
}

const styles: any = (theme: ThemeCustom) => createStyles({

});

const LocationHomeMap: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;

  return (
    <Fragment>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAP_KEY,
        }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
      >
        <MarkerMap lat={21.0279248} lng={105.8346247} text={'Home'}/>
      </GoogleMapReact>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(LocationHomeMap);
