import {ThemeCustom} from '@/components/Theme/Theme';
import NavSearch from '@/components/ToolBar/NavSearch';
import NavTop from '@/components/ToolBar/NavTop';
import GridImage from '@/views/DetailsPage/GridImage';
import BoxDetails from '@/views/DetailsPage/BoxDetails';
import BoxReviews from '@/views/DetailsPage/BoxReviews';
import BoxBooking from '@/views/DetailsPage/BoxBooking';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, useContext, useEffect, useReducer, useState} from 'react';
import {compose} from 'recompose';
import Button from '@material-ui/core/Button/Button';
import GridContainer from '@/layouts/Grid/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import {
  getData, IRoomDetailsContext, RoomDetailsAction,
  RoomDetailsContext,
  RoomDetailsReducer,
  RoomDetailsState, RoomDetailsStateInit,
} from '@/store/context/Room/RoomDetailsContext';
import {AxiosError} from 'axios';
import {match, RouteChildrenProps} from 'react-router';
import {GlobalContext, IGlobalContext} from '@/store/context/GlobalContext';

interface IProps extends RouteChildrenProps {
  classes?: any,
  match: match<any>
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
      backgroundColor: 'rgba(192,192,192,0.5)',
    },
  },
  boxDetails: {
    width: '100%',
    marginTop: 30,
  },
  boxPadding: {
    padding: 16,
  },
  boxTEST: {
    height: 1000,
    backgroundColor: 'red',
  },
});

const DetailsPage: ComponentType<IProps> = (props: IProps) => {
  const {classes, match} = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [state, dispatch] = useReducer<RoomDetailsState, RoomDetailsAction>(RoomDetailsReducer, RoomDetailsStateInit);
  const {history} = useContext<IGlobalContext>(GlobalContext);

  useEffect(() => {
    let id = parseInt(match.params.id);

    if (isNaN(id)) history.push('/');

    getData(id).then((data) => {
      dispatch({
        type: 'setDetails',
        action: data,
      });
    }).catch((err: AxiosError) => {
      history.push('/404');
    });
  }, []); // phu thuoc

  return (
    <RoomDetailsContext.Provider value = {{state, dispatch}}>
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
            {/*<Grid container spacing={32}>*/}
            {/*<Grid item xs={12}>*/}
            {/*<Paper>*/}
            {/*<div className = {classes.boxTEST}>*/}
            {/*concac*/}
            {/*</div>*/}
            {/*</Paper>*/}
            {/*</Grid>*/}
            {/*</Grid>*/}
          </GridContainer>
        </div>
      </div>
    </RoomDetailsContext.Provider>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(DetailsPage);
