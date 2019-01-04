import {ThemeCustom} from '@/components/Theme/Theme';
import NavSearch from '@/components/ToolBar/NavSearch';
import NavTop from '@/components/ToolBar/NavTop';
import GridImage from '@/views/DetailsPage/GridImage';
import BoxDetails from '@/views/DetailsPage/BoxDetails';
import BoxReviews from '@/views/DetailsPage/BoxReviews';
import BoxBooking from '@/views/DetailsPage/BoxBooking';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, useEffect, useState} from 'react';
import {compose} from 'recompose';
import Button from '@material-ui/core/Button/Button';
import GridContainer from '@/layouts/Grid/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import {AxiosRes} from '@/types/Requests/ResponseTemplate';
import {RoomIndexRes} from '@/types/Requests/Rooms/RoomResponses';
import {axios} from '@/utils/axiosInstance';
import {AxiosError} from 'axios';

interface IProps {
  classes?: any,
}


const styles: any = (theme: ThemeCustom) => createStyles({
  root: {},
  boxGridImage: {
    width: '100%',
    height: 'auto',
    maxHeight: 449,
    overflow: 'hidden',
    position: 'relative',
  },
  div_btnMore: {
    position: 'absolute',
    bottom: '4%',
    right: '2%',
  },
  btnMore: {
    backgroundColor: 'rgba(192,192,192,0.6)',
    MozTransition: 'all 0.3s',
    WebkitTransition: 'all 0.3s',
    transition: 'all 0.3s',
    '&:hover': {
      MsTransform: 'scale(1.1)', /* IE 9 */
      WebkitTransform: 'scale(1.1)', /* Safari 3-8 */
      transform: 'scale(1.1)',
    },
  },
  boxDetails: {
    width: '100%',
    marginTop: 40,
  },
  boxPadding: {
    padding: 16,
  },
});

const Details: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    getData().then((data) => {
      setPrice(data.price_day);
    }).catch((err: AxiosError) => {
      console.log(err.response);
    });
  },[isOpen]); // phu thuoc

  useEffect(() => {
    console.log(price);
  });

  const getData = async () => {
    const res: AxiosRes<RoomIndexRes> = await axios.get('rooms/3143?include=details');
    return res.data.data;
  };

  return (
    <div className = {classes.root}>
      <NavTop />
      <NavSearch />
      <div className = {classes.boxGridImage}>
        <GridImage isOpen = {isOpen} setIsOpen = {setIsOpen} />
        <div className = {classes.div_btnMore}>
          <Button className = {classes.btnMore} variant = {'outlined'}
                  size = {'small'} color = 'secondary' onClick = {() => setIsOpen(true)}>Show more</Button>
        </div>
      </div>
      <div className = {classes.boxDetails}>
        <GridContainer xs = {12} sm = {10} md = {10} lg = {10}>
          <Grid container spacing = {32}>
            <Grid item sm = {8}>
              <Paper square elevation = {1}>
                <div className = {classes.boxPadding}>
                  <BoxDetails />
                  <BoxReviews />
                </div>
              </Paper>
            </Grid>
            <Grid item sm = {4}>
              <BoxBooking />
            </Grid>
          </Grid>
        </GridContainer>
      </div>
    </div>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(Details);
