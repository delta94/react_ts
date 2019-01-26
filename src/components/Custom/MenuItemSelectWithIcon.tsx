import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {FunctionComponent, memo, useMemo} from 'react';
import {compose} from 'recompose';
import {components} from 'react-select';
import HomeIcon from '@material-ui/icons/Home';
import LocationIcon from '@material-ui/icons/LocationCity';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import {OptionProps} from 'react-select/lib/components/Option';
import {
  SearchSuggestRes,
  IS_SEARCH_CITY,
  IS_SEARCH_DISTRICT,
  IS_SEARCH_ROOM,
} from '@/types/Requests/Search/SearchResponse';
import classNames from 'classnames';

const {Option} = components;

interface IProps extends OptionProps<any> {
  classes?: any
  data: SearchSuggestRes
}

interface ItemDetail {
  icon: any
  description: string
}

const styles: any = (theme: ThemeCustom) => createStyles({
  grow: {
    flexGrow: 1,
  },
  white: {
    color: 'white',
  },
  black: {
    color: 'black',
  },
});

const detailInfo = (data: SearchSuggestRes): ItemDetail => {
  switch (data.type) {
    case IS_SEARCH_CITY:
      return {
        icon: <LocationIcon />,
        description: data.descripttion,
      };
    case IS_SEARCH_DISTRICT:
      return {
        icon: <LocationIcon />,
        description: data.descripttion,
      };
    case IS_SEARCH_ROOM:
      return {
        icon: <HomeIcon />,
        description: data.room_type_text,
      };
    default:
      return {
        icon: '',
        description: data.descripttion,
      };
  }
};

// @ts-ignore
const MenuItemSelectWithIcon: FunctionComponent<IProps> = (props: IProps) => {
  const {classes, data, isSelected} = props;

  const {name, error} = data;

  const info = useMemo(() => detailInfo(data), []);

  return (
    <Option {...props}>
      <Grid container alignItems = 'center'>
        <Grid container item xs = {10} md = {9} className = {classes.grow} alignItems = 'center'>
          <Grid item xs = {1} className = {
            classNames({
              [classes.white]: isSelected,
              [classes.black]: !isSelected,
            })
          }>
            {info.icon}
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
        <Grid container item xs = {2} md = {3} justify = 'flex-end'>
          <Typography variant = 'subtitle2' className = {
            classNames({
              [classes.white]: isSelected,
            })
          }>
            {info.description}
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
