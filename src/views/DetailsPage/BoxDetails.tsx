import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, useState, Fragment, useContext, useEffect} from 'react';
import {compose} from 'recompose';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Location from '@material-ui/icons/LocationOnOutlined';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MeetingRoom from '@material-ui/icons/MeetingRoomRounded';
import LocalHotel from '@material-ui/icons/LocalHotelRounded';
import People from '@material-ui/icons/PeopleRounded';
import Home from '@material-ui/icons/HomeRounded';
import Wifi from '@material-ui/icons/WifiRounded';
import Fastfood from '@material-ui/icons/FastfoodRounded';
import avatarDemo from '@/assets/avatar_demo.jpg';
import chat from '@/assets/chat.png';
import verified from '@/assets/verified.png';
import medalCertified from '@/assets/medalCertified.svg';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
// @ts-ignore
import StarRatings from 'react-star-ratings';
import {
  getData,
  IRoomDetailsContext, RoomDetailsContext,
} from '@/store/context/Room/RoomDetailsContext';
import {AxiosError} from 'axios';
import SimpleLoader from '@/components/Loading/SimpleLoader';

interface IProps {
  classes?: any,
}

const styles: any = (theme: ThemeCustom) => createStyles({
  rowMargin: {
    marginBottom: 10,
  },
  rowMargin20: {
    margin: '20px 0',
  },
  spanViews: {
    fontSize: 10,
    color: 'grey',
    paddingLeft: 5,
  },
  txtAddress: {
    color: '#008489',
    fontSize: 14,
  },
  iconLocation: {
    verticalAlign: 'bottom',
    fontSize: 20,
  },
  boxPadding: {
    padding: 16,
  },
  roomAmenitiesTitle: {
    color: '#46afcc',
    margin: '0 5px',
    fontSize: 13,
  },
  collectionAmenities: {
    paddingLeft: 0,
    textAlign: 'center',
  },
  roomAmenitiesIcon: {
    verticalAlign: 'bottom',
    color: '#46afcc',
    fontSize: 20,
  },
  avatar: {
    position: 'relative',
    width: 90,
    height: 90,
    display: 'inline-block',
  },
  imgAvatar: {
    width: '100%',
    height: 'inherit',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  infoHost: {
    position: 'absolute',
    lineHeight: 0,
    bottom: 0,
    right: 0,
  },
  lightTooltip: {
    border: '1px solid #e0e0e0',
    color: theme.palette!.text!.primary,
    fontSize: 11,
    backgroundColor: 'transparent',
  },
  arrowPopper: {
    '&[x-placement*="bottom"] $arrowArrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent #e0e0e0 transparent`,
      },
    },
    '&[x-placement*="top"] $arrowArrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `#e0e0e0 transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrowArrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      top: '30%',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent #e0e0e0 transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrowArrow': {
      right: 0,
      top: '20%',
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent #e0e0e0`,
      },
    },
  },
  arrowArrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  info: {
    textAlign: 'center',
    padding: 4,
  },
  boxHighlight: {
    border: '1px solid #EBEBEB',
    borderRadius: 4,
    boxShadow: '1px 1px 3px 0 rgba(0, 0, 0, 0.1)',
    padding: 24,
    width: '100%',
  },
  titleHighlight: {
    fontSize: 17,
    fontWeight: 600,
    lineHeight: '1.375em',
    color: '#484848',
  },
  contentHighlight: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '1.375em',
    color: '#484848',
  },
  expansionPanel: {
    boxShadow: 'none',
    borderTop: '1px solid #e0e0e0',
    width: '100%',
  },
  expansionPanelDetails: {
    display: 'block',
  },
  headingPanel: {
    flexBasis: '33.33%',
    flexShrink: 0,
    fontSize: 16,
  },
});

