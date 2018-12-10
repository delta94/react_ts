import React, {FunctionComponent, useEffect} from 'react';
import {compose} from 'recompose';
import {createStyles, Theme, withStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography';
import animationData from '@/assets/Lottie/network_error.json';
import Lottie from 'react-lottie';
import {Link} from 'react-router-dom';

interface IProps {
  classes?: any
}

const styles: any = (theme: Theme) => createStyles({
  root: {
    padding: '100px 150px 0 150px',
  },
  boldText: {
    fontWeight: 550,
  },
  weightLow: {
    fontWeight: 400,
  },
  list: {
    listStyleType: 'none',
    paddingInlineStart: 0,
  },
});

const Error500: FunctionComponent<IProps | any> = props => {
  const {classes} = props;

  useEffect(() => {
    document.title = '500 Internal Server Error - Westay.org';
  }, []);

  const defaultOptions = {
    loop: false,
    animationData: animationData,
  };

  return (
    <div className = {classes.root}>
      <Grid container spacing = {40}>
        <Grid item container xs = {6} spacing = {24}>
          <Grid item xs = {12}>
            <Typography variant = 'h2' className = {classes.boldText}>
              Whoops!
            </Typography>
          </Grid>
          <Grid item xs = {12}>
            <Typography variant = 'h4'>
              Well, this is unexpected…
            </Typography>
          </Grid>
          <Grid item xs = {12}>
            <Typography variant = 'subtitle2'>
              Error code: 500
            </Typography>
          </Grid>
          <Grid item xs = {12}>
            <Typography variant = 'subtitle2' className = {classes.weightLow}>
              An error has occurred and we're working to fix the problem! We’ll be up and running shortly.
            </Typography><br />
            <Typography variant = 'subtitle2' className = {classes.weightLow}>
              If you need immediate help from our customer service team about an ongoing reservation, please call us. If
              it isn’t an urgent matter, please visit our Help Center for additional information. Thanks for your
              patience!
            </Typography>
          </Grid>
          <Grid item xs = {12}>
            Here are some helpful links to help you:<br />
            <ul className = {classes.list}>
              <li><Link to = '/'>Home</Link></li>
            </ul>
          </Grid>
        </Grid>
        <Grid container item xs = {6}>
          <Grid item xs = {12}>
            <Lottie
              options = {defaultOptions}
              isClickToPauseDisabled = {true}
              height = {400}
              width = {500}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default compose(
  withStyles(styles),
)(Error500);
