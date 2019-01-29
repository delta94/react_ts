import React, {FunctionComponent, useState, memo} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import {compose} from 'recompose';
import {createStyles, Theme, withStyles} from '@material-ui/core';
import {style} from '@/layouts/Main/SearchHome';
import Blue from '@material-ui/core/colors/blue';
import Gray from '@material-ui/core/colors/grey';
import CountBar from '@/components/Utils/CountBar';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import {connect} from 'react-redux';
import {ReducersType} from '@/store/reducers';
import {Dispatch} from 'redux';
import {Transition} from 'react-spring';
import Remove from '@material-ui/core/SvgIcon/SvgIcon';
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import _ from 'lodash';
import {SearchFilterAction, DateRange, SearchFilterState} from '@/store/reducers/searchFilter';
import BookingTypeSelectBar from '@/components/Home/BookingTypeSelectBar';

interface IProps {
  classes?: any
}


const styles: any = (theme: Theme) => createStyles({
  ...style(theme),
  paperSize: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  countNumber: {
    fontSize: '1.7rem',
    color: Blue[500],
  },
  textCount: {
    color: Gray[600],
  },
});

// @ts-ignore
const GuestSelect: FunctionComponent<IProps> = (props: IProps) => {
  const {classes} = props;

  return (
    <Grid item md = {8} xs = {12} sm = {12}>
      <Paper elevation = {4}
             className = {classes.paperSize}
      >
        <Grid container spacing = {8} justify = 'center'>
          <Grid item xs = {12}>
            <BookingTypeSelectBar />
            <CountBar
              divider
              singular = 'Khách'
              plural = 'Khách'
              name = 'guests'
              p-classes = {classes} />
            <CountBar
              singular = 'Phòng'
              plural = 'Phòng'
              name = 'rooms'
              p-classes = {classes} />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo,
)(GuestSelect);
