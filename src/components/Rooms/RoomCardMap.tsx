import {ThemeCustom} from '@/components/Theme/Theme';
import fakeIMG from '@/assets/room_demo.jpeg';
import fakeIMG2 from '@/assets/room_demo2.jpeg';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useContext} from 'react';
import {compose} from 'recompose';
import Grid from '@material-ui/core/Grid/Grid';
import Slider, {Settings} from 'react-slick';
import Typography from '@material-ui/core/Typography/Typography';
import StarRatings from 'react-star-ratings';
import classNames from 'classnames';
import _ from 'lodash';
import SvgCustom from '@/components/Custom/SvgCustom';
import Paper from '@material-ui/core/Paper/Paper';
import {formatMoney} from '@/utils/mixins';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/PageProfile/StylePageProfile.scss';
import Blue from '@material-ui/core/colors/blue';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import {RoomIndexRes} from '@/types/Requests/Rooms/RoomResponses';
import {ThemeStyle} from '@material-ui/core/styles/createTypography';
import Hidden from '@material-ui/core/Hidden/Hidden';
import {GlobalContext, IGlobalContext} from '@/store/context/GlobalContext';
import LazyLoad from 'react-lazyload';
import Button from '@material-ui/core/Button/Button';
import {RoomMapContext, IRoomMapContext} from '@/store/context/Room/RoomMapContext';

