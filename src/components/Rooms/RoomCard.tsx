import {ThemeCustom} from '@/components/Theme/Theme';
import fakeIMG from '@/assets/room_demo.jpeg';
import align from '@/styles/Position/align.module.scss';
import mapMarker from '@/assets/SvgIcon/map-marker.svg';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useState, useContext, memo} from 'react';
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
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Button from '@material-ui/core/Button/Button';
import {RoomIndexRes} from '@/types/Requests/Rooms/RoomResponses';
import {ThemeStyle} from '@material-ui/core/styles/createTypography';
import Hidden from '@material-ui/core/Hidden/Hidden';
import {GlobalContext, IGlobalContext} from '@/store/context/GlobalContext';
import LazyLoad from 'react-lazyload';
import Chip from '@material-ui/core/Chip/Chip';
import Green from '@material-ui/core/colors/green';
import Flash from '@material-ui/icons/FlashOnRounded';
import {windowExist} from '@/index';

const styles: any = (theme: ThemeCustom) => createStyles({
  imgSize: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    maxWidth: 300,
    minWidth: 50,
    verticalAlign: 'middle',
    [theme!.breakpoints!.down!('lg')]: {
      height: 250,
    },
    [theme!.breakpoints!.only!('xl')]: {
      height: 260,
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
    padding: '0 8px 10px 10px',
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
  dropShadow: {
    filter: 'drop-shadow(2px 3px 2px rgba(0,0,0,0.3))',
  },
  reviewScore: {
    padding: 10,
    color: '#fff',
    backgroundColor: '#039be5',
    WebkitClipPath: 'polygon(50% 0%, 100% 0, 100% 100%, 51% 69%, 0 100%, 0 0)',
    clipPath: 'polygon(50% 0%, 100% 0, 100% 100%, 50% 70%, 0 100%, 0 0)',
    height: 50,
    transform: 'translateY(-2px)',
    borderRadius: '7px 2px 4px 4px',
    [theme!.breakpoints!.between!('sm', 'md')]: {
      padding: 7,
    },
    [theme!.breakpoints!.down!('sm')]: {
      height: 35,
    },
  },
  reviewCount: {
    textAlign: 'right',
  },
  reviewSizeSM: {
    fontWeight: 500,
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
    fontSize: 16,
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
    borderRadius: 4,
    backgroundColor: Green[600],
    color: 'white',
    marginTop: 8,
  },
  chipSpan: {
    paddingLeft: 4,
    paddingRight: 4,
  },
  btFlash: {
    fontSize: 14,
    padding: 5,
    paddingLeft: 0,
    textTransform: 'none',
    [theme!.breakpoints!.only!('md')]: {
      fontSize: 12,
      padding: 4,
      paddingLeft: 0,
    },
  },
  sizeFlash: {
    fontSize: 18,
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
  price: {
    [theme!.breakpoints!.only!('xs')]: {
      marginTop: '2vh',
    },
  },
  btBook: {
    [theme!.breakpoints!.only!('md')]: {
      fontSize: 12,
      padding: 5,
      width: '100%',
    },
  },
  typoPadding: {
    paddingTop: 20,
  },
});

interface IProps {
  classes?: any
  room: RoomIndexRes
}

// @ts-ignore
const RoomCard: ComponentType<IProps> = (props: IProps) => {
  const {classes, room}             = props;
  const [paperHover, setPaperHover] = useState<boolean>(false);
  const {width, history}            = useContext<IGlobalContext>(GlobalContext);
  const typoVariant: ThemeStyle     = (width === 'sm' || width === 'xs') ? 'subtitle2' : 'h6';
  const totalComfort                = (room.comforts.data.length - 3);

  const settings: Settings = {
    speed: 300,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    // dotsClass: classes.name
  };

  const cardEvent = () => {
    if (windowExist) {
      let win = window.open(`/room/${room.id}`, '_blank');
      win!.focus();
    }
  };

  return (
    <Fragment>
      <Paper elevation = {paperHover ? 10 : 3}
             onMouseEnter = {() => setPaperHover(true)}
             onMouseLeave = {() => setPaperHover(false)}
             className = {classes.paper}
      >
        <Grid container spacing = {0}>
          <Grid item lg = {3} sm = {4} xs = {12} className = {classes.imgSize}>
            <LazyLoad offset = {windowExist ? window.innerHeight : 0}>
              <Slider {...settings}>
                {room.media.data.length > 0 ? _.map(room.media.data, o => (
                  <img key = {o.image} src = {`http://westay.org/storage/rooms/${o.image}`}
                       className = {classes.imgSize} />
                )) : (
                  <img src = {fakeIMG} className = {classes.imgSize} />
                )}
              </Slider>
            </LazyLoad>
          </Grid>
          <Grid item lg = {9} sm = {8} xs = {12} onClick = {cardEvent}>
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
                          <Grid item lg = {12} sm = {12} xs = {12}>
                            <Typography variant = 'subtitle2'>{room.details.data[0].name}</Typography>
                          </Grid>
                          <Grid item lg = {12} sm = {12} xs = {12}>
                          <span className = {classes.verticalMid}>
                          <StarRatings
                            numberOfStars = {room.standard_point}
                            starDimension = {`15px`}
                            starSpacing = {`1px`}
                            starEmptyColor = {'#ffb40b'}
                          />
                          </span>
                            <span className = {classes.verticalMid}>
                            <img src = {mapMarker} className = {classNames(
                              classes.mapMarker, classes.verticalMid,
                            )} />&nbsp;
                              <a className = {classes.address}>{`
                              ${room.district.data.name},
                              ${room.city.data.name}
                              `}</a>
                          </span>
                          </Grid>
                          <Hidden xsDown>
                            <Grid item lg = {12} sm = {12}>
                              <ul className = {classes.ul}>
                                {_.map(room.comforts.data, (o, i) => {
                                  return i < 3 ? (
                                    <li key = {o.id} className = {classes.list}>
                                      <SvgCustom icon = {o.icon} name = {o.details.data[0].name} />
                                    </li>
                                  ) : '';
                                })}
                                {(totalComfort > 0) ? (
                                  <Tooltip
                                    enterTouchDelay = {300}
                                    classes = {{
                                      tooltip: classes.tooltip,
                                    }}
                                    title = {`${totalComfort} tiện nghi phòng khác`}
                                    placement = 'top'>
                                    <li><SvgCustom borderClass = {classes.borderBlue} text = {`+${totalComfort}`} />
                                    </li>
                                  </Tooltip>
                                ) : ''}
                              </ul>
                            </Grid>
                          </Hidden>
                          <Grid item lg = {12} sm = {12}>
                            <Chip label = {room.room_type_txt} className = {classes.chip} classes = {{
                              label: classes.chipSpan,
                            }} />
                          </Grid>
                        </Grid>
                      </Grid>
                      {/*Price section*/}
                      <Grid container item lg = {12} sm = {12} alignItems = 'flex-end'>
                        <Grid container spacing = {24} className = {classes.price}>
                          <Grid item>
                            {room.is_discount === 1 ? (
                              <Fragment>
                                <span className = {classNames({
                                  [classes.striker]: true,
                                })}>
                                {`${formatMoney(room.price_day, 0)}`}
                                  <sub className = {classes.subEl}>đ/ngày</sub>
                                </span>
                                <Typography variant = {typoVariant}>
                                  {`${formatMoney(room.price_day_discount, 0)}`}
                                  <sub className = {classes.subEl}>đ/ngày</sub>
                                </Typography>
                              </Fragment>
                            ) : (
                              <Fragment>
                                <Typography variant = {typoVariant}>
                                  {(room.price_day > 0) ? (
                                    <Fragment>
                                      {`${formatMoney(room.price_day, 0)}`}
                                      <sub className = {classes.subEl}>đ/ngày</sub>
                                    </Fragment>
                                  ) : ''}
                                </Typography>
                              </Fragment>
                            )}
                          </Grid>
                          <Grid item xs>
                            <Typography variant = {typoVariant}>
                              {room.is_discount === 1 ? (
                                <Fragment>
                                  <span className = {classNames({
                                    [classes.striker]: true,
                                  })}>
                                  {`${formatMoney(room.price_hour, 0)}`}
                                    <sub className = {classes.subEl}>đ/4h</sub>
                                  </span>
                                  <Typography variant = {typoVariant}>
                                    {`${formatMoney(room.price_hour_discount, 0)}`}
                                    <sub className = {classes.subEl}>đ/4h</sub>
                                  </Typography>
                                </Fragment>
                              ) : (
                                <Fragment>
                                  <Typography variant = {typoVariant}>
                                    {(room.price_hour > 0) ? (
                                      <Fragment>
                                        {`${formatMoney(room.price_hour, 0)}`}
                                        <sub className = {classes.subEl}>đ/4h</sub>
                                      </Fragment>
                                    ) : ''}
                                  </Typography>
                                </Fragment>
                              )}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg = {3} sm = {3} xs = {12} container direction = 'column'
                        justify = 'space-between' alignItems = 'flex-start'>

                    <Grid item lg = {12} sm = {12}>
                      {/*Discount*/}
                    </Grid>
                    {room.manager == 1 ? (
                      <Grid item lg = {12} sm = {12} xs = {12} container direction = 'column' justify = 'flex-end'
                            className = {align.textRight}>
                      </Grid>
                    ) : ''}
                  </Grid>
                </Grid>
              </Grid>
              <Hidden xsDown>
                <Grid item lg = {3} sm = {3} className = {classes.borderSection}>
                  <Grid container className = {classes.maxHeight}>
                    <Grid item lg = {12} sm = {12} className = {classes.contentHeight}>
                      <Grid container spacing = {8} alignItems = 'center' justify = 'center' direction = 'column'>
                        {room.total_review > 0 ? (
                          <Fragment>
                            <Grid item className = {classes.dropShadow}>
                              <Paper className = {classes.reviewScore} elevation = {0}>
                                <Typography variant = {typoVariant} color = 'secondary'>
                                  {`${formatMoney(room.avg_rating, 1)}`}
                                </Typography>
                              </Paper>
                            </Grid>
                            <Hidden xsDown>
                              <Grid item className = {classes.reviewCount}>
                                <Typography
                                  variant = 'subtitle2'
                                  className = {classes.reviewSizeSM}
                                >{}</Typography>
                                <Typography
                                  variant = 'body2'
                                  className = {classes.reviewSizeSM}
                                >{room.total_review} đánh giá</Typography>
                              </Grid>
                            </Hidden>
                          </Fragment>
                        ) : (
                          <Typography
                            variant = 'subtitle2'
                            className = {classes.typoPadding}
                          >Chờ đánh giá</Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container item lg = {12} sm = {12} justify = 'center' alignItems = 'flex-end'>
                      <Grid item lg = {12} sm = {12} className = {align.textCenter}>
                        {room.manager == 1 ?
                          <Button
                            name = 'booking-button'
                            variant = 'contained' color = 'primary'
                            size = {(width === ('sm' || 'xs')) ? 'small' : 'medium'}
                            className = {classes.btBook}
                          >
                            <Flash className = {classes.sizeFlash} />
                            Đặt nhanh
                          </Button>
                          : <Button
                            name = 'booking-button'
                            color = 'primary'
                            variant = 'contained'
                            size = {(width === ('sm' || 'xs')) ? 'small' : 'medium'}
                            className = {classes.btBook}
                          >
                            Đặt phòng
                          </Button>
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo,
)(RoomCard);
