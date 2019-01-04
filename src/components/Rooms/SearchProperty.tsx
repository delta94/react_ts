import {ThemeCustom} from '@/components/Theme/Theme';
import Grid from '@material-ui/core/Grid/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import React, {ComponentType} from 'react';
import {compose} from 'recompose';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  inputSearch: {
    padding: '12px 12px',
    fontSize: '0.85rem'
  }
});

const SearchProperty: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;

  return (
    <Grid container spacing={8}>
      <Grid item sm = {12}>
        <Typography variant = 'subtitle2'>Property search</Typography>
      </Grid>
      <Grid item sm={12}>
        <TextField
          id='property-keyword-search'
          variant='outlined'
          placeholder='Property name or keyword'
          inputProps={{
            className: classes.inputSearch
          }}
          fullWidth
        />
      </Grid>
    </Grid>
  )
};

export default compose<IProps, any>(
  withStyles(styles)
)(SearchProperty)
