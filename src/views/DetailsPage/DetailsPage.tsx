import {ThemeCustom} from '@/components/Theme/Theme';
import NavSearch from '@/components/ToolBar/NavSearch';
import NavTop from '@/components/ToolBar/NavTop';
import GridImage from '@/views/DetailsPage/GridImage';
import BoxDetails from '@/views/DetailsPage/BoxDetails';
import BoxReviews from '@/views/DetailsPage/BoxReviews';
import BoxBooking from '@/views/DetailsPage/BoxBooking';
import SliderSuggest from '@/views/DetailsPage/SliderSuggest';
import NavBottomBook from '@/views/DetailsPage/NavBottomBook';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, useContext, useEffect, useReducer, useState, useMemo, memo} from 'react';
import {compose} from 'recompose';
import Button from '@material-ui/core/Button/Button';
import GridContainer from '@/layouts/Grid/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper/Paper';
import Divider from '@material-ui/core/Divider';
import {
  RoomDetailsAction,
  RoomDetailsContext,
  RoomDetailsReducer,
  RoomDetailsState,
  RoomDetailsStateInit,
  getData,
} from '@/store/context/Room/RoomDetailsContext';
import {match, RouteChildrenProps} from 'react-router';
import {GlobalContext, IGlobalContext} from '@/store/context/GlobalContext';
import Typography from '@material-ui/core/Typography/Typography';
import DatePickerRoomDetail from '@/components/Utils/DatePickerRoomDetail';
import {BOOKING_TYPE_DAY} from '@/utils/store/global';
import useFocusTitle from '@/utils/focusState';

interface IProps extends RouteChildrenProps {
  classes?: any,
  match: match<any>
}

const styles: any = (theme: ThemeCustom) => createStyles({
  root: {},
  boxGridImage: {
    width: '100%',
    height: 'auto',
    maxHeight: 440,
    [theme!.breakpoints!.down!('sm')]: {
      maxHeight: 335,
    },
    overflow: 'hidden',
    position: 'relative',
  },
  div_btnMore: {
    position: 'absolute',
    bottom: '4%',
    right: '2%',
  },
  btnMore: {
    backgroundColor: '#fff',
    color: '#343434',
    MozTransition: 'all 0.3s',
    WebkitTransition: 'all 0.3s',
    transition: 'all 0.3s',
    border: 'none',
    '&:hover': {
      MsTransform: 'scale(1.1)', /* IE 9 */
      WebkitTransform: 'scale(1.1)', /* Safari 3-8 */
      transform: 'scale(1.1)',
      backgroundColor: '#fff',
    },
  },
  boxDetails: {
    width: '100%',
    paddingTop: 30,
    backgroundColor: '#fafafa',
    [theme!.breakpoints!.down!('sm')]: {
      paddingTop: 0,
    },
  },
  boxPadding: {
    padding: 16,
    [theme!.breakpoints!.down!('xs')]: {
      padding: '10px 0',
    },
  },
  boxSuggest: {
    margin: '10px 0',
    padding: '16px 0',
    [theme!.breakpoints!.down!('xs')]: {
      padding: '0px 10px',
    },
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    lineHeight: '1.25em',
    color: '#484848',
    padding: '8px 0',
  },
  divider: {
    margin: '8px 0',
  },
  paperDetail: {
    border: '1px solid #e4e4e4',
    [theme!.breakpoints!.down!('xs')]: {
      border: 'none',
    },
  },
  PaperBooking: {
    // border:'1px solid #e4e4e4',
    position: 'sticky',
    top: '10%',
    left: 'auto',
    right: 0,
  },
});

const DetailsPage: ComponentType<IProps> = (props: IProps) => {
  const {classes, match}    = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [state, dispatch]   = useReducer<RoomDetailsState, RoomDetailsAction>(RoomDetailsReducer, RoomDetailsStateInit);
  const {history}           = useContext<IGlobalContext>(GlobalContext);

  const {bookingType, room} = state;

  const roomTitle = useMemo(() => {
    return (room !== null) ? room!.details.data[0].name : document.title;
  }, [room]);

  useEffect(() => {
    let id = parseInt(match.params.id);
    getData(id, dispatch, history);
  }, []); // phu thuoc

  useFocusTitle(roomTitle, 'Đặt phòng ngay', room);

  return (
    <RoomDetailsContext.Provider value = {{state, dispatch}}>
      <div className = {classes.root}>
        <NavTop />
        <Hidden xsDown>
          <NavSearch />
        </Hidden>
        <div className = {classes.boxGridImage}>
          <GridImage isOpen = {isOpen} setIsOpen = {setIsOpen} />
          <div className = {classes.div_btnMore}>
            <Button className = {classes.btnMore} variant = 'outlined'
                    size = 'small' onClick = {() => setIsOpen(true)}
            >Xem thêm</Button>
          </div>
        </div>
        <div className = {classes.boxDetails}>
          <GridContainer xs = {12} sm = {12} md = {11} lg = {11}>
            <Grid container justify = 'center'>
              <Grid item sm = {12} md = {11} lg = {8} className = {classes.boxPadding}>
                <Paper elevation = {0}>
                  <div className = {classes.boxPadding}>
                    <BoxDetails />
                    {room ? (
                      <DatePickerRoomDetail
                        minNights = {bookingType === BOOKING_TYPE_DAY ? 1 : 0}
                      />
                    ) : ''}
                    <BoxReviews />
                  </div>
                </Paper>
              </Grid>
              <Hidden mdDown>
                <Grid item sm = {12} md = {11} lg = {4} className = {classes.boxPadding}>
                  <Paper elevation = {2} className = {classes.PaperBooking}>
                    <BoxBooking />
                  </Paper>
                </Grid>
              </Hidden>
            </Grid>
            <Grid container className = {classes.boxPadding}>
              <Grid item xs = {12}>
                <div className = {classes.boxSuggest}>
                  <Typography className = {classes.title}>
                    Gợi ý
                  </Typography>
                  <SliderSuggest />
                </div>
              </Grid>
            </Grid>
          </GridContainer>
        </div>
        <Hidden lgUp>
          <NavBottomBook />
        </Hidden>
      </div>
    </RoomDetailsContext.Provider>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo,
)(DetailsPage);
