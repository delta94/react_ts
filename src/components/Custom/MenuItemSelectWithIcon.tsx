import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {FunctionComponent, memo} from 'react';
import {compose} from 'recompose';
import {components} from 'react-select';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import {OptionProps} from 'react-select/lib/components/Option';
import {SearchSuggestRes} from '@/types/Requests/Search/SearchResponse';
import classNames from 'classnames';

const {Option} = components;

interface IProps extends OptionProps<any> {
  classes?: any
  data: SearchSuggestRes
}

const styles: any = (theme: ThemeCustom) => createStyles({
  grow: {
    flexGrow: 1,
  },
  white: {
    color: 'white',
  },
});

// @ts-ignore
const MenuItemSelectWithIcon: FunctionComponent<IProps> = (props: IProps) => {
  const {classes, data, isSelected} = props;

  const {name, error} = data;

  return (
    <Option {...props}>
      <Grid container alignItems = 'center'>
        <Grid container item xs = {10} className = {classes.grow} alignItems = 'center'>
          <Grid item xs = {1}>
            <SearchIcon />
          </Grid>
          <Grid item xs>
            <Typography className = {
              classNames({
                [classes.white]: isSelected,
              })
            }>
              {!error ? name : error}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs = {2} justify = 'flex-end'>
          <Typography variant = 'subtitle2' className = {
            classNames({
              [classes.white]: isSelected,
            })
          }>
            Thành phố
          </Typography>
        </Grid>
      </Grid>

    </Option>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo,
)(MenuItemSelectWithIcon);