const styles: any = (theme: ThemeCustom) => createStyles({
  imgSize: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    maxWidth: 300,
    minWidth: 50,
    verticalAlign: 'middle',
    [theme!.breakpoints!.down!('lg')]: {
      height: 180,
      maxWidth: 300,
    },
    [theme!.breakpoints!.only!('sm')]: {
      height: 240,
    },
    [theme!.breakpoints!.only!('xs')]: {
      maxWidth: 'calc(93vw - 4px)',
      height: '30vh',
    },
  },
  bodyContainer: {
    padding: 10,
  },
  verticalMid: {
    verticalAlign: 'middle',
  },
  mapMarker: {
    width: '0.8rem',
    marginLeft: 3,
  },
  address: {
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  borderBlue: {
    border: '1px rgb(27,160,226) solid',
  },
  borderSection: {
    borderLeft: '1px rgba(0,0,0,0.1) solid',
    padding: 10,
  },
  marginSvg: {
    marginLeft: 5,
  },
  ul: {
    display: 'flex',
    paddingInlineStart: '0px',
    marginBlockStart: '2px',
    listStyleType: 'none',
    marginBlockEnd: '0px',
  },
  list: {
    paddingRight: 4,
  },
  reviewScore: {
    padding: 5,
    color: '#fff',
    backgroundColor: Blue[600],
    [theme!.breakpoints!.between!('sm', 'md')]: {
      padding: 7,
    },
  },
  reviewCount: {
    textAlign: 'right',
  },
  reviewSizeSM: {
    [theme!.breakpoints!.down!('md')]: {
      fontSize: '0.6rem',
    },
  },
  maxHeight: {
    height: '100%',
  },
  textCenter: {
    textAlign: 'center',
  },
  subEl: {
    fontSize: '0.7rem',
  },
  striker: {
    color: 'grey',
    position: 'relative',
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
  pR: {
    paddingRight: 10,
  },
  tooltip: {
    fontSize: '0.75rem',
    maxWidth: 200,
    padding: 20,
    opacity: 1,
  },
  chip: {
    height: 24,
  },
  contentHeight: {
    height: 'max-content',
  },
  paper: {
    transition: theme!.transitions!.create!(['box-shadow'], {
      duration: 400,
      easing: 'ease-in-out',
    }),
  },
  price: {
    [theme!.breakpoints!.only!('xs')]: {
      marginTop: '2vh',
    },
  },
  priceTag: {
    fontSize: '1rem',
  },
  buttonTrans: {
    transition: theme!.transitions!.create!(['all'], {
      duration: 400,
      easing: 'ease-in-out',
    }),
    transform: 'translate(35%)',
    [theme!.breakpoints!.only!('sm')]: {
      transform: 'translate(3vw)',
    },
    [theme!.breakpoints!.only!('md')]: {
      transform: 'translate(4vw)',
    },
  },
});

interface IProps {
  classes?: any
  room: RoomIndexRes
}

// @ts-ignore
const RoomCardMap: ComponentType<IProps> = (props: IProps) => {
  const {classes, room}                          = props;
  const {width}                                  = useContext<IGlobalContext>(GlobalContext);
  const {state: mapState, dispatch: mapDispatch} = useContext<IRoomMapContext>(RoomMapContext);

  const {id}   = mapState;
  const xsMode = width === 'xs';

  const typoVariant: ThemeStyle = (width === 'sm' || width === 'xs') ? 'subtitle2' : 'h6';
  const totalComfort            = (room.comforts.data.length < 25) ? room.comforts.data.length : 20;

  const settings: Settings = {
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    draggable: !xsMode,
    autoplay: xsMode,
    autoplaySpeed: 5000,
    pauseOnFocus: xsMode,
    focusOnSelect: xsMode,
    arrows: !xsMode,
    pauseOnHover: xsMode,
    touchMove: !xsMode,
    swipeToSlide: !xsMode,
    swipe: !xsMode,
  };

  const cardEvent = () => {
    let win = window.open(`/room/${room.id}`, '_blank');
    win!.focus();
  };

  const cardHover = (status: boolean) => {
    mapDispatch({
      type: 'setRoomId',
      id: status ? room.id : 0,
    });
  };

  const hoverStatus = (room.id == id);

  return (
    <Fragment>
      <Paper elevation = {hoverStatus ? 10 : 3}
             onMouseEnter = {() => cardHover(true)}
             onMouseLeave = {() => cardHover(false)}
             className = {classes.paper}
      >
        <Grid container spacing = {0}>
          <Grid item lg = {4} sm = {4} xs = {12} className = {classes.imgSize}>
            <LazyLoad overflow = {true}>
              <Slider {...settings}>
                {room.media.data.length > 0 ? _.map(room.media.data, o => (
                  <img key={o.image} src = {`http://westay.org/storage/rooms/${o.image}`} className = {classes.imgSize} />
                )) : (
                  <img src = {fakeIMG} className = {classes.imgSize} />
                )}
              </Slider>
            </LazyLoad>
          </Grid>
          <Grid item lg = {8} sm = {8} xs = {12}>
            <Grid container className = {classes.maxHeight}>
              <Grid item xs = {12}>
                <Grid container spacing = {0} className = {classNames(
                  classes.bodyContainer, classes.maxHeight,
                )}>
                  <Grid item xs = {12}>
                    <Grid container className = {classNames(
                      classes.maxHeight, classes.pR,
                    )}>
                      <Grid item lg = {12} sm = {12}>
                        <Grid container>
                          <Grid item lg = {12} sm = {12} xs = {12}>
                            <Typography variant = 'subtitle2'>{room.details.data[0].name}</Typography>
                          </Grid>
                          <Grid item lg = {12} sm = {12} xs = {12}>
                            {(room) ? (
                              <span className = {classes.verticalMid}>
                                <StarRatings
                                  numberOfStars = {room.standard_point}
                                  starDimension = {`15px`}
                                  starSpacing = {`1px`}
                                  starEmptyColor = {'#ffb40b'}
                                />
                              </span>
                            ) : ''}

                            {/*Address*/}
                            {/*<span className = {classes.verticalMid}>*/}
                            {/*<img src = {mapMarker} className = {classNames(*/}
                            {/*classes.mapMarker, classes.verticalMid,*/}
                            {/*)} />&nbsp;*/}
                            {/*<a className = {classes.address}>{room.details.data[0].address}</a>*/}
                            {/*</span>*/}
                          </Grid>
                          <Hidden xsUp>
                            <Grid item lg = {12} sm = {12} style = {{marginTop: 6}}>
                              <ul className = {classes.ul}>
                                {_.map([1, 2, 3], (val) => (
                                  <li key = {val} className = {classes.list}><SvgCustom /></li>
                                ))}
                                {(totalComfort > 0) ? (
                                  <Tooltip
                                    enterTouchDelay = {300}
                                    classes = {{
                                      tooltip: classes.tooltip,
                                    }}
                                    title = {`${totalComfort} additional room amenities and facilities available`}
                                    placement = 'top'>
                                    <li><SvgCustom borderClass = {classes.borderBlue} text = {`+${totalComfort}`} />
                                    </li>
                                  </Tooltip>
                                ) : ''}
                              </ul>
                            </Grid>
                          </Hidden>
                        </Grid>
                      </Grid>
                      {/*Price section*/}
                      <Grid container item lg = {12} sm = {12} alignItems = 'flex-end'>
                        <Grid container className = {classes.price} spacing = {0}>
                          <Grid container item xs = {xsMode ? 12 : 9} spacing = {16}>
                            <Grid item>
                              <Typography variant = {typoVariant} className = {classes.priceTag}>
                                {room.price_day > 0 ? (
                                  <Fragment>
                                    {`${formatMoney(room.price_day, 0)}`}
                                    <sub className = {classes.subEl}>đ/day</sub>
                                  </Fragment>
                                ) : ''}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant = {typoVariant} className = {classes.priceTag}>
                                {room.price_hour > 0 ? (
                                  <Fragment>
                                    {`${formatMoney(room.price_hour, 0)}`}
                                    <sub className = {classes.subEl}>/4h</sub>
                                  </Fragment>
                                ) : ''}
                              </Typography>
                            </Grid>
                          </Grid>
                          {!xsMode ? (
                            <Grid container item xs = {3} justify = 'flex-end'>
                              <Button
                                onClick = {cardEvent}
                                className = {classes.buttonTrans}
                                variant = {hoverStatus ? 'contained' : 'outlined'}
                                color = 'primary'
                                size = 'small'
                              >Details</Button>
                            </Grid>
                          ) : ''}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(RoomCardMap);
