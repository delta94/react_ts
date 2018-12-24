import {ThemeCustom} from '@/components/Theme/Theme';
import fakeIMG from '@/assets/room_demo.jpeg';
import fakeIMG2 from '@/assets/room_demo2.jpeg';
import align from '@/styles/Position/align.module.scss';
import {ClockFast} from 'mdi-material-ui';
import mapMarker from '@/assets/SvgIcon/map-marker.svg';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useState, useContext} from 'react';
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
import Button from '@material-ui/core/Button/Button';
import {RoomIndexRes} from '@/types/Requests/Rooms/RoomResponses';
import {RoomIndexContext, IRoomIndexContext} from '@/store/context/Room/RoomIndexContext';
import {ThemeStyle} from '@material-ui/core/styles/createTypography';
import Hidden from '@material-ui/core/Hidden/Hidden';
import {GlobalContext, IGlobalContext} from '@/store/context/GlobalContext';

interface IProps {
  classes?: any,
  room: RoomIndexRes
}

const styles: any = (theme: ThemeCustom) => createStyles({
  imgSize: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: '4px 0 0 4px',
    objectFit: 'cover',
    maxWidth: 300,
    minWidth: 50,
    verticalAlign: 'middle',
    [theme!.breakpoints!.down!('lg')]: {
      height: 250,
      maxWidth: 300,
    },
    [theme!.breakpoints!.only!('sm')]: {
      height: 240,
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
    padding: 10,
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
    cursor: 'pointer',
    transition: theme!.transitions!.create!(['box-shadow'], {
      duration: 400,
      easing: 'ease-in-out',
    }),
  },
});

// @ts-ignore
const RoomCard: ComponentType<IProps> = (props: IProps) => {
  const {classes, room}             = props;
  const [paperHover, setPaperHover] = useState<boolean>(false);
  const {width}                     = useContext<IGlobalContext>(GlobalContext);

  const typoVariant: ThemeStyle = (width === 'sm') ? 'subtitle2' : 'h6';
  const totalComfort            = (room.comforts.data.length < 25) ? room.comforts.data.length : 20;

  const settings: Settings = {
    speed: 300,
    dots: false,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
  };

  return (
    <Fragment>
      <Paper elevation = {paperHover ? 10 : 3}
             onMouseEnter = {() => setPaperHover(true)}
             onMouseLeave = {() => setPaperHover(false)}
             className = {classes.paper}
      >
        <Grid container spacing = {0}>
          <Grid item lg = {3} sm = {4}>
            <div className = {classes.imgSize}>
              <Slider {...settings}>
                <img src = {fakeIMG} className = {classes.imgSize} />
                <img src = {fakeIMG2} className = {classes.imgSize} />
              </Slider>
            </div>
          </Grid>
          <Grid item lg = {9} sm = {8}>
            <Grid container className = {classes.maxHeight}>
              <Grid item lg = {9} sm = {9}>
                <Grid container spacing = {0} className = {classNames(
                  classes.bodyContainer, classes.maxHeight,
                )}>
                  <Grid item lg = {9} sm = {9}>
                    <Grid container className = {classNames(
                      classes.maxHeight, classes.pR,
                    )}>
                      <Grid item lg = {12} sm = {12}>
                        <Grid container>
                          <Grid item lg = {12} sm = {12}>
                            <Typography variant = 'subtitle2'>{room.details.data[0].name}</Typography>
                          </Grid>
                          <Grid item lg = {12} sm = {12}>
                          <span className = {classes.verticalMid}>
                          <StarRatings
                            numberOfStars = {4}
                            starDimension = {`15px`}
                            starSpacing = {`1px`}
                            starEmptyColor = {'#ffb40b'}
                          />
                          </span>
                            <span className = {classes.verticalMid}>
                            <img src = {mapMarker} className = {classNames(
                              classes.mapMarker, classes.verticalMid,
                            )} />&nbsp;
                              <a className = {classes.address}>{room.details.data[0].address}</a>
                          </span>
                          </Grid>
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
                                  <li><SvgCustom borderClass = {classes.borderBlue} text = {`+${totalComfort}`} /></li>
                                </Tooltip>
                              ) : ''}
                            </ul>
                          </Grid>
                        </Grid>
                      </Grid>
                      {/*Price section*/}
                      <Grid container item lg = {12} sm = {12} alignItems = 'flex-end'>
                        <Grid container spacing = {24}>
                          <Grid item>
                            <Typography variant = {typoVariant}>
                              {(room.price_day > 0) ? (
                                <Fragment>
                                  {`${formatMoney(room.price_day, 0)}`}
                                  <sub className = {classes.subEl}>đ/day</sub>
                                </Fragment>
                              ) : ''}
                            </Typography>
                            {/*<Typography variant = {typoVariant} className = {classNames({*/}
                            {/*[classes.striker]: true,*/}
                            {/*})}>*/}
                            {/*{`${formatMoney(1200000, 0)}`}*/}
                            {/*<sub className = {classes.subEl}>đ/day</sub>*/}
                            {/*</Typography>*/}
                          </Grid>
                          <Grid item xs>
                            <Typography variant = {typoVariant}>
                              {room.price_hour > 0 ? (
                                <Fragment>
                                  {`${formatMoney(room.price_hour, 0)}`}
                                  <sub className = {classes.subEl}>/4 hours</sub>
                                </Fragment>
                              ) : ''}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg = {3} sm = {3}>
                    <Grid container
                          className = {classes.maxHeight}
                          spacing = {8}
                          alignItems = 'flex-end'
                          justify = 'flex-end'>
                      <Grid item lg = {12} sm = {12}>
                        {/*Discount*/}
                      </Grid>
                      <Grid item lg = {12} sm = {12} className = {align.textRight}>
                        <Tooltip
                          classes = {{tooltip: classes.tooltip}}
                          enterTouchDelay = {300}
                          title = 'Book this property without waiting for host confirmation'
                          placement = 'top'>
                          <ClockFast fontSize = 'large' />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg = {3} sm = {3} className = {classes.borderSection}>
                <Grid container className = {classes.maxHeight}>
                  <Grid item lg = {12} sm = {12} className = {classes.contentHeight}>
                    <Grid container spacing = {8} alignItems = 'center' direction = 'row-reverse'>
                      <Grid item>
                        <Paper className = {classes.reviewScore} elevation = {0}>
                          <Typography variant = {typoVariant} color = 'secondary'>6.9</Typography>
                        </Paper>
                      </Grid>
                      <Hidden xsDown>
                        <Grid item className = {classes.reviewCount}>
                          <Typography
                            variant = 'subtitle2'
                            className = {classes.reviewSizeSM}
                          >Excellent</Typography>
                          <Typography
                            variant = 'body2'
                            className = {classes.reviewSizeSM}
                          >96 reviews</Typography>
                        </Grid>
                      </Hidden>
                    </Grid>
                  </Grid>
                  <Grid container item lg = {12} sm = {12} justify = 'center' alignItems = 'flex-end'>
                    <Grid item lg = {12} sm = {12} className = {align.textCenter}>
                      <Button
                        color = 'primary'
                        variant = 'contained'
                        size = {(width === ('sm' || 'xs')) ? 'small' : 'medium'}
                      >Book now</Button>
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
)(RoomCard);
