import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, useContext,Fragment} from 'react';
import {compose} from 'recompose';
import {RouteChildrenProps} from 'react-router';
import Slider, {Settings} from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imgRoomDemo from '@/assets/room_demo.jpeg';
import imgRoomDemo2 from '@/assets/room_demo2.jpeg';
import imgRoomDemo3 from '@/assets/room_demo3.jpeg';
import {IRoomDetailsContext, RoomDetailsContext} from '@/store/context/Room/RoomDetailsContext';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import '@/styles/RoomCardSlider.scss';


interface IProps extends RouteChildrenProps {
  classes?: any,
}

const styles: any = (theme: ThemeCustom) => createStyles({
  boxDetail: {
    margin:'8px 4px',
  },
  boxImg: {
    overflow:'hidden',
    borderRadius: 4,
  },
  boxContent:{
    padding:8,
  },
  rowMargin:{
    margin: '4px 0'
  },
  price: {
    fontSize: 18,
    fontWeight: 500,
  },
  perTime: {
    fontSize: 13,
  },
  oldPrice: {
    color: 'grey',
    position: 'relative',
    fontSize: 13,
    '&::before': {
      content: '" "',
      position: 'absolute',
      right: 0,
      top: '50%',
      width: '100%',
      borderTop: '1px solid grey',
      transform: 'rotate(10deg)',
      WebkitTransform: 'rotate(10deg)',
    },
  },
  roomName:{
    wordWrap: 'break-word',
    fontSize: 16,
    fontWeight: 800,
    lineHeight: '1.375em',
    color: '#484848' ,
  },
  imgSlider: {
    width: '100%',
    borderRadius: 4,
  }
});

const RoomCardSlider: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;
  const {state, dispatch} = useContext<IRoomDetailsContext>(RoomDetailsContext);

  const {rooms} = state;

  const settings: Settings = {
    dots: false,
    arrows:false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:5000,
    draggable:false,
    pauseOnFocus:true,
    pauseOnHover:true,
    swipe:false,
    touchMove:false,
  };

  if (rooms == null) {return <SimpleLoader/>}

  return (
    <Fragment>
      <div className = {classes.boxDetail}>
        <div className = {classes.boxImg}>
          <Slider {...settings}>
            <img src = {imgRoomDemo} className = {classes.imgSlider} />
            <img src = {imgRoomDemo2} className = {classes.imgSlider} />
            <img src = {imgRoomDemo3} className = {classes.imgSlider} />
          </Slider>
        </div>
        <Paper elevation = {2} className = {classes.boxContent}>
          <Typography className={classes.roomName}>
            Room name demo rat la dai o day de tesst thu xem the nao ahhii
          </Typography>
          <Grid item container spacing = {8} className = {classes.rowMargin}>
            <Grid item xs>
              <div style = {{textAlign: 'center'}}>
                <span className = {classes.price}>1.700.000 <sup>&#8363;</sup></span>
                <sub className = {classes.perTime}>/day</sub>
              </div>
              {/*<div style = {{textAlign: 'center'}}>*/}
              {/*<span className = {classes.oldPrice}>1.900.000 <sup>&#8363;</sup>*/}
              {/*<sub>/day</sub></span>*/}
              {/*</div>*/}
            </Grid>
            <Grid item xs>
              <div style = {{textAlign: 'center'}}>
                <span className = {classes.price}>1.100.000 <sup>&#8363;</sup></span>
                <sub className = {classes.perTime}>/4h</sub>
              </div>
              {/*<div style = {{textAlign: 'center'}}>*/}
              {/*<span className = {classes.oldPrice}>1.300.000 <sup>&#8363;</sup>*/}
              {/*<sub>/4h</sub></span>*/}
              {/*</div>*/}
            </Grid>
          </Grid>
          <Typography variant='subtitle2'>
            102 Thai Thinh, Trung Liet, Dong Da, Ha Noi, Viet Nam
          </Typography>
        </Paper>
      </div>

    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(RoomCardSlider);
