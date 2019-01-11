import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useContext, useState} from 'react';
import {compose} from 'recompose';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import InputRange, {Range} from 'react-input-range';
import {
  MIN_PRICE,
  MAX_PRICE,
  RoomIndexContext,
  IRoomIndexContext,
  STEP_PRICE,
} from '@/store/context/Room/RoomIndexContext';
import {usePriceEffect, priceFilterChange} from '@/components/Rooms/PriceRange';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import {GlobalContext, IGlobalContext} from '@/store/context/GlobalContext';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {TAB_LIST} from '@/views/Rooms/BottomNav';

interface IProps {
  classes?: any
  setIndex(value: number): void
}

const styles: any = (theme: ThemeCustom) => createStyles({
  sortMargin: {
    marginTop: 10,
  },
  buttonHeight: {
    height: '100%',
  },
  center: {
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  dialog: {
    [theme!.breakpoints!.only!('xs')]: {
      padding: '0 12px'
    }
  }
});

// @ts-ignore
const FilterDrawerM: ComponentType<IProps> = (props: IProps) => {
  const {classes, setIndex} = props;
  const {location, history} = useContext<IGlobalContext>(GlobalContext);
  const {state, dispatch}   = useContext<IRoomIndexContext>(RoomIndexContext);

  const [price, setPrice] = useState<Range>({
    min: state.price.min,
    max: state.price.max,
  });

  const applyFilter = () => {
    setIndex(TAB_LIST);
    priceFilterChange(price, location, history, dispatch);
  };

  usePriceEffect(price, setPrice, state);

  return (
    <Fragment>
      <DialogTitle disableTypography>
        <Typography variant = 'h6' className = {classes.center}>Filter</Typography>
        <IconButton
        className = {classes.closeButton}
        onClick = {() => setIndex(TAB_LIST)}>
        <CloseIcon />
      </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <Grid item xs = {12} container className = {classes.sortMargin} spacing = {0}>
          <Grid item xs = {12} container spacing = {8}>
            <Grid item sm = {10} xs = {9}>
              <TextField
                id = 'search-property'
                label = 'Search property'
                variant = 'outlined'
                fullWidth
              />
            </Grid>
            <Grid item sm = {2} xs = {3}>
              <Button
                color = 'primary'
                variant = 'contained'
                fullWidth
                classes = {{
                  root: classes.buttonHeight,
                }}>Search</Button>
            </Grid>
          </Grid>
          {/*TODO: Star Rating Mobile Version*/}
          {/*<Grid item xs = {12} className = {classes.sortMargin}>*/}
            {/*<Typography variant = 'subtitle2'>Star rating</Typography><br />*/}
            {/*<StarRatings*/}
              {/*numberOfStars = {5}*/}
              {/*rating = {3}*/}
              {/*starDimension = {'2rem'}*/}
              {/*starRatedColor = '#FFC412'*/}
            {/*/>*/}
          {/*</Grid>*/}
          <Grid item xs = {12} className = {classes.sortMargin}>
            <Typography variant = 'subtitle2'>Price per night</Typography><br />
            <InputRange
              allowSameValues = {false}
              minValue = {MIN_PRICE}
              maxValue = {MAX_PRICE}
              step = {STEP_PRICE}
              onChange = {(value: any) => setPrice(value)}
              value = {price} />
            <Typography variant = 'subtitle2'>{`đ ${price.min} - đ ${price.max}`}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color = 'primary' variant = 'contained' onClick = {applyFilter}>
          Apply
        </Button>
      </DialogActions>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(FilterDrawerM);
