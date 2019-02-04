import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, useState, Fragment, useContext} from 'react';
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
import chat from '@/assets/chat.png';
import verified from '@/assets/verified.png';
import medalCertified from '@/assets/medalCertified.svg';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
// @ts-ignore
import StarRatings from 'react-star-ratings';
// @ts-ignore
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser'
import {
  IRoomDetailsContext, RoomDetailsContext,
} from '@/store/context/Room/RoomDetailsContext';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import _ from 'lodash'
import ContentPlaceHolder from '@/components/PlaceHolder/ContentPlaceHolder';


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
  boxName: {
    paddingRight: 20,
  },
  roomName: {
    fontSize: 28,
    [theme!.breakpoints!.down!('sm')]: {
      fontSize: 22,
    },
    [theme!.breakpoints!.down!('xs')]: {
      fontSize: 20,
    },
    fontWeight: 700,
    lineHeight: '1.125em',
    color: '#484848',
  },
  txtAddress: {
    color: '#008489',
    fontSize: 14,
  },
  iconLocation: {
    verticalAlign: 'bottom',
    fontSize: 20,
  },
  boxPaddingXS: {
    [theme!.breakpoints!.down!('xs')]: {
      padding: '0px 8px',
    },
  },
  roomAmenitiesTitle: {
    color: '#343434',
    margin: '0 5px',
    fontSize: 13,
    [theme!.breakpoints!.down!('xs')]: {
      fontSize: 11,
    },
  },
  collectionAmenities: {
    paddingLeft: 0,
    textAlign: 'center',
  },
  roomAmenitiesIcon: {
    verticalAlign: 'bottom',
    color: '#46afcc',
    width: 20,
    height: 20,
  },
  avatar: {
    position: 'relative',
    width: 90,
    height: 90,
    [theme!.breakpoints!.down!('xs')]: {
      width: 70,
      height: 70,
    },
    display: 'inline-block',
  },
  imgAvatar: {
    width: '100%',
    height: 'inherit',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  imgCertified: {
    width: 32,
    height: 32,
    [theme!.breakpoints!.down!('xs')]: {
      width: 24,
      height: 24,
    },
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
    backgroundColor: '#fff',
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
    [theme!.breakpoints!.down!('xs')]: {
      padding: 16,
    },
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
  expansionPanelSummary: {
    display: 'block',
  },
  convenientExpansionPanelSummary: {
    [theme!.breakpoints!.down!('xs')]: {
      display: 'block',
    },
  },
  RootExpansionPanelSummary: {
    padding: '0 10px',
    [theme!.breakpoints!.down!('xs')]: {
      padding: '0 10px'
    },
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
    flexBasis: '25%',
    flexShrink: 0,
    fontSize: 16,
  },
  des_3Line: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    maxHeight: 200,
  },
  tagP_inHtmlPare: {
    width: '100%',
    display: 'block',
  }
});


