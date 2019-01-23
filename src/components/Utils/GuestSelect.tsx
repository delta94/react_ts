import React, {FunctionComponent, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import {compose} from 'recompose';
import {createStyles, Theme, withStyles} from '@material-ui/core';
import {style} from '@/layouts/Main/SearchHome';
import Blue from '@material-ui/core/colors/blue';
import Gray from '@material-ui/core/colors/grey';
import CountBar from '@/components/Utils/CountBar';
import {connect} from 'react-redux';
import {ReducersType} from '@/store/reducers';
import {Dispatch} from 'redux';

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

const GuestSelect: FunctionComponent<IProps> = props => {
  const {classes} = props;
  const [size]    = useState(250);
  return (
    <Grid item md = {8} xs = {12} sm = {12}>
      <Paper elevation = {4}
             className = {classes.paperSize}
             square>
        <Grid container spacing = {8} justify = 'center'>
          <Grid item xs = {12}>
            <CountBar
              divider
              singular = 'Khách'
              plural = 'Khách'
              p-classes = {classes} />
            <CountBar
              singular = 'Phòng'
              plural = 'Phòng'
              p-classes = {classes} />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(GuestSelect);