const BoxDetails: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;
  const [arrowRef, setArrowRef] = useState<any>(null);
  const {state, dispatch} = useContext<IRoomDetailsContext>(RoomDetailsContext);

  const {rooms} = state;

  if (rooms == null) {return <SimpleLoader/>}

  return (
    <Fragment>
      <Grid container>
        <Grid item xs = {9}>
          <Grid container direction = 'column'
                justify = 'center'
                alignItems = 'flex-start'>
            <Grid item>
              <Typography variant = 'h5'>{rooms!.details.data[0].name}</Typography>
            </Grid>
            <Grid item className = {classes.rowMargin}>
              <StarRatings
                rating = {rooms !== null ? rooms.avg_rating : 0} //index rating
                starDimension = '20px'
                starSpacing = '1px'
                starRatedColor = '#46afcc'
              />
              <span className = {classes.spanViews}>{rooms!.total_review} views</span>
            </Grid>
            <Grid item className = {classes.rowMargin}>
              <span className = {classes.txtAddress}>
                <Location className = {classes.iconLocation} />
                {rooms.details.data[0].address}
              </span>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs = {3}>
          <Grid container direction = 'column' justify = 'flex-end' alignItems = 'flex-end'>
            <Grid item xs = {12}>
              <Tooltip
                interactive
                placement = 'left'
                title = {
                  <Fragment>
                    <div>
                      <Typography variant = {'subtitle2'} align = {'center'}>{rooms!.user.data.name}</Typography>
                      <Grid container>
                        <Grid item xs = {4}>
                          <div className = {classes.info}>
                            <div>
                              <img src = {medalCertified} width = {15} height = {15} />
                            </div>
                            <Typography variant = {'caption'}>Super!</Typography>
                          </div>
                        </Grid>
                        <Grid item xs = {4}>
                          <div className = {classes.info}>
                            <div>
                              <img src = {chat} width = {15} height = {15} />
                            </div>
                            <Typography variant = {'caption'} style = {{color: '#F8952F'}}>987</Typography>
                          </div>
                        </Grid>
                        <Grid item xs = {4}>
                          <div className = {classes.info}>
                            <div>
                              <img alt = 'verified' src = {verified} width = {15} height = {15} />
                            </div>
                            <Typography variant = {'caption'} style = {{color: '#00c853'}}>verified</Typography>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                    <span className = {classes.arrowArrow} />
                  </Fragment>
                }
                classes = {{
                  popper: classes.arrowPopper,
                  tooltip: classes.lightTooltip,
                }}
                PopperProps = {{
                  popperOptions: {
                    modifiers: {
                      arrow: {
                        enabled: Boolean(arrowRef),
                        element: arrowRef,
                      },
                    },
                  },
                }}
              >
                <div className = {classes.avatar}>
                  <img alt = 'Avatar' src = {rooms!.user.data.avatar_url} className = {classes.imgAvatar} />
                  <div className = {classes.infoHost}>
                    <img src = {medalCertified} width = {32} height = {32} />
                  </div>
                </div>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid container className = {classes.rowMargin20}>
        <Grid item xs = {6} sm = {3}>
          <div className = {classes.collectionAmenities}>
            <Home className = {classes.roomAmenitiesIcon} />
            <div className = {classes.roomAmenitiesTitle}><span>{rooms!.room_type_txt}</span></div>
          </div>
        </Grid>
        <Grid item xs = {6} sm = {3}>
          <div className = {classes.collectionAmenities}>
            <People className = {classes.roomAmenitiesIcon} />
            <div className = {classes.roomAmenitiesTitle}><span>{rooms!.max_guest} guests</span></div>
          </div>
        </Grid>
        <Grid item xs = {6} sm = {3}>
          <div className = {classes.collectionAmenities}>
            <MeetingRoom className = {classes.roomAmenitiesIcon} />
            <div className = {classes.roomAmenitiesTitle}><span>{rooms!.number_room} rooms</span></div>
          </div>
        </Grid>
        <Grid item xs = {6} sm = {3}>
          <div className = {classes.collectionAmenities}>
            <LocalHotel className = {classes.roomAmenitiesIcon} />
            <div className = {classes.roomAmenitiesTitle}><span>{rooms!.number_bed} beds</span></div>
          </div>
        </Grid>
      </Grid>
      <Grid container className = {classes.rowMargin20}>
        <div className = {classes.boxHighlight}>
          <Typography variant = {'button'} color = {'textSecondary'}>Home Highlights</Typography>
          <div className = {classes.rowMargin20}>
            <span className = {classes.titleHighlight}>Is a Superhost: </span>
            <span className = {classes.contentHighlight}>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</span>
          </div>
          <div className = {classes.rowMargin20}>
            <span className = {classes.titleHighlight}>Great location: </span>
            <span
              className = {classes.contentHighlight}>95% of recent guests gave this home’s location a 5-star rating.</span>
          </div>
          <div className = {classes.rowMargin20}>
            <span className = {classes.titleHighlight}>Sparkling clean: </span>
            <span
              className = {classes.contentHighlight}>11 recent guests have said that this home was sparkling clean.</span>
          </div>
        </div>
      </Grid>
      <Grid container className = {classes.rowMargin20}>
        <ExpansionPanel classes = {{root: classes.expansionPanel}}>
          <ExpansionPanelSummary expandIcon = {<ExpandMoreIcon />}>
            <Typography className = {classNames(classes.titleHighlight, classes.headingPanel)}>
              About homestay
            </Typography>
            <Typography variant = {'body2'}>
              Stunning views over the hinterland. Luxurious villa sleeping 10 persons in a loft style room. Property
              spreads over 10 acres. Horses and dogs are welcome.
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes = {{root: classes.expansionPanelDetails}}>
            <Grid container className = {classes.rowMargin}>
              <Grid item xs = {4}>
                <Typography variant = {'subtitle2'}>The space: </Typography>
              </Grid>
              <Grid item xs = {8}>
                <Typography variant = {'body2'}>- 25 min from Surfers Paradise</Typography>
                <Typography variant = {'body2'}>- Soothing hot outdoor spa</Typography>
                <Typography variant = {'body2'}>- Heating & Air Conditioning</Typography>
                <Typography variant = {'body2'}>- Property is on 10 acres of beautiful land</Typography>
              </Grid>
            </Grid>
            <Grid container className = {classes.rowMargin}>
              <Grid item xs = {4}>
                <Typography variant = {'subtitle2'}>Guest access: </Typography>
              </Grid>
              <Grid item xs = {8}>
                <Typography variant = {'body2'}>- Guests have access to the entire property with the exception of the
                                                main house that the owner occupies.</Typography>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <Grid container className = {classes.rowMargin20}>
        <ExpansionPanel classes = {{root: classes.expansionPanel}}>
          <ExpansionPanelSummary expandIcon = {<ExpandMoreIcon />}>
            <Typography className = {classNames(classes.titleHighlight, classes.headingPanel)}>
              Amenities
            </Typography>
            <Grid container>
              <Grid item xs = {6} sm = {3}>
                <div className = {classes.collectionAmenities}>
                  <MeetingRoom className = {classes.roomAmenitiesIcon} />
                  <div className = {classes.roomAmenitiesTitle}><span>2 Bedroom(s)</span></div>
                </div>
              </Grid>
              <Grid item xs = {6} sm = {3}>
                <div className = {classes.collectionAmenities}>
                  <LocalHotel className = {classes.roomAmenitiesIcon} />
                  <div className = {classes.roomAmenitiesTitle}><span>2 beds</span></div>
                </div>
              </Grid>
              <Grid item xs = {6} sm = {3}>
                <div className = {classes.collectionAmenities}>
                  <Wifi className = {classes.roomAmenitiesIcon} />
                  <div className = {classes.roomAmenitiesTitle}><span>Free Wifi</span></div>
                </div>
              </Grid>
              <Grid item xs = {6} sm = {3}>
                <div className = {classes.collectionAmenities}>
                  <Fastfood className = {classes.roomAmenitiesIcon} />
                  <div className = {classes.roomAmenitiesTitle}><span>Free Breakfast</span></div>
                </div>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes = {{root: classes.expansionPanelDetails}}>
            <Grid container className = {classes.rowMargin}>
              <Grid item xs = {4}>
                <Typography variant = {'subtitle2'}>&#9679; Wifi: </Typography>
              </Grid>
              <Grid item xs = {8}>
                <Typography variant = {'body2'}>- Continuous access in the listing</Typography>
              </Grid>
            </Grid>
            <Grid container className = {classes.rowMargin}>
              <Grid item xs = {4}>
                <Typography variant = {'subtitle2'}>&#9679; Dryer: </Typography>
              </Grid>
              <Grid item xs = {8}>
                <Typography variant = {'body2'}>- In the building, free or for a fee</Typography>
              </Grid>
            </Grid>
            <Grid container className = {classes.rowMargin}>
              <Grid item xs = {4}>
                <Typography variant = {'subtitle2'}>&#9679; TV: </Typography>
              </Grid>
              <Grid item xs = {8}></Grid>
            </Grid>
            <Grid container className = {classes.rowMargin}>
              <Grid item xs = {4}>
                <Typography variant = {'subtitle2'}>&#9679; Air conditioning: </Typography>
              </Grid>
              <Grid item xs = {8}>
                <Typography variant = {'body2'}>- Yes</Typography>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(BoxDetails);