const BoxDetails: ComponentType<IProps> = (props: IProps) => {
  const {classes}  = props;
  const [arrowRef] = useState<any>(null);
  const {state}    = useContext<IRoomDetailsContext>(RoomDetailsContext);

  const {room} = state;

  if (room == null) {
    return <ContentPlaceHolder />;
  }
  const description = room!.details.data[0].description;

  const transformHtmlTitle = (node: any, index: number) => {
    let validNodeIndex = index === 0 || index === 1;
    if (!validNodeIndex) {
      return null
    }
  };
  const transformHtmlContent = (node: any, index: number) => {
    let validNodeIndex = index === 0 || index === 1;
    let validNodeTag = node.type === 'tag' || node.type === 'text';
    if (validNodeIndex && validNodeTag && node.parent === null) {
      return null
    }
    if (node.name === 'p' || node.name === 'image') {
      node.attribs.class = classes.tagP_inHtmlPare;
      return convertNodeToElement(node, index, transformHtmlContent);
    }
  };

  return (
    <Fragment>
      <Grid container className = {classes.boxPaddingXS}>
        <Grid item xs = {9} className = {classes.boxName}>
          <Grid container direction = 'column'
                justify = 'center'
                alignItems = 'flex-start'>
            <Grid item>
              <Typography className = {classes.roomName}>
                {room!.details.data[0].name}
              </Typography>
            </Grid>
            <Grid item className = {classes.rowMargin}>
              <StarRatings
                rating = {room !== null ? room!.avg_rating : 0} //index rating
                starDimension = '20px'
                starSpacing = '1px'
                starRatedColor = '#46afcc'
              />
              <span className = {classes.spanViews}>{room!.total_review} đánh giá</span>
            </Grid>
            <Grid item className = {classes.rowMargin}>
              <span className = {classes.txtAddress}>
                <Location className = {classes.iconLocation} />
                {`${room!.district.data.name}, ${room!.city.data.name}`}
              </span>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs = {3}>
          {/*<Grid container direction = 'column' justify = 'flex-end' alignItems = 'flex-end'>*/}
          {/*<Grid item xs = {12}>*/}
          {/*<Tooltip*/}
          {/*interactive*/}
          {/*placement = 'left'*/}
          {/*title = {*/}
          {/*<Fragment>*/}
          {/*<div>*/}
          {/*<Typography variant = {'subtitle2'} align = {'center'}>{room!.user.data.name}</Typography>*/}
          {/*<Grid container>*/}
          {/*<Grid item xs = {4}>*/}
          {/*<div className = {classes.info}>*/}
          {/*<div>*/}
          {/*<img src = {medalCertified} width = {15} height = {15} />*/}
          {/*</div>*/}
          {/*<Typography variant = {'caption'}>Super!</Typography>*/}
          {/*</div>*/}
          {/*</Grid>*/}
          {/*<Grid item xs = {4}>*/}
          {/*<div className = {classes.info}>*/}
          {/*<div>*/}
          {/*<img src = {chat} width = {15} height = {15} />*/}
          {/*</div>*/}
          {/*<Typography variant = {'caption'} style = {{color: '#F8952F'}}>987</Typography>*/}
          {/*</div>*/}
          {/*</Grid>*/}
          {/*<Grid item xs = {4}>*/}
          {/*<div className = {classes.info}>*/}
          {/*<div>*/}
          {/*<img alt = 'verified' src = {verified} width = {15} height = {15} />*/}
          {/*</div>*/}
          {/*<Typography variant = {'caption'} style = {{color: '#00c853'}}>verified</Typography>*/}
          {/*</div>*/}
          {/*</Grid>*/}
          {/*</Grid>*/}
          {/*</div>*/}
          {/*<span className = {classes.arrowArrow} />*/}
          {/*</Fragment>*/}
          {/*}*/}
          {/*classes = {{*/}
          {/*popper: classes.arrowPopper,*/}
          {/*tooltip: classes.lightTooltip,*/}
          {/*}}*/}
          {/*PopperProps = {{*/}
          {/*popperOptions: {*/}
          {/*modifiers: {*/}
          {/*arrow: {*/}
          {/*enabled: Boolean(arrowRef),*/}
          {/*element: arrowRef,*/}
          {/*},*/}
          {/*},*/}
          {/*},*/}
          {/*}}*/}
          {/*>*/}
          {/*<div className = {classes.avatar}>*/}
          {/*<img alt = 'Avatar' src = {room!.user.data.avatar_url} className = {classes.imgAvatar} />*/}
          {/*<div className = {classes.infoHost}>*/}
          {/*<img src = {medalCertified} className = {classes.imgCertified} />*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*</Tooltip>*/}
          {/*</Grid>*/}
          {/*</Grid>*/}
        </Grid>
      </Grid>
      <Divider />
      <Grid container className = {classes.rowMargin20}>
        <Grid item xs = {3} sm = {3}>
          <div className = {classes.collectionAmenities}>
            <Home className = {classes.roomAmenitiesIcon} />
            <div className = {classes.roomAmenitiesTitle}><span>{room!.room_type_txt}</span></div>
          </div>
        </Grid>
        <Grid item xs = {3} sm = {3}>
          <div className = {classes.collectionAmenities}>
            <People className = {classes.roomAmenitiesIcon} />
            <div className = {classes.roomAmenitiesTitle}><span>{room!.max_guest} khách</span></div>
          </div>
        </Grid>
        <Grid item xs = {3} sm = {3}>
          <div className = {classes.collectionAmenities}>
            <MeetingRoom className = {classes.roomAmenitiesIcon} />
            <div className = {classes.roomAmenitiesTitle}><span>{room!.number_room} phòng</span></div>
          </div>
        </Grid>
        <Grid item xs = {3} sm = {3}>
          <div className = {classes.collectionAmenities}>
            <LocalHotel className = {classes.roomAmenitiesIcon} />
            <div className = {classes.roomAmenitiesTitle}><span>{room!.number_bed} giường</span></div>
          </div>
        </Grid>
      </Grid>
      {/*<Grid container className = {classes.rowMargin20}>*/}
      {/*<div className = {classes.boxHighlight}>*/}
      {/*<Typography variant = {'button'} color = {'textSecondary'}>Điểm nổi bật của homestay</Typography>*/}
      {/*<div className = {classes.rowMargin20}>*/}
      {/*<span className = {classes.titleHighlight}>Is a Superhost: </span>*/}
      {/*<span className = {classes.contentHighlight}>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</span>*/}
      {/*</div>*/}
      {/*<div className = {classes.rowMargin20}>*/}
      {/*<span className = {classes.titleHighlight}>Great location: </span>*/}
      {/*<span*/}
      {/*className = {classes.contentHighlight}>95% of recent guests gave this home’s location a 5-star rating.</span>*/}
      {/*</div>*/}
      {/*<div className = {classes.rowMargin20}>*/}
      {/*<span className = {classes.titleHighlight}>Sparkling clean: </span>*/}
      {/*<span*/}
      {/*className = {classes.contentHighlight}>11 recent guests have said that this home was sparkling clean.</span>*/}
      {/*</div>*/}
      {/*</div>*/}
      {/*</Grid>*/}
      <Grid container className = {classes.rowMargin20}>
        <ExpansionPanel classes = {{root: classes.expansionPanel}}>
          <ExpansionPanelSummary expandIcon = {<ExpandMoreIcon />}
                                 classes = {{
                                   content: classes.expansionPanelSummary,
                                   root: classes.RootExpansionPanelSummary
                                 }}>
            <Typography className = {classNames(classes.titleHighlight, classes.headingPanel)}>
              Thông tin về homestay
            </Typography>
            <div className = {classes.des_3Line}>
              {ReactHtmlParser(description, {
                transform: transformHtmlTitle
              })}
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes = {{root: classes.expansionPanelDetails}}>
            <Grid container className = {classes.rowMargin}>
              {ReactHtmlParser(description, {
                transform: transformHtmlContent
              })}
            </Grid>
            {/*<Grid container className = {classes.rowMargin}>*/}
            {/*<Grid item xs = {4}>*/}
            {/*<Typography variant = {'subtitle2'}>Quyền hạn của khách: </Typography>*/}
            {/*</Grid>*/}
            {/*<Grid item xs = {8}>*/}
            {/*<Typography variant = {'body2'}> - Guests have access to the entire property with the exception of the*/}
            {/*main house that the owner occupies.</Typography>*/}
            {/*</Grid>*/}
            {/*</Grid>*/}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <Grid container className = {classes.rowMargin20}>
        <ExpansionPanel classes = {{root: classes.expansionPanel}}>
          <ExpansionPanelSummary expandIcon = {<ExpandMoreIcon />}
                                 classes = {{
                                   content: classes.convenientExpansionPanelSummary,
                                   root: classes.RootExpansionPanelSummary
                                 }}>
            <Typography className = {classNames(classes.titleHighlight, classes.headingPanel)}>
              Tiện Nghi
            </Typography>
            <Grid container>
              <Grid item xs = {3} sm = {3}>
                <div className = {classes.collectionAmenities}>
                  <img src = {room!.comforts.data[0].icon}
                       alt = {room!.comforts.data[0].details.data[0].name}
                       className = {classes.roomAmenitiesIcon} />
                  <div className = {classes.roomAmenitiesTitle}>
                    <span>{room!.comforts.data[0].details.data[0].name}</span>
                  </div>
                </div>
              </Grid>
              <Grid item xs = {3} sm = {3}>
                <div className = {classes.collectionAmenities}>
                  <img src = {room!.comforts.data[1].icon}
                       alt = {room!.comforts.data[1].details.data[0].name}
                       className = {classes.roomAmenitiesIcon} />
                  <div className = {classes.roomAmenitiesTitle}>
                    <span>{room!.comforts.data[1].details.data[0].name}</span>
                  </div>
                </div>
              </Grid>
              <Grid item xs = {3} sm = {3}>
                <div className = {classes.collectionAmenities}>
                  <img src = {room!.comforts.data[2].icon}
                       alt = {room!.comforts.data[2].details.data[0].name}
                       className = {classes.roomAmenitiesIcon} />
                  <div className = {classes.roomAmenitiesTitle}>
                    <span>{room!.comforts.data[2].details.data[0].name}</span>
                  </div>
                </div>
              </Grid>
              <Grid item xs = {3} sm = {3}>
                <div className = {classes.collectionAmenities}>
                  <img src = {room!.comforts.data[3].icon}
                       alt = {room!.comforts.data[3].details.data[0].name}
                       className = {classes.roomAmenitiesIcon} />
                  <div className = {classes.roomAmenitiesTitle}>
                    <span>{room!.comforts.data[3].details.data[0].name}</span>
                  </div>
                </div>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes = {{root: classes.expansionPanelDetails}}>
            <Grid container spacing = {8} className = {classes.rowMargin}>
              {room ? _.map(room.comforts.data, (o, i) => i > 3 ? (
                <Fragment key = {i}>
                  <Grid item xs = {3} sm = {2} md = {1} lg = {1}>
                    <img src = {o.icon}
                         alt = {o.details.data[0].name}
                         className = {classes.roomAmenitiesIcon} />
                  </Grid>
                  <Grid item xs = {9} sm = {4} md = {5} lg = {5}>
                    <Typography variant = {'body2'}>{o.details.data[0].name}</Typography>
                  </Grid>
                </Fragment>
              ) : '') : ''}
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
