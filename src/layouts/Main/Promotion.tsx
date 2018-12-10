import React, {FunctionComponent} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {compose} from 'recompose';
import {createStyles, withStyles} from '@material-ui/core/styles';
import {style} from '@/layouts/Main/SearchHome';
import Typography from '@material-ui/core/Typography/Typography';
import {ThemeCustom} from '@/components/Theme/Theme';

interface IProps {
  classes?: any;
}

const styles: any = (theme: ThemeCustom) => createStyles({
  ...style(theme),
  paperSize: {
    height: 270,
  },
});

const Promotion: FunctionComponent<IProps> = props => {
  const {classes} = props;
  return (
    <Grid item md = {6} xs = {12}>
      <Typography variant = 'h4' className = {classes.heading} color = 'primary' gutterBottom>
        The title of promotions
      </Typography>
      <Typography variant = 'subtitle1' color = 'primary' className = {classes.fontSize}>
        Description
      </Typography>
      <Grid container spacing = {8}>
        <Grid item md = {6} xs = {6}>
          <Paper elevation = {4} className = {classes.paperSize} square>

          </Paper>
        </Grid>
        <Grid item md = {6} xs = {6}>
          <Paper elevation = {4} className = {classes.paperSize} square>

          </Paper>
        </Grid>
        <Grid item md = {6} xs = {6}>
          <Paper elevation = {4} className = {classes.paperSize} square>

          </Paper>
        </Grid>
        <Grid item md = {6} xs = {6}>
          <Paper elevation = {4} className = {classes.paperSize} square>

          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(Promotion);
